import { existsSync } from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';

import Handlebars from 'handlebars';

const collectorIRI = '<https://nick.datapod.igrant.io/profile/card#me>';

export async function jsonToRdf(json, datatype) {
  if (datatype === 'pokemon') {
    /** Cards RDF */
    try {
      if (!existsSync(path.resolve(process.cwd(), 'schemas', 'POKEMON', 'INSTANCES', json.set.id))) {
        await makeCardsSubDir(json);
      }

      const rdf = await convertPokemonCardJsonToRdf(json);
      await fsp.writeFile(getCardPath(json), rdf, { encoding: 'utf8' });
    } catch (e) {
      console.error(`
            Error ${e.name}
            Message ${e.message}
            Stack ${e.stack}
        `);
    }
  } else {
    /** Sets RDF */
    try {
      const rdf = await convertPokemonSetJsonToRdf(json);
      await fsp.writeFile(getSetPath(json), rdf, { encoding: 'utf8' });
    } catch (e) {
      console.error(`
            Error ${e.name}
            Message ${e.message}
            Stack ${e.stack}
        `);
    }
  }
}

async function convertPokemonSetJsonToRdf(json) {
  const template = await getHbs('set');
  return template(formatSetJsonForHbs(json));
}

async function convertPokemonCardJsonToRdf(json) {
  const template = await getHbs('card');
  return template(formatCardJsonForHbs(json, getSetIRI(json.set.id)));
}

async function getHbs(template) {
  return Handlebars.compile(
    await fsp.readFile(path.resolve(process.cwd(), 'bin', 'hbs', template + '.hbs'), { encoding: 'utf8' }),
    { noEscape: true }
  );
}

function formatSetJsonForHbs(json) {
  return {
    iri: getSetIRI(json.id),
    label: `The ${json.name} Set`,
    comment: ``, // TODO what makes sense as a comment here
    setId: json.id,
    name: json.name,
    series: json.series,
    printedTotal: json.printedTotal,
    total: json.total,
    releaseDate: json.releaseDate,
    updatedAt: json.updatedAt,
    images: json.images
  };
}

function formatCardJsonForHbs(json, setIRI) {
  return {
    date: Intl.DateTimeFormat('en-US').format(new Date(Date.now())),
    card: getCardIRI(json),
    label: `${json.name} from the ${json.set.name} Set`,
    comment: `@Note, we're seeking feedback on this format for the Pokemon TCG RDF Vocabulary, if you have feedback please reach out to <#Collector>`, // TODO what makes sense as a comment here
    setId: json.set.id,
    name: json.name,
    supertype: json.supertype,
    subtypes: rdfArray(json.subtypes),
    hp: json.hp,
    types: rdfArray(json.types),
    abilities: rdfObject(json.abilities),
    attacks: rdfObject(json.attacks),
    weaknesses: rdfObject(json.weaknesses),
    retreatCost: rdfArray(json.retreatCost),
    convertedRetreatCost: json.convertedRetreatCost,
    number: json.number,
    artist: json.artist,
    rarity: json.rarity,
    flavorText: json.flavorText,
    nationalPokedexNumbers: rdfArray(json.nationalPokedexNumbers),
    images: `${json.images.small}, ${json.images.large}`,
    tcgplayer: json?.tcgplayer?.url || '',
    cardmarket: json?.cardmarket?.url || '',
    setIRI,
    collectorIRI
  };
}

function getSetIRI(setId) {
  return `<https://nick.datapod.igrant.io/schemas/POKEMON/sets/${setId}>`;
}

function getCardIRI(json) {
  return encodeURIComponent(`${json.id.replaceAll('-', '_')}_${json.name.replaceAll(/[\s'".;]/g, '_')}`);
}

function getSetPath(json) {
  return path.resolve(process.cwd(), 'schemas', 'POKEMON', 'INSTANCES', `${json.id}.ttl`);
}

function getCardPath(json) {
  return path.resolve(process.cwd(), 'schemas', 'POKEMON', 'INSTANCES', `${json.set.id}`, `${json.id}.ttl`);
}

async function makeCardsSubDir(json) {
  try {
    await fsp.mkdir(path.resolve(process.cwd(), 'schemas', 'POKEMON', 'INSTANCES', json.set.id));
  } catch (e) {
    console.error('make cards subdir failed');
    console.error(e);
    throw e;
  }
}

function rdfArray(array) {
  if (Array.isArray(array)) {
    return array.join(', ');
  } else {
    return JSON.stringify(array);
  }
}

function rdfObject(object) {
  if (typeof object === 'object') {
    return Object.entries(object)
      .map(([k, v]) => {
        if (typeof v === 'object') {
          return `${k}>${rdfObject(v)}`;
        } else {
          return `${k}:${v}`;
        }
      })
      .join(', ');
  } else {
    return JSON.stringify(object);
  }
}
