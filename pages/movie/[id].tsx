import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { call } from '../../lib/tmdb';
import { iMovie } from '../../types/movie';

interface iProps {
  data: iMovie;
}

const Movie: NextPage<iProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data.title} | MovieTime</title>
      </Head>
      <Layout>
        <>{data.title}</>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const data = await call(`/movie/${id}`);

  if (!data || data.success == false) return { notFound: true };

  return {
    props: {
      data,
    },
  };
};

export default Movie;
