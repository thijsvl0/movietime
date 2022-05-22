import React from 'react';

interface iProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = React.createContext<iProps>({ query: '', setQuery: () => {} });

export default SearchContext;
