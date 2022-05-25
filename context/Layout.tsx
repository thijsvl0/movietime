import React, { useState } from 'react';

interface iProps {
  children: React.ReactNode;
}

interface iReturn {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayoutContext = React.createContext<iReturn>({ isLoading: false, setIsLoading: () => {} });

const Provider: React.FC<iProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return <LayoutContext.Provider value={{ isLoading, setIsLoading }}>{children}</LayoutContext.Provider>;
};

export default Provider;
