export const GamePreviewSkeleton: React.FC<{
    delay: number;
  }> = ({ delay }) => {
    return (
      <li
        className='flex w-72 h-40 dark:bg-gray-900 rounded-md p-2 animate-pulse'
        style={{
          animationDelay: `${delay}ms`,
        }}
      >
        <div className='h-32 w-20 bg-slate-600 self-center rounded-md'></div>
        <div className='p-2 space-y-2'>
          <div className='h-4 bg-slate-600 rounded-md w-40'></div>
          <div className='h-4 bg-slate-600 rounded-md w-20'></div>
          <div className='h-4 bg-slate-600 rounded-md w-10'></div>
        </div>
      </li>
    );
  };
  