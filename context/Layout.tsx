import React, { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface Return {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayoutContext = React.createContext<Return>({ isLoading: false, setIsLoading: () => {} });

const Provider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return <LayoutContext.Provider value={{ isLoading, setIsLoading }}>{children}</LayoutContext.Provider>;
};

export default Provider;
