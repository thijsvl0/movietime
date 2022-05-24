import React from 'react';
import SearchProvider from './Search';
import MoviesProvider from './Movies';

interface iProps {
  children: React.ReactNode;
}

const IndexProvider: React.FC<iProps> = ({ children }) => {
  return (
    <SearchProvider>
      <MoviesProvider>{children}</MoviesProvider>
    </SearchProvider>
  );
};

export default IndexProvider;
