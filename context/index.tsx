import React from 'react';
import LayoutProvider from './Layout';
import SearchProvider from './Search';
import MoviesProvider from './Movies';

interface iProps {
  children: React.ReactNode;
}

const IndexProvider: React.FC<iProps> = ({ children }) => {
  return (
    <LayoutProvider>
      <SearchProvider>
        <MoviesProvider>{children}</MoviesProvider>
      </SearchProvider>
    </LayoutProvider>
  );
};

export default IndexProvider;
