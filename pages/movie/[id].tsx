import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { MovieDetails } from 'tmdb-ts';
import { connect } from '../../lib/tmdb';

interface Props {
  movie: MovieDetails;
}

const Movie: NextPage<Props> = ({ movie }) => {
  return (
    <>
      <Head>
        <title>{movie && movie.title} | MovieTime</title>
      </Head>
      {movie.overview}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  const movie = await connect().movies.details(parseInt(id as string));

  return {
    props: {
      movie,
    },
  };
};

export default Movie;
