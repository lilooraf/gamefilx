import { GameListSkeleton } from '../list';

interface GamesSectionSkeletonProps {
  id: number;
}

export function GamesSectionSekeleton({ id }: GamesSectionSkeletonProps) {
  return (
    <div className='flex flex-col p-2'>
      <div className='ml-6  w-64 h-4 dark:bg-slate-600 bg-slate-300 rounded-md animate-pulse font-bold'></div>
      <GameListSkeleton delay={id} />
    </div>
  );
}
