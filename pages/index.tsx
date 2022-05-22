import type { NextPage } from 'next';
import Head from 'next/head';
import { MovieList } from '../components/MovieList';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MovieTime</title>
      </Head>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl">MovieTime</h1>
          <MovieList />
        </div>
      </div>
    </>
  );
};

export default Home;
