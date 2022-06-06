import Link from 'next/link';
import type { FC } from 'react';

interface Props {}

const Footer: FC<Props> = ({}) => {
  return (
    <footer>
      <div className="mx-auto max-w-7xl py-12 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <p className="text-center text-base text-gray-400">
          {new Date().getUTCFullYear()} <Link href="https://thijsvanlaarhoven.nl">Thijs van Laarhoven</Link>.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
