import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import IndexProvider from '../context';
import { Layout } from '../components/Layout';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script async defer data-website-id="6098b96d-644b-435f-80df-23fc465180a2" src="https://analytics.yeboii.com/umami.js"></script>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>MovieTime</title>
      </Head>
      <NextNProgress />
      <IndexProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </IndexProvider>
    </>
  );
}

export default MyApp;
