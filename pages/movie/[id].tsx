import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { MoviesContext } from '../../context/Movies';
import { iMovie } from '../../types/movie';

const Movie: NextPage = () => {
  const [movie, setMovie] = useState<iMovie>();
  const { getMovie } = useContext(MoviesContext);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>{movie && movie.title} | MovieTime</title>
      </Head>
      <Layout>
        <>{movie && movie.title}</>
      </Layout>
    </>
  );
};

export default Movie;
