import React from 'react';
import { classNames } from '../utils';

interface Props {
  children: React.ReactNode;
  type?: 'light' | 'dark';
}

const SubTitle: React.FC<Props> = ({ children, type = 'light' }) => {
  return (
    <header className="py-3">
      <div className="mx-auto max-w-7xl">
        <h3 className={classNames(type == 'light' ? 'text-white' : 'text-gray-900', 'text-2xl font-bold')}>{children}</h3>
      </div>
    </header>
  );
};
export default SubTitle;
