import { Search, Movie } from 'tmdb-ts';
import { connect } from './../../../lib/tmdb';
import { NextApiRequest, NextApiResponse } from 'next';

export const handler = async (req: NextApiRequest, res: NextApiResponse<Search<Movie>>) => {
  const data = await connect().search.movies({ query: req.query.query as string });

  res.status(200).json(data);
};

export default handler;
