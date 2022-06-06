import React from 'react';
import { classNames } from '../utils';

interface Props {
  children: React.ReactNode;
  type?: 'light' | 'dark';
}

const Title: React.FC<Props> = ({ children, type = 'light' }) => {
  return (
    <header className="py-5">
      <div className="mx-auto max-w-7xl">
        <h2 className={classNames(type == 'light' ? 'text-white' : 'text-gray-900', 'text-3xl font-bold')}>{children}</h2>
      </div>
    </header>
  );
};
export default Title;
