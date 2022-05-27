import React, { useContext, useEffect, useState } from 'react';
import { Movie } from 'tmdb-ts';
import { LayoutContext } from './Layout';
import { SearchContext } from './Search';

interface Props {
  children: React.ReactNode;
}

interface Return {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export const MoviesContext = React.createContext<Return>({ movies: [], setMovies: () => {} });

const Provider: React.FC<Props> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
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

  return <MoviesContext.Provider value={{ movies, setMovies }}>{children}</MoviesContext.Provider>;
};

export default Provider;
