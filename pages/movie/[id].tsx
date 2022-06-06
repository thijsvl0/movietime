import { CreditsResponse, MovieImagesResponse, MovieResponse } from 'moviedb-promise/dist/request-types';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { connect } from '../../lib/moviedb';
import { Navigation, Pagination } from 'swiper';
import GenreBadge from '../../components/GenreBadge';
import SubTitle from '../../components/SubTitle';
import Title from '../../components/Title';
import { StarIcon } from '@heroicons/react/solid';

interface Props {
  movie: MovieResponse;
  images: MovieImagesResponse;
  credits: CreditsResponse;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const Movie: NextPage<Props> = ({ movie, images, credits }) => {
  return (
    <>
      <Head>
        <title>{movie.title} | Movie Time</title>
      </Head>
      <div className="flex items-center justify-between">
        <div>
          <Title>{movie.title}</Title>
          <div className="-mt-4 text-gray-400">
            {new Date(movie.release_date ?? '').getUTCFullYear()}
            {movie.runtime && (
              <>
                {' '}
                - {movie.runtime > 60 && <>{(movie.runtime / 60).toFixed(0)}hr</>} {movie.runtime % 60}m
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-1 pt-5 text-gray-400">
          <div className="col-span-3 ">Rating</div>
          <div className="col-span-1 text-yellow-300">
            <StarIcon className="h-12" />
          </div>
          <div className="col-span-2">
            <span className="inline-flex items-end gap-x-1">
              <h4 className="text-lg leading-normal text-white">{movie.vote_average}</h4> / 10
            </span>
            {movie.vote_count && <div className="text-sm">{(movie.vote_count / 1000).toPrecision(2)}K</div>}
          </div>
        </div>
      </div>
      <div className="py-5">
        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-12 md:gap-x-4">
          <div className="relative aspect-[9/16] overflow-hidden rounded-lg shadow md:col-span-3">
            <Image src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : '/no_image.webp'} alt={movie.title} layout="fill" objectFit="cover" loading="eager" />
          </div>
          <div className="md:col-span-8 md:row-start-2">
            <div className="mb-4 flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <GenreBadge genre={genre} key={genre.id} />
              ))}
            </div>
            <p>{movie.overview}</p>
          </div>
          <div className="md:col-span-4 md:row-start-2">
            <SubTitle type="dark">Top Cast</SubTitle>
            {credits.cast?.map((cast) => (
              <div key={cast.id} className="mb-2 grid grid-cols-6">
                <div className="col-span-2 px-4">
                  <div className="relative aspect-square w-full overflow-hidden rounded-full">
                    <Image src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} alt={cast.name} layout="fill" objectFit="cover" />
                  </div>
                </div>
                <div className="col-span-4 flex flex-col justify-center">
                  <div>{cast.name}</div>
                  <div className="text-sm text-gray-700">as {cast.character}</div>
                </div>
              </div>
            ))}
          </div>
          <Swiper modules={[Navigation, Pagination]} navigation pagination className="relative col-span-full row-start-3 aspect-video h-full w-full overflow-hidden rounded-lg shadow md:col-start-4 md:row-start-1 md:aspect-auto">
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
  const credits = await connect().movieCredits({ id: id });

  credits.cast = credits.cast?.sort((a, b) => (b?.popularity ?? 0) - (a?.popularity ?? 0)).slice(0, 5);

  return {
    props: {
      movie,
      images,
      credits,
    },
    revalidate: 86400,
  };
};

export default Movie;
