import type { NextPage } from 'next';
import Head from 'next/head';
import { useContext } from 'react';
import { Layout } from '../components/Layout';
import { MovieList } from '../components/MovieList';
import { SearchContext } from '../context/Search';

const Home: NextPage = () => {
  const { query, setQuery } = useContext(SearchContext);

  return (
    <>
      <Head>{query && <title>{query} | MovieTime</title>}</Head>
      <Layout>
        <MovieList />
      </Layout>
    </>
  );
};

export default Home;
