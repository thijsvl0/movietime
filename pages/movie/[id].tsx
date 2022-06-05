import { MovieImagesResponse, MovieResponse } from 'moviedb-promise/dist/request-types';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { connect } from '../../lib/moviedb';

interface Props {
  movie: MovieResponse;
  images: MovieImagesResponse;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const Movie: NextPage<Props> = ({ movie, images }) => {
  return (
    <>
      <Head>
        <title>{movie && movie.title} | Movie Time</title>
      </Head>
      <div className="py-5">
        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-9 md:gap-x-4">
          <div className="relative col-span-2 aspect-[9/16] overflow-hidden rounded-lg shadow">
            <Image src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : '/no_image.webp'} alt={movie.title} layout="fill" objectFit="cover" loading="eager" />
          </div>
          <Swiper className="relative col-span-7 aspect-[16/9] w-full overflow-hidden rounded-lg shadow">
            {images.backdrops?.map((image, key) => (
              <SwiperSlide key={key}>
                <Image src={`https://image.tmdb.org/t/p/original${image.file_path}`} alt={movie.title} layout="fill" objectFit="cover" loading="eager" />
              </SwiperSlide>
            ))}
          </Swiper>
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

  const images = await connect().movieImages({ id: id });

  return {
    props: {
      movie,
      images,
    },
    revalidate: 86400,
  };
};

export default Movie;
