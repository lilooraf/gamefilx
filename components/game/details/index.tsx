import { useEffect, useState } from 'react';
import { GameInfo, GameDetail } from '@/types';
import { GameData } from './data';
import GameTrailers from './trailers';
import { GameImages } from './images';
import { GameImageBanner } from './image';

interface GameDetailsProps {
  game: GameInfo;
}

const GameDetails = ({ game }: GameDetailsProps) => {
  const [gameData, setGameData] = useState<GameDetail | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/game/${game.id}`).then(
      (res) =>
        res.json().then((res) => {
          setGameData(res);
          setLoading(false);
        })
    );
  }, []);

  return (
    <div className='flex flex-col space-y-2 gap-2 font-mono w-64 sm:w-80 md:w-96 lg:w-[50rem] xl:w-[70rem]'>
      <div className='max-w-[32rem]'>
        <p className='mb-2 font-medium text-xl line-clamp-2'>{game.name}</p>
      </div>
      <div className='flex gap-4 flex-col xl:flex-row lg:h-full xl:h-[28rem]'>
        <div className='flex flex-col'>
          <div className='relative aspect-video h-full flex justify-center items-center w-64 sm:w-80 md:w-[24rem] lg:w-[50rem]'>
            <GameImageBanner
              game={gameData}
              isLoading={isLoading}
              topCriticScore={game.topCriticScore}
            />
          </div>
        </div>
        <GameData game={gameData} isLoading={isLoading} />
      </div>
      <div className='flex flex-col space-y-1'>
        <GameImages game={gameData} isLoading={isLoading} />
        <GameTrailers game={gameData} />
      </div>
    </div>
  );
};

export default GameDetails;
