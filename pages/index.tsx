import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Movie } from 'tmdb-ts';
import Header from '../components/Header';
import { MovieList } from '../components/home/MovieList';
import { connect } from '../lib/tmdb';

interface Props {
  popularMovies: Movie[];
  upcomingMovies: Movie[];
}

const Home: NextPage<Props> = ({ popularMovies, upcomingMovies }) => {
  return (
    <>
      <Head>
        <title>Movie Time</title>
      </Head>
      <section>
        <Header>Popular Now</Header>
        <MovieList movies={popularMovies} />
      </section>
      <section>
        <Header type="dark">Upcoming</Header>
        <MovieList movies={upcomingMovies} />
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const popularData = await connect().movies.popular();
  const upcomingData = await connect().movies.upcoming();

  return {
    props: {
      popularMovies: popularData?.results ?? [],
      upcomingMovies: upcomingData?.results ?? [],
    },
    revalidate: 86400,
  };
};

export default Home;
