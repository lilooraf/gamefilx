'use client';
import { useEffect, useState } from 'react';
import { GameInfo } from '@/types';
import { GameData } from './data';
import GameTrailers from './trailers';
import { GameImages } from './images';
import { GameImageBanner } from './image';
import axios from 'axios';
import { GameResultSchema } from '@/lib/validations/game';
import { GameDetail } from '@/types';

interface GameDetailsProps {
  game: GameInfo;
}

const GameDetails = ({ game }: GameDetailsProps) => {
  const [gameData, setGameData] = useState<GameDetail | undefined>(undefined);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getGame(game.id).catch(() => {
      setError(true);
      setLoading(false);
    });
  }, [game]);

  const getGame = async (id: number) => {
    setLoading(true);
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_APP_URL}/api/game/${id}`)
      .then((res) => res.data);

    const game = GameResultSchema.parse(data);
    setGameData(game);
    setLoading(false);
  };

  if (isError) {
    return <p className='p-2 text-xl font-medium'>Something went wrong</p>;
  }

  return (
    <div className='flex w-64 flex-col gap-2 space-y-2 sm:w-80 md:w-96 lg:w-[50rem] xl:w-[70rem]'>
      <div className='max-w-[32rem]'>
        <p className='mb-2 line-clamp-2 text-xl font-medium'>{game.name}</p>
      </div>
      <div className='flex flex-col gap-4 lg:h-full xl:h-[28rem] xl:flex-row'>
        <div className='flex flex-col'>
          <div className='relative flex aspect-video h-full w-64 items-center justify-center sm:w-80 md:w-[24rem] lg:w-[50rem]'>
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
