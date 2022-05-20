import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface iMovie {
  id: number;
  title: string;
  image: string;
  description: string;
}

export const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<iMovie[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setMovies([]);

      const res = await fetch(`https://imdb-api.com/en/API/SearchMovie/k_r68pbbap/${query}`);
      const data = await res.json();

      setMovies(data.results);
    };

    const queryDebounce = setTimeout(fetchMovies, 500);

    return () => clearTimeout(queryDebounce);
  }, [query]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <input type="text" name="name" id="name" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full" placeholder="Search" onChange={onChange} />
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {movies &&
          movies.map((movie) => (
            <>
              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <div key={movie.id} className="group">
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <Image src={movie.image} alt={movie.title} layout="fill" className="w-full h-full object-center object-cover group-hover:opacity-75" />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{movie.title}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{movie.description}</p>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};
