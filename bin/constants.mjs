import dotenv from 'dotenv';
dotenv.config();

export const POKEMON_TCG_API_URL = 'https://api.pokemontcg.io/v2/';
export const MAX_PAGE_SIZE = 250;
export const MAX_PAGES = 2;

export const DEFAULT_HTTP_OPTIONS = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Accept-Encoding': 'gzip, br',
    'X-Api-Key': process.env.POKEMON_TCG_API_KEY
  }
};
