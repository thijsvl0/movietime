import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutContext } from '../context/Layout';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const { query, setQuery } = useContext(LayoutContext);

  const router = useRouter();

  useEffect(() => {
    setQuery((router.query?.query ?? '') as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !query) return;

    router.push(`/search/${encodeURIComponent(query)}`);
  };

  return (
    <>
      <div className="bg-gray-800 pb-32">
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">Movie Time</h1>
            <input type="text" name="name" id="name" className="sticky top-4 z-10 my-4 block w-full rounded-lg border-gray-300 px-4 shadow-sm sm:text-sm" placeholder="Search" value={query} onChange={onChange} onKeyUp={onKeyUp} />
          </div>
        </header>
      </div>

      <AnimatePresence exitBeforeEnter>
        <motion.main className="-mt-32" key={router.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: 'easeInOut', duration: 0.25 }}>
          <div className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">{children}</div>
        </motion.main>
      </AnimatePresence>
    </>
  );
};
