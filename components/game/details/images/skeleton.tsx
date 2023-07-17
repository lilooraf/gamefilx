export const GameImagesSkeleton = () => {
  return (
    <div className="flex overflow-hidden">
      <ul className='flex space-x-2'>
        {Array.from({ length: 3 }).map((value, index) => (
          <li
            key={index}
            className='rounded-sm self-center w-64 md:w-96 overflow-hidden aspect-video bg-gray-200/20 animate-pulse'
          ></li>
        ))}
      </ul>
    </div>
  );
};
