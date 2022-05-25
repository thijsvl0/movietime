export const call = async (url: string, params: string = '') => {
  const res = await fetch(`https://api.themoviedb.org/3${url}?api_key=${process.env.TMDB_KEY}${params}`);
  const data = await res.json();

  return data;
};
