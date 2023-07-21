'use client';

import { useEffect, useState } from 'react';
import { GameListSkeleton, GameList } from '../list';
import { GameListType, Games } from '@/types';
import axios from 'axios';
import { GamesResultSchema } from '@/lib/validations/games';

interface GamesProps {
  gameList: GameListType;
  id: number;
}

const getGameList = async (gameList: GameListType) => {
  const type = gameList.RequestType;
  const param = type === 'platforms' ? gameList.platforms : undefined;
  const data = await axios
    .get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/game/${type}${
        param ? `?${type}=${param}` : ''
      }`
    )
    .then((res) => res.data);

  const games = GamesResultSchema.parse(data);

  return games;
};

export function GamesSection({ gameList, id }: GamesProps) {
  const [games, setGames] = useState<Games | undefined>(undefined);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getGameList(gameList)
      .then((res) => {
        setGames(res);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [gameList]);

  if (isLoading) {
    return (
      <div className='flex flex-col p-2'>
        <h4 className='pl-6  text-lg font-bold'>{gameList.title}</h4>
        <GameListSkeleton delay={id} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex flex-col p-2'>
        <h4 className='pl-6 text-lg font-bold'>{gameList.title}</h4>
        <p className='pl-6 p-2 font-medium text-md'>Something went wrong</p>
      </div>
    );
  }

  if (games) {
    return (
      <div className='flex flex-col p-2'>
        <h4 className='pl-6  text-lg font-bold'>{gameList.title}</h4>
        <div className='relative'>
          <GameList games={games} id={id} />
        </div>
      </div>
    );
  }
}

export { GamesSectionSekeleton } from './skeleton';
