import { GamePreviewSkeleton } from '@/components/game/preview/skeleton';

export default function MyLibraryLoadingPage() {
  return (
    <div className='px-4'>
      <div className='flex flex-col gap-4'>
        <div className='w-32 h-8 animate-pulse dark:bg-slate-600 bg-slate-300 rounded-md'></div>
        <div className='flex justify-center md:justify-start'>
          <div className='flex flex-wrap gap-4 justify-center'>
            {Array.from(Array(5).keys()).map((index) => (
              <GamePreviewSkeleton key={index} delay={index * 100} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
