import React from 'react';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import { MovieListItem } from './MovieListItem';
import { MovieResult } from 'moviedb-promise/dist/request-types';

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
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

interface Props {
  movies: MovieResult[];
}

export const MovieList: React.FC<Props> = ({ movies }) => {
  return (
    <div className="hide-scroll-bar flex overflow-x-scroll pb-8">
      <LazyMotion features={domAnimation}>
        <m.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-nowrap gap-x-4">
          {movies.map((movie) => (
            <m.div layout variants={itemVariants} key={movie.id}>
              <MovieListItem movie={movie} />
            </m.div>
          ))}
        </m.div>
      </LazyMotion>
    </div>
  );
};
