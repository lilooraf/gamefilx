import { GamePreviewSkeleton } from '@/components/game/preview/skeleton';

export const GameListSkeleton: React.FC<{
  delay: number;
}> = ({ delay }) => {
  return (
    <div className='flex overflow-hidden'>
      <ul className='flex gap-3 p-5'>
        {Array.from({ length: 10 }).map((_, i) => (
          <GamePreviewSkeleton key={i} delay={i * 150 + delay * 150} />
        ))}
      </ul>
    </div>
  );
};
