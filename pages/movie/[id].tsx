import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { MovieDetails } from 'tmdb-ts';
import { LayoutContext } from '../../context/Layout';
import { connect } from '../../lib/tmdb';

interface Props {
  movie: MovieDetails;
}

const Movie: NextPage<Props> = ({ movie }) => {
  const { setHeader } = useContext(LayoutContext);

  useEffect(() => {
    setHeader(movie.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{movie && movie.title} | MovieTime</title>
      </Head>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">{movie.overview}</div>
      </div>
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
