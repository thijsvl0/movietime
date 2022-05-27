import TMDB from 'tmdb-ts';

export const connect = () => {
  return new TMDB(process.env.TMDB_KEY as string);
};
