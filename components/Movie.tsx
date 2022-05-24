import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { iMovie } from '../types/movie';
interface iProps {
  movie: iMovie;
}

export const Movie: React.FC<iProps> = ({ movie }) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="group h-full cursor-pointer rounded-lg transition-colors duration-500 hover:bg-gray-100">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
          <Image src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : '/no_image.webp'} alt={movie.title} layout="fill" objectFit="cover" loading="eager" className="transition-opacity duration-500 group-hover:opacity-75" />
        </div>
        <div className="p-2">
          <h3 className="mt-2 text-sm text-gray-700">{movie.release_date ? movie.release_date : 'To be announced'}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">{movie.title}</p>
        </div>
      </div>
    </Link>
  );
};
