import React, { useCallback, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { iMovie } from '../types/movie';
import { fetcher } from '../utils';
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
  const [shouldLoad, setShouldLoad] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { query } = useContext(SearchContext);

  const { data } = useSWR(shouldLoad ? `/api/search/${query}` : null, fetcher);

  useEffect(() => {
    if (!data) return;

    setMovies(data.results);
    setIsLoading(false);
    setShouldLoad(false);
  }, [data]);

  useEffect(() => {
    setIsLoading(true);
    if (!query) return;

    const queryDebounce = setTimeout(() => setShouldLoad(true), 500);

    return () => clearTimeout(queryDebounce);
  }, [query]);

  return <MoviesContext.Provider value={{ movies, isLoading, setMovies, setIsLoading }}>{children}</MoviesContext.Provider>;
};

export default Provider;
