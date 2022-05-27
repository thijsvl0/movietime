import React from 'react';
import LayoutProvider from './Layout';
import SearchProvider from './Search';
import MoviesProvider from './Movies';

interface Props {
  children: React.ReactNode;
}

const IndexProvider: React.FC<Props> = ({ children }) => {
  return (
    <LayoutProvider>
      <SearchProvider>
        <MoviesProvider>{children}</MoviesProvider>
      </SearchProvider>
    </LayoutProvider>
  );
};

export default IndexProvider;
