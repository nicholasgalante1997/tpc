#! /usr/bin/env node

import { Command } from 'commander';
import fsp from 'node:fs/promises';
import path from 'node:path';

import { pullSets } from './pullSets.mjs';
import { pullCards } from './pullCards.mjs';

import { jsonToRdf } from './jsonToRdf.mjs';

const program = new Command();

program
  .name('npod-cli')
  .description("cli utilities that support development of nick's pod.")
  .version('0.0.1');

program
  .command('pull-sets')
  .description(`Pulls new set data from the Pokemon TCG API, compared against cached set data`)
  .action(pullSets);

program
  .command('pull-cards')
  .description('Pulls new card data from the Pokemon TCG API, compared against cached set data')
  .action(pullCards);

program.command('write-sets-as-rdf').action(async () => {
  const dirEnts = await fsp.readdir(path.resolve(process.cwd(), 'data', 'sets'), {
    encoding: 'utf8',
    recursive: true,
    withFileTypes: true
  });

  for (const dirEnt of dirEnts) {
    if (dirEnt.isFile() && dirEnt.name.endsWith('.json')) {
        const file = await fsp.readFile(path.resolve(dirEnt.parentPath, dirEnt.name), { encoding: 'utf8' });
        const json = await JSON.parse(file);
        await jsonToRdf(json.data, 'set');
    }
  }
});

program.command('write-cards-as-rdf').action(async () => {
  const dirEnts = await fsp.readdir(path.resolve(process.cwd(), 'data', 'cards'), {
    encoding: 'utf8',
    recursive: true,
    withFileTypes: true
  });

  for (const dirEnt of dirEnts) {
    if (dirEnt.isFile() && dirEnt.name.endsWith('.json')) {
        const file = await fsp.readFile(path.resolve(dirEnt.parentPath, dirEnt.name), { encoding: 'utf8' });
        const json = await JSON.parse(file);
        const cards = json.cards;
        for (const card of cards) {
          await jsonToRdf(card, 'pokemon');
        }
    }
  }
});

program.parse(process.argv);
