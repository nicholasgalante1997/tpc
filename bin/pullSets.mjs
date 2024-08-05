import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';

import { Log, Timer } from 'sleepydogs';

import { DEFAULT_HTTP_OPTIONS, POKEMON_TCG_API_URL } from './constants.mjs';

const POKEMON_TCG_API_URL_PATH = 'sets';
const endpoint = POKEMON_TCG_API_URL + POKEMON_TCG_API_URL_PATH;

const { info, error } = Log.factory({
    level: 'info',
    service: 'npod-cli-pull-sets',
    version: '0.1'
})

export async function pullSets() {
  const timer = new Timer();
  timer.start();
  info('Starting to pull sets from ' + endpoint);

  try {
    let sets = [];

    info('Fetching fresh sets from Pokemon TCG API...');

    const response = await fetch(endpoint, DEFAULT_HTTP_OPTIONS);
    let { data, page, count, totalCount } = await response.json();

    info('Adding sets to local in-mem array...');

    sets = [...data];
  
    let hasMore = count < totalCount;

    while(hasMore) {
      info('Fetching next page of sets!')
      info(`Fetching page ${page + 1}`);
      const nextResponse = await fetch(endpoint + `?page=${page + 1}`);
      const nextJson = await nextResponse.json();

      info('Adding next page to local in-mem array...');
      sets = [...sets, ...nextJson.data]
      page = nextJson.page;
      count += nextJson.count;
      hasMore = count < totalCount;
    }
  
    let writePromises = [];
    for (const set of data) {
      if (setExistsInLocalFsCache(set)) {
        info(`Set exists in local fs cache, skipping!`);
        continue;
      }
  
      writePromises.push(writeSetInLocalFsCache(set));
    }
  
    await Promise.all(writePromises);

    info('Finished updating local < set > file cache.')

    timer.stop();

    info(`Operation took ${timer.elapsed()} ms`);

  } catch(e) {
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

function getSetPathInLocalFs(set) {
  return path.resolve(process.cwd(), 'data', 'sets', `${set.id}.json`);
}

function setExistsInLocalFsCache(set) {
    const setPathInFs = getSetPathInLocalFs(set);
    return fs.existsSync(setPathInFs);
}

async function writeSetInLocalFsCache(set) {
    info(`Writing set ${set.name} to local fs cache`);
    const setPathInFs = getSetPathInLocalFs(set);
    const file = JSON.stringify({
        id: set.id,
        lastUpdated: Intl.DateTimeFormat('en-US').format(new Date(Date.now())),
        data: set,
    })
    await fsp.writeFile(setPathInFs, file, { encoding: 'utf8' });
    info(`Finished writing set ${set.name} to local fs cache!`);
}
