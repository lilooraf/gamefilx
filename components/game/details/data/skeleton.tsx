export const GameDataSkeleton = () => {
  return (
    <div className="flex w-full flex-col justify-around space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0 xl:flex-col xl:space-x-0 xl:space-y-2">
      <div className='animate-pulse space-y-2'>
        <div className='h-4 w-44 rounded-md bg-gray-200/20'></div>
        <div className='h-4 w-24 rounded-md bg-gray-200/20'></div>
        <div className='h-4 w-32 rounded-md bg-gray-200/20'></div>
        <div className='h-4 w-40 rounded-md bg-gray-200/20'></div>
      </div>

      <div className='h-full max-h-24 w-full animate-pulse space-y-2 lg:max-h-44 xl:max-h-none'>
        <div className='h-4 w-full rounded-md bg-gray-200/20'></div>
        <div className='h-4 w-full rounded-md bg-gray-200/20'></div>
        <div className='h-4 w-full rounded-md bg-gray-200/20'></div>
        <div className='h-4 w-full rounded-md bg-gray-200/20'></div>
        <div className='h-4 w-full rounded-md bg-gray-200/20'></div>
        <div className='h-4 w-full rounded-md bg-gray-200/20'></div>
        <div className='h-4 w-full rounded-md bg-gray-200/20'></div>
        <div className='h-4 w-full rounded-md bg-gray-200/20'></div>
      </div>
    </div>
  );
};
