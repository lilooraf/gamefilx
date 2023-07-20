'use client';

import { GameInfo } from '@/types';
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { observer } from '@legendapp/state/react';

export const UserLibrary = observer(() => {
  const [games, setGames] = useState<GameInfo[]>([]);

  const user = useUser();

  useEffect(() => {
    fetch('/api/user/game').then((res) =>
      res.json().then((games: GameInfo[]) => {
        setGames(games);
      })
    );
  }, []);

  return (
    <>
      Comming soon
    </>
  );
});
