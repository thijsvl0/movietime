import type { NextPage } from 'next';
import { useState } from 'react';
import { Layout } from '../components/Layout';
import { MovieList } from '../components/MovieList';

const Home: NextPage = () => {
  return (
    <Layout>
      <MovieList />
    </Layout>
  );
};

export default Home;
