import { StarIcon } from '@heroicons/react/solid';
import { MovieResult } from 'moviedb-promise/dist/request-types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PLACEHOLDER_IMAGE, slugify } from '../../utils';

interface Props {
  movie: MovieResult;
}

export const MovieListItem: React.FC<Props> = ({ movie }) => {
  return (
    <Link href={`/movie/${movie.id}-${movie.title ? slugify(movie.title.slice(0, 40)) : ''}`} prefetch={false}>
      <div className="group h-full w-44 cursor-pointer rounded-lg bg-white shadow">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg rounded-b-none">
          <Image
            src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : '/no_image.webp'}
            placeholder="blur"
            blurDataURL={PLACEHOLDER_IMAGE}
            alt={movie.title}
            layout="fill"
            sizes="11rem"
            quality={65}
            objectFit="cover"
            className="transition-opacity duration-500 group-hover:opacity-75"
            loading="eager"
          />
        </div>
        <div className="px-3 pb-4 pt-2 sm:px-6">
          <span className="inline-flex items-center text-yellow-300">
            <StarIcon className="mr-1 inline-block h-4" />
            {movie.vote_average}
          </span>
          <h3 className="text-sm text-gray-700">{movie.release_date ? movie.release_date : 'To be announced'}</h3>
          <p className="mt-1 text-base font-medium text-gray-900">{movie.title}</p>
        </div>
      </div>
    </Link>
  );
};
