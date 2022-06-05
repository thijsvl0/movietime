import { MovieResponse } from 'moviedb-promise/dist/request-types';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import { connect } from '../../lib/moviedb';

interface Props {
  movie: MovieResponse;
}
interface Params extends ParsedUrlQuery {
  id: string;
}

const Movie: NextPage<Props> = ({ movie }) => {
  return (
    <>
      <Head>
        <title>{movie && movie.title} | Movie Time</title>
      </Head>
      <div className="py-5">
        <div className="grid grid-cols-3 gap-x-4">
          <div className="relative col-span-1 aspect-[9/16]">
            <Image src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : '/no_image.webp'} alt={movie.title} layout="fill" objectFit="cover" loading="eager" className="transition-opacity duration-500 group-hover:opacity-75" />
          </div>
          <div className="relative col-span-2 aspect-[19/16]"></div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as Params;

  const movie = await connect().movieInfo({ id: id });

  if (!movie.id) return { notFound: true };

  return {
    props: {
      movie,
    },
    revalidate: 86400,
  };
};

export default Movie;
