import React, { useState } from 'react';

interface iProps {
  children: React.ReactNode;
}

interface iReturn {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = React.createContext<iReturn>({ query: '', setQuery: () => {} });

const Provider: React.FC<iProps> = ({ children }) => {
  const [query, setQuery] = useState<string>('');

  return <SearchContext.Provider value={{ query, setQuery }}>{children}</SearchContext.Provider>;
};

export default Provider;
