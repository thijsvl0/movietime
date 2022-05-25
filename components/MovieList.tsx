import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext } from 'react';
import { LayoutContext } from '../context/Layout';
import { MoviesContext } from '../context/Movies';
import { SearchContext } from '../context/Search';
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
  const { movies } = useContext(MoviesContext);
  const { query } = useContext(SearchContext);
  const { isLoading } = useContext(LayoutContext);

  return (
    <>
      {query && query.length ? (
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
      ) : (
        <div className="text-sm">Start typing to search for movies</div>
      )}
    </>
  );
};
