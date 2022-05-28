import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Movie } from 'tmdb-ts';
interface Props {
  movie: Movie;
}

export const MovieListItem: React.FC<Props> = ({ movie }) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="group h-full cursor-pointer rounded-lg bg-white shadow transition-colors duration-500 hover:bg-gray-100 ">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg rounded-b-none ">
          <Image src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : '/no_image.webp'} alt={movie.title} layout="fill" objectFit="cover" loading="eager" className="transition-opacity duration-500 group-hover:opacity-75" />
        </div>
        <div className="px-5 py-6 sm:px-6">
          <h3 className="mt-2 text-sm text-gray-700">{movie.release_date ? movie.release_date : 'To be announced'}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">{movie.title}</p>
        </div>
      </div>
    </Link>
  );
};
