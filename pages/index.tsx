import type { NextPage } from 'next';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { LayoutContext } from '../context/Layout';

const Home: NextPage = () => {
  const { setHeader } = useContext(LayoutContext);

  useEffect(() => {
    setHeader('Home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>MovieTime</title>
      </Head>
    </>
  );
};

export default Home;
