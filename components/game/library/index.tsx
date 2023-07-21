'use client';

import { useUser } from '@/hooks/use-user';
import { observer } from '@legendapp/state/react';
import GamePreview from '../preview';
import { Status } from '@prisma/client';

export const UserLibrary = observer(() => {
  const user = useUser();

  return (
    <div className='flex flex-col gap-4'>
      <div className='w-32'>
        <select
          id='countries'
          className='cursor-pointer bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
          value={user.library_filter.get()}
          onChange={(e) => {
            user.library_filter.set(e.target.value as Status);
          }}
        >
          <option value='WISH_LIST'>Wishlisted</option>
          <option value='COMPLETED'>Complited</option>
          <option value='PLAYING'>Playing</option>
        </select>
      </div>
      <div className='flex justify-center md:justify-start'>
        <div className='flex flex-wrap gap-4 justify-center'>
          {user.games
            .get()
            .filter((game) => game.status == user.library_filter.get())
            ?.map((game) => (
              <GamePreview key={game.id} game={game.game} />
            ))}
        </div>
      </div>
    </div>
  );
});
