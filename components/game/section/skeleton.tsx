import { GameListSkeleton } from '../list';

interface GamesSectionSkeletonProps {
  id: number;
}

export function GamesSectionSekeleton({ id }: GamesSectionSkeletonProps) {
  return (
    <div className='flex flex-col p-2'>
      <div className='ml-6  h-4 w-64 animate-pulse rounded-md bg-slate-300 font-bold dark:bg-slate-600'></div>
      <GameListSkeleton delay={id} />
    </div>
  );
}
