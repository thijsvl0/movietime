import { MovieResult } from 'moviedb-promise/dist/request-types';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Title from '../components/Title';
import { MovieList } from '../components/home/MovieList';
import { connect } from '../lib/moviedb';

interface Props {
  popularMovies: MovieResult[];
  upcomingMovies: MovieResult[];
}

const Home: NextPage<Props> = ({ popularMovies, upcomingMovies }) => {
  return (
    <>
      <Head>
        <title>Movie Time</title>
      </Head>
      <section>
        <Title>Popular Now</Title>
        <MovieList movies={popularMovies} />
      </section>
      <section>
        <Title type="dark">Upcoming</Title>
        <MovieList movies={upcomingMovies} />
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const popularData = await connect().moviePopular();
  const upcomingData = await connect().upcomingMovies({});

  return {
    props: {
      popularMovies: popularData.results,
      upcomingMovies: upcomingData.results,
    },
    revalidate: 86400,
  };
};

export default Home;
