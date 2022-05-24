import { fetcher } from '../utils';

export const fetch = async (url: string, params: string = '') => {
  return fetcher(`https://api.themoviedb.org/3${url}?api_key=${process.env.TMDB_KEY}${params}`);
};
