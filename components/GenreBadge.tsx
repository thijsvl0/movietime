import { Genre } from 'moviedb-promise/dist/types';
import type { FC } from 'react';

interface Props {
  genre: Genre;
}

const GenreBadge: FC<Props> = ({ genre }) => {
  return <span className="inline-flex items-center whitespace-nowrap rounded-full border-2 border-gray-700 px-3 py-0.5 text-sm font-medium">{genre.name}</span>;
};
export default GenreBadge;
