import { MovieResult } from 'moviedb-promise/dist/request-types';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import Header from '../../components/Header';
import { MovieList } from '../../components/search/MovieList';
import { connect } from '../../lib/moviedb';

interface Props {
  movies: MovieResult[];
}
interface Params extends ParsedUrlQuery {
  query: string;
}

const Search: NextPage<Props> = ({ movies }) => {
  const router = useRouter();
  const { query } = router.query;

  return (
    <>
      <Head>{query && <title>{query} | Movie Time</title>}</Head>
      <Header>Search</Header>
      <MovieList movies={movies} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { query } = context.params as Params;

  const data = await connect().searchMovie({ query: query });

  return {
    props: {
      movies: data.results,
    },
    revalidate: 86400,
  };
};

export default Search;
