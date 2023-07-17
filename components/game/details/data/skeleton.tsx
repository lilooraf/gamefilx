export const GameDataSkeleton = () => {
  return (
    <div className="flex flex-col w-full justify-around lg:flex-row xl:flex-col space-y-2 lg:space-x-2 lg:space-y-0 xl:space-x-0 xl:space-y-2">
      <div className='space-y-2 animate-pulse'>
        <div className='w-44 h-4 bg-gray-200/20 rounded-md'></div>
        <div className='w-24 h-4 bg-gray-200/20 rounded-md'></div>
        <div className='w-32 h-4 bg-gray-200/20 rounded-md'></div>
        <div className='w-40 h-4 bg-gray-200/20 rounded-md'></div>
      </div>

      <div className='space-y-2 animate-pulse h-full w-full max-h-24 lg:max-h-44 xl:max-h-none'>
        <div className='w-full h-4 bg-gray-200/20 rounded-md'></div>
        <div className='w-full h-4 bg-gray-200/20 rounded-md'></div>
        <div className='w-full h-4 bg-gray-200/20 rounded-md'></div>
        <div className='w-full h-4 bg-gray-200/20 rounded-md'></div>
        <div className='w-full h-4 bg-gray-200/20 rounded-md'></div>
        <div className='w-full h-4 bg-gray-200/20 rounded-md'></div>
        <div className='w-full h-4 bg-gray-200/20 rounded-md'></div>
        <div className='w-full h-4 bg-gray-200/20 rounded-md'></div>
      </div>
    </div>
  );
};
