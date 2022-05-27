import type { NextPage } from 'next';
import Head from 'next/head';
import { useContext } from 'react';
import { MovieList } from '../components/MovieList';
import { SearchContext } from '../context/Search';

const Home: NextPage = () => {
  const { query } = useContext(SearchContext);

  return (
    <>
      <Head>{query && <title>{query} | MovieTime</title>}</Head>
      <MovieList />
    </>
  );
};

export default Home;
