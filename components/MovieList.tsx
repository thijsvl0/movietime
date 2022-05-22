import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { iMovie } from '../types/movie';
import { Movie } from './Movie';

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: 'easeInOut',
    },
  },
};

export const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<iMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    if (router.query.query) setQuery(decodeURIComponent(router.query.query as string));
  }, [router.query]);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setIsLoading(true);
      setMovies([]);

      const res = await fetch(`/api/search/${query}`);
      const data = await res.json();

      setIsLoading(false);
      setMovies(data.results);
    };

    const queryDebounce = setTimeout(fetchMovies, 500);

    return () => clearTimeout(queryDebounce);
  }, [query]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      router.push(`/search/${encodeURIComponent(e.target.value)}`, undefined, { shallow: true });
    } else {
      router.push('/', undefined, { shallow: true });
    }

    setQuery(e.target.value);
  };

  return (
    <>
      <Head>{query && <title>{query} | MovieTime</title>}</Head>
      <input type="text" name="name" id="name" className="sticky top-4 z-10 my-4 block w-full rounded-lg border-gray-300 px-4 shadow-sm sm:text-sm" placeholder="Search" value={query} onChange={onChange} />
      {!query && <div className="text-sm">Start typing to search for movies</div>}
      {isLoading ? (
        <div className="absolute z-10 flex h-full w-full items-center justify-center bg-white bg-opacity-60">
          <div className="flex items-center">
            <span className="mr-4 text-3xl">Loading</span>
            <svg className="h-5 w-5 animate-spin text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      ) : (
        <AnimatePresence exitBeforeEnter>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {movies &&
              movies.map((movie) => (
                <motion.div layout variants={itemVariants} key={movie.id}>
                  <Movie movie={movie} />
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};
