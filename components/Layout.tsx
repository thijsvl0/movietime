import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { SearchContext } from '../context/Search';
import { AnimatePresence, motion } from 'framer-motion';

interface iProps {
  children: React.ReactNode;
}

export const Layout: React.FC<iProps> = ({ children }) => {
  const { query, setQuery } = useContext(SearchContext);

  const router = useRouter();

  useEffect(() => {
    if (router.query.query) setQuery(decodeURIComponent(router.query.query as string));
  }, [router.query, setQuery]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      router.push(`/search/${encodeURIComponent(e.target.value)}`, undefined, { shallow: true });
    } else {
      router.push('/', undefined, { shallow: true });
    }

    setQuery(e.target.value);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-3xl">
        <h1 className="text-4xl">
          <Link href="/" passHref>
            <a onClick={() => setQuery('')}>MovieTime</a>
          </Link>
        </h1>
        <input type="text" name="name" id="name" className="sticky top-4 z-10 my-4 block w-full rounded-lg border-gray-300 px-4 shadow-sm sm:text-sm" placeholder="Search" value={query} onChange={onChange} />
        <AnimatePresence exitBeforeEnter>
          <motion.main key={router.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: 'easeInOut', duration: 0.25 }}>
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
};
