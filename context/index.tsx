import React from 'react';
import LayoutProvider from './Layout';

interface Props {
  children: React.ReactNode;
}

const IndexProvider: React.FC<Props> = ({ children }) => {
  return <LayoutProvider>{children}</LayoutProvider>;
};

export default IndexProvider;
