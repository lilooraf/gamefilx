import Image from 'next/image';
import { Icons } from '@/components/icons';
import { GameDetail } from '@/types';

interface GameDetailsImageProps {
  game?: GameDetail;
  isLoading: boolean;
  topCriticScore?: number | null;
}

export const GameImageBanner = ({
  game,
  isLoading,
  topCriticScore,
}: GameDetailsImageProps) => {
  if (isLoading) {
    return (
      <div className='aspect-video h-full w-full self-center bg-gray-200/20 animate-pulse rounded-sm'></div>
    );
  }
  if (game?.images?.masthead?.og || game?.images?.banner?.og) {
    return (
      <>
        <Image
          className='rounded-sm self-center h-full w-full object-cover bg-gray-200/20'
          src={
            'https://img.opencritic.com/' +
            (game?.images.masthead?.og || game?.images.banner?.og)
          }
          alt={game.name}
          width={700}
          height={700}
        />
        {topCriticScore && topCriticScore > 0 && <GameScore topCriticScore={topCriticScore} />}
      </>
    );
  } else if (topCriticScore && topCriticScore > 0) {
    return (
      <>
        <div className='h-full w-full bg-gray-200/20 rounded-sm'></div>
        <GameScore topCriticScore={topCriticScore} />
      </>
    );
  }
};

interface GameScoreProps {
  topCriticScore: number;
}

const GameScore = ({ topCriticScore }: GameScoreProps) => {
  return (
    <div className='flex absolute bottom-0 right-0 m-1 bg-white/70 dark:bg-black/70 p-1 rounded-md space-x-1 font-mono'>
      <Icons.star className='w-4' />
      <p>{topCriticScore.toPrecision(2)}%</p>
    </div>
  );
};
