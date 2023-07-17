'use client';

import { useEffect, useState } from 'react';
import { GameListSkeleton, GameList } from './list';
import { GameInfo, GameListType } from '@/types';

interface GamesProps {
  gameList: GameListType;
  id: number;
}

const getGameList = async (gameList: GameListType) => {
  const type = gameList.RequestType;
  const param = type === 'platforms' ? gameList.platforms : undefined;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/game/${type}${
      param ? `?${type}=${param}` : ''
    }`
  );
  const data = await res.json();
  return data;
};

export function GamesSection({ gameList, id }: GamesProps) {
  const [data, setData] = useState<GameInfo[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getGameList(gameList).then((res) => {
      setData(res);
      setLoading(false);
    })
  }, []);

  if (isLoading) {
    return (
      <div className='flex flex-col p-2'>
        <h4 className='pl-6 font-mono text-lg font-bold'>{gameList.title}</h4>
        <GameListSkeleton delay={id} />
      </div>
    );
  }

  if (!data) {
    return <div>No book found 🥲</div>;
  }

  return (
    <div className='flex flex-col p-2'>
      <h4 className='pl-6 font-mono text-lg font-bold'>{gameList.title}</h4>
      <div className='relative'>
        <GameList games={data} id={id} />
      </div>
    </div>
  );
}
