import { iMovie } from '../../../types/movie';
import type { NextApiRequest, NextApiResponse } from 'next';

interface iData {
  results: iMovie[];
}

export const handler = async (req: NextApiRequest, res: NextApiResponse<iData>) => {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${req.query.query}`);
  const data = await response.json();

  res.status(200).json({ results: data.results });
};

export default handler;
