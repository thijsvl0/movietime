import React, { useCallback, useContext, useEffect, useState } from 'react';
import { iMovie } from '../types/movie';
import { LayoutContext } from './Layout';
import { SearchContext } from './Search';

interface iProps {
  children: React.ReactNode;
}

interface iReturn {
  movies: iMovie[];
  getMovie(id: number): iMovie | undefined;
  setMovies: React.Dispatch<React.SetStateAction<iMovie[]>>;
}

export const MoviesContext = React.createContext<iReturn>({ movies: [], getMovie: () => undefined, setMovies: () => {} });

const Provider: React.FC<iProps> = ({ children }) => {
  const [movies, setMovies] = useState<iMovie[]>([]);
  const { setIsLoading } = useContext(LayoutContext);

  const { query } = useContext(SearchContext);

  useEffect(() => {
    setMovies([]);

    if (!query) return;

    setIsLoading(true);

    const fetchMovies = async () => {
      const res = await fetch(`/api/search/${query}`);
      const data = await res.json();

      setIsLoading(false);

      setMovies(data.results);
    };

    const queryDebounce = setTimeout(fetchMovies, 500);

    return () => {
      setIsLoading(false);
      clearTimeout(queryDebounce);
    };
  }, [query, setIsLoading]);

  const getMovie = (id: number) => {
    const movie = movies.find((movie) => movie.id === id);

    if (!movie) return;

    return movie;
  };

  return <MoviesContext.Provider value={{ movies, getMovie, setMovies }}>{children}</MoviesContext.Provider>;
};

export default Provider;
