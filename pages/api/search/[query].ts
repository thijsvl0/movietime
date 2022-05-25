import { iMovie } from '../../../types/movie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { call } from '../../../lib/tmdb';

interface iData {
  results: iMovie[];
  error?: string;
}

export const handler = async (req: NextApiRequest, res: NextApiResponse<iData>) => {
  const data = await call('/search/movie', `&query=${req.query.query}`);

  if (!data || data.success == false) return res.status(404).json({ results: [], error: 'No results found' });

  res.status(200).json({ results: data.results });
};

export default handler;
