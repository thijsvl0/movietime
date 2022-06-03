import React from 'react';
import { classNames } from '../utils';

interface Props {
  children: React.ReactNode;
  type?: 'light' | 'dark';
}

const Header: React.FC<Props> = ({ children, type = 'light' }) => {
  return (
    <header className="py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className={classNames(type == 'light' ? 'text-white' : 'text-gray-900', 'text-3xl font-bold')}>{children}</h1>
      </div>
    </header>
  );
};
export default Header;
