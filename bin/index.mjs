#! /usr/bin/env node

import { Command } from 'commander';

import { pullSets } from './pullSets.mjs';
import { pullCards } from './pullCards.mjs';

const program = new Command();

program
    .name('npod-cli')
    .description('cli utilities that support development of nick\'s pod.')
    .version('0.0.1');

program
    .command('pull-sets')
    .description(`Pulls new set data from the Pokemon TCG API, compared against cached set data`)
    .action(pullSets)

program
    .command('pull-cards')
    .description('Pulls new card data from the Pokemon TCG API, compared against cached set data')
    .action(pullCards);


program.parse(process.argv);