import React, { useCallback, useContext, useEffect, useState } from 'react';
import { iMovie } from '../types/movie';
import { SearchContext } from './Search';

interface iProps {
  children: React.ReactNode;
}

interface iReturn {
  movies: iMovie[];
  isLoading: boolean;
  setMovies: React.Dispatch<React.SetStateAction<iMovie[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MoviesContext = React.createContext<iReturn>({ movies: [], isLoading: false, setMovies: () => {}, setIsLoading: () => {} });

const Provider: React.FC<iProps> = ({ children }) => {
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

  return <MoviesContext.Provider value={{ movies, isLoading, setMovies, setIsLoading }}>{children}</MoviesContext.Provider>;
};

export default Provider;
