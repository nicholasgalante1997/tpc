import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';

import { Log, Timer } from 'sleepydogs';

import { DEFAULT_HTTP_OPTIONS, MAX_PAGE_SIZE, POKEMON_TCG_API_URL, MAX_PAGES } from './constants.mjs';

const POKEMON_TCG_API_URL_PATH = 'cards';
const endpoint = POKEMON_TCG_API_URL + POKEMON_TCG_API_URL_PATH;

const { info, error } = Log.factory({
  level: 'info',
  service: 'npod-cli-pull-cards',
  version: '0.1'
});

export async function pullCards() {
  const timer = new Timer();
  timer.start();
  info('Starting to pull cards from ' + endpoint);
  try {
    info('Pulling sets from local fs cache...');
    const sets = await loadAllSets();
    const promises = [];
    for (const set of sets) {
      info('Working on set ' + set.data.name);
      if (cardsInSetExistInLocalFsCache(set)) {
        info(`Set ${set.data.name} exists in local fs cache, skipping!`);
        continue;
      }

      promises.push(writeCardsInSetToLocalFsCache(set));
    }

    await Promise.all(promises);

    info('Finished updating local < card > file cache.');
    timer.stop();
    info(`Operation took ${timer.elapsed()} ms`);
  } catch (e) {
    timer.stop();
    error('An error occurred during pullSets()!');
    error(`
        Error {
            name: ${e.name}
            message: ${e.message}
            stack: ${e.stack}
        }
    `);
    process.exit(2);
  }
}

function formEndpoint(set, page = 1) {
  return `${endpoint}?q=set.id:${set.id}&orderBy=number&pageSize=${MAX_PAGE_SIZE}&page=${page}`;
}

async function loadAllSets() {
  const dirEnts = fs.readdirSync(path.resolve(process.cwd(), 'data', 'sets'), {
    encoding: 'utf8',
    withFileTypes: true
  });
  let mapPromise = dirEnts
    .filter((dirEnt) => dirEnt.isFile() && dirEnt.name.endsWith('.json'))
    .map(async (dirEnt) => {
      const { name, parentPath } = dirEnt;
      const file = await fsp.readFile(path.resolve(parentPath, name), { encoding: 'utf8' });
      return file;
    });

  let resolvedFiles = await Promise.all(mapPromise);
  return resolvedFiles.map((file) => JSON.parse(file));
}

function getCardJsonPathFromSet(set) {
  return path.resolve(process.cwd(), 'data', 'cards', `${set.id}.json`);
}

function cardsInSetExistInLocalFsCache(set) {
  return fs.existsSync(getCardJsonPathFromSet(set));
}

async function writeCardsInSetToLocalFsCache(set) {
  try {
    const response = await fetch(formEndpoint(set), DEFAULT_HTTP_OPTIONS);
    const ok = response.status === 200 && response.ok;
    if (ok) {
      const json = await response.json();
      let page = json.page;
      let data = json.data || [];
      let count = json.count || 0;
      const totalCount = json.totalCount;
      let hasMoreInSet = count < totalCount;
      while (hasMoreInSet && page <= MAX_PAGES) {
        const nextResponse = await fetch(formEndpoint(set, page + 1), DEFAULT_HTTP_OPTIONS);
        const nextJson = await nextResponse.json();
        data = [...data, ...(nextJson.data || [])];
        page = nextJson.page;
        count += nextJson.count;
        hasMoreInSet = count < totalCount;
      }

      const file = JSON.stringify({
        set: {
          name: set.name,
          id: set.id
        },
        lastUpdated: Intl.DateTimeFormat('en-US').format(new Date(Date.now())),
        cards: data
      });

      const outpath = getCardJsonPathFromSet(set);

      await fsp.writeFile(outpath, file, { encoding: 'utf8' });
    }
  } catch (e) {
    error(`Writing of set ${set.data.name} failed`);
    error(`
        Error {
            name: ${e.name}
            message: ${e.message}
            stack: ${e.stack}
        }
    `);
  }
}
