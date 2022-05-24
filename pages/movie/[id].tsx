import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { Layout } from '../../components/Layout';
import { fetch } from '../../lib/tmdb';
import { iMovie } from '../../types/movie';

interface iProps {
  data: iMovie;
}

const Movie: NextPage<iProps> = ({ data }) => {
  return (
    <Layout>
      <>{data.title}</>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const data = await fetch(`/movie/${id}`);

  if (!data || data.success == false) return { notFound: true };

  return {
    props: {
      data,
    },
  };
};

export default Movie;
