import React, { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface Return {
  isLoading: boolean;
  query: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const LayoutContext = React.createContext<Return>({ isLoading: false, query: '', setIsLoading: () => {}, setQuery: () => {} });

const Provider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  return <LayoutContext.Provider value={{ isLoading, query, setIsLoading, setQuery }}>{children}</LayoutContext.Provider>;
};

export default Provider;
