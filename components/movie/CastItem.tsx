import { Cast } from 'moviedb-promise/dist/request-types';
import Image from 'next/image';
import type { FC } from 'react';
import { PLACEHOLDER_IMAGE } from '../../utils';

interface Props {
  cast: Cast;
}

const CastItem: FC<Props> = ({ cast }) => {
  return (
    <div className="mb-2 grid grid-cols-6">
      <div className="col-span-2 px-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-full">
          <Image src={cast.profile_path ? `https://image.tmdb.org/t/p/original${cast.profile_path}` : '/no_image.webp'} placeholder="blur" blurDataURL={PLACEHOLDER_IMAGE} alt={cast.name} layout="fill" sizes="(max-width: 640px) 25vw, 160px" quality={65} objectFit="cover" loading="eager" />
        </div>
      </div>
      <div className="col-span-4 flex flex-col justify-center">
        <div>{cast.name}</div>
        <div className="text-sm text-gray-700">as {cast.character}</div>
      </div>
    </div>
  );
};
export default CastItem;
