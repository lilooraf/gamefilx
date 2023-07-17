import { GameDetail } from '@/types';
import Image from 'next/image';
import { Icons } from '@/components/icons';

interface GameDetailsImageProps {
  game?: GameDetail;
  isLoading: boolean;
  topCriticScore: number;
}

export const GameImageBanner = ({ game, isLoading, topCriticScore }: GameDetailsImageProps) => {
  if (isLoading) {
    return <div className='aspect-video h-full w-full self-center bg-gray-200/20 animate-pulse rounded-sm'></div>
  }
  if (game?.images.masthead?.og || game?.images.banner?.og) {
    return (
      <>
        <Image
          className='rounded-sm self-center h-full w-full object-cover'
          src={
            'https://img.opencritic.com/' +
            (game?.images.masthead?.og || game?.images.banner?.og)
          }
          alt={game.name}
          width={700}
          height={700}
        />
        <div className='flex absolute bottom-0 right-0 m-1 bg-black/50 p-1 rounded-md space-x-1'>
          <Icons.star className='w-4' />
          <p>{topCriticScore.toPrecision(2)}%</p>
        </div>
      </>
    );
  }
};
