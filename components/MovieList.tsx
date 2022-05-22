import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import SearchContext from '../context/SearchContext';
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

  const { query } = useContext(SearchContext);

  useEffect(() => {
    setIsLoading(true);
    setMovies([]);

    if (!query) return;

    const fetchMovies = async () => {
      const res = await fetch(`/api/search/${query}`);
      const data = await res.json();

      setIsLoading(false);
      setMovies(data.results);
    };

    const queryDebounce = setTimeout(fetchMovies, 500);

    return () => clearTimeout(queryDebounce);
  }, [query]);

  return (
    <>
      {query && query.length ? (
        isLoading ? (
          <div className="absolute z-10 flex h-full w-full items-center justify-center bg-white bg-opacity-60">
            <div className="flex items-center">
              <span className="mr-4 text-2xl">Loading...</span>
              <svg className="h-5 w-5 animate-spin text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        ) : (
          <AnimatePresence exitBeforeEnter>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {movies && movies.length ? (
                movies.map((movie) => (
                  <motion.div layout variants={itemVariants} key={movie.id}>
                    <Movie movie={movie} />
                  </motion.div>
                ))
              ) : (
                <div className="text-sm">No movies found</div>
              )}
            </motion.div>
          </AnimatePresence>
        )
      ) : (
        <div className="text-sm">Start typing to search for movies</div>
      )}
    </>
  );
};
