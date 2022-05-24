import type { NextPage } from 'next';
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
