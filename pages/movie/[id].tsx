import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { MovieDetails } from 'tmdb-ts';
import { connect } from '../../lib/tmdb';

interface Props {
  movie: MovieDetails;
}
interface Params extends ParsedUrlQuery {
  id: string;
}

const Movie: NextPage<Props> = ({ movie }) => {
  return (
    <>
      <Head>
        <title>{movie && movie.title} | Movie Time</title>
      </Head>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">{movie.overview}</div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as Params;

  const movie = await connect().movies.details(parseInt(id));

  return {
    props: {
      movie,
    },
    revalidate: 86400,
  };
};

export default Movie;
