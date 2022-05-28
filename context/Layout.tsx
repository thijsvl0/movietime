import React, { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface Return {
  query: string;
  header: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setHeader: React.Dispatch<React.SetStateAction<string>>;
}

export const LayoutContext = React.createContext<Return>({ query: '', header: '', setQuery: () => {}, setHeader: () => {} });

const Provider: React.FC<Props> = ({ children }) => {
  const [query, setQuery] = useState<string>('');
  const [header, setHeader] = useState<string>('');

  return <LayoutContext.Provider value={{ query, header, setQuery, setHeader }}>{children}</LayoutContext.Provider>;
};

export default Provider;
