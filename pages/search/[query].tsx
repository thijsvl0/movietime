import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Movie } from 'tmdb-ts';
import { MovieList } from '../../components/search/MovieList';
import { LayoutContext } from '../../context/Layout';

const Search: NextPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const router = useRouter();
  const { query } = router.query;

  const { setIsLoading } = useContext(LayoutContext);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);

    const fetchMovies = async () => {
      const res = await fetch(`/api/search/${query}`);
      const data = await res.json();

      setIsLoading(false);

      setMovies(data.results);
    };

    fetchMovies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <Head>{query && <title>{query} | MovieTime</title>}</Head>
      <MovieList movies={movies} />
    </>
  );
};

export default Search;
