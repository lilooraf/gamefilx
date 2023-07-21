import { GameDetail } from '@/types';
import Image from 'next/image';
import { GameImagesSkeleton } from './skeleton';

interface GameImagesProps {
  game?: GameDetail;
  isLoading: boolean;
}

export const GameImages = ({ game, isLoading }: GameImagesProps) => {
  if (isLoading) {
    return <GameImagesSkeleton />
  }
  return (
    <div className='flex space-x-2 group overflow-x-scroll scroll-smooth'>
      {game?.images?.screenshots?.map((screenshot) => (
        <Image
          key={screenshot.og}
          alt='screenshot'
          className='rounded-sm self-center w-64 md:w-96 aspect-video bg-gray-200/20'
          src={`https://img.opencritic.com/${screenshot.og}`}
          width={800}
          height={800}
        />
      ))}
    </div>
  );
};

export { GameImagesSkeleton } from './skeleton';
