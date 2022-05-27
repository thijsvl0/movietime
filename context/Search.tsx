import React, { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface Return {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = React.createContext<Return>({ query: '', setQuery: () => {} });

const Provider: React.FC<Props> = ({ children }) => {
  const [query, setQuery] = useState<string>('');

  return <SearchContext.Provider value={{ query, setQuery }}>{children}</SearchContext.Provider>;
};

export default Provider;
