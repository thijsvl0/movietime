import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { SearchContext } from '../context/Search';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutContext } from '../context/Layout';

interface iProps {
  children: React.ReactNode;
}

export const Layout: React.FC<iProps> = ({ children }) => {
  const { query, setQuery } = useContext(SearchContext);
  const { isLoading } = useContext(LayoutContext);

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
    <>
      <div className="bg-gray-800 pb-32">
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">Movie Time</h1>
            <input type="text" name="name" id="name" className="sticky top-4 z-10 my-4 block w-full rounded-lg border-gray-300 px-4 shadow-sm sm:text-sm" placeholder="Search" value={query} onChange={onChange} />
          </div>
        </header>
      </div>

      <AnimatePresence exitBeforeEnter>
        <motion.main className="-mt-32" key={router.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: 'easeInOut', duration: 0.25 }}>
          <div className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="absolute z-10 flex h-full w-full items-center justify-center">
                <div className="flex items-center rounded-lg bg-white px-4 py-3 shadow">
                  <span className="mr-4 text-2xl">Loading...</span>
                  <svg className="h-5 w-5 animate-spin text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
            ) : (
              children
            )}
          </div>
        </motion.main>
      </AnimatePresence>
    </>
  );
};
