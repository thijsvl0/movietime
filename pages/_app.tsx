import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import SearchContext from '../context/SearchContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [query, setQuery] = useState<string>('');

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>MovieTime</title>
      </Head>
      <SearchContext.Provider value={{ query, setQuery }}>
        <Component {...pageProps} />
      </SearchContext.Provider>
    </>
  );
}

export default MyApp;
