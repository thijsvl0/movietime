import React, { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface Return {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const LayoutContext = React.createContext<Return>({ query: '', setQuery: () => {} });

const Provider: React.FC<Props> = ({ children }) => {
  const [query, setQuery] = useState<string>('');

  return <LayoutContext.Provider value={{ query, setQuery }}>{children}</LayoutContext.Provider>;
};

export default Provider;
