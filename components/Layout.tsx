import { useRouter } from 'next/router';
import React from 'react';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import Footer from './Footer';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="min-h-full">
      <Header />
      <LazyMotion features={domAnimation}>
        <AnimatePresence exitBeforeEnter>
          <m.main className="-mt-32" key={router.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: 'easeInOut', duration: 0.25 }}>
            <div className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">{children}</div>
          </m.main>
        </AnimatePresence>
      </LazyMotion>
      <Footer />
    </div>
  );
};
