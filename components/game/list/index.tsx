'use client';

import GamePreview from '@/components/game/preview';
import { Icons } from '@/components/icons';
import { GameInfo } from '@/types';

interface GameListProps {
  games: GameInfo[];
  id: number;
}

export const GameList = ({ games, id }: GameListProps) => {
  const slideLeft = () => {
    const slider = document.getElementById('slider' + id);
    if (slider) {
      slider.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    const slider = document.getElementById('slider' + id);
    if (slider) {
      slider.scrollLeft += 500;
    }
  };

  return (
    <div
      id={'slider' + id}
      className='flex items-center group overflow-x-scroll scroll-smooth scrollbar-hidden'
    >
      <div
        onClick={slideLeft}
        className='cursor-pointer absolute left-0 z-30 bg-gradient-to-l from-transparent dark:to-black dark:via-black/70 to-white via-white/70 group-hover:opacity-100 opacity-0 p-2 h-full items-center transition-opacity duration-300'
      >
        <Icons.chevronLeft className='h-full w-10 hover:scale-125 transition-transform ' />
      </div>
      <ul className='flex gap-3 p-5'>
        {games?.map((game: GameInfo) => (
          <GamePreview key={game.id} game={game} />
        ))}
      </ul>
      <div
        onClick={slideRight}
        className='cursor-pointer absolute right-0 z-30 bg-gradient-to-r from-transparent dark:to-black dark:via-black/70 to-white via-white/70 group-hover:opacity-100 opacity-0 p-2 h-full items-center transition-opacity duration-300'
      >
        <Icons.chevronRight className='h-full w-10 hover:scale-125 transition-transform ' />
      </div>
    </div>
  );
};

export { GameListSkeleton } from './skeleton';
