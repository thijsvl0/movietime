import { MovieDb } from 'moviedb-promise';

export const connect = () => {
  return new MovieDb(process.env.TMDB_KEY as string);
};
