export const GameImagesSkeleton = () => {
  return (
    <div className="flex overflow-hidden">
      <ul className='flex space-x-2'>
        {Array.from({ length: 3 }).map((value, index) => (
          <li
            key={index}
            className='aspect-video w-64 animate-pulse self-center overflow-hidden rounded-sm bg-gray-200/20 md:w-96'
          ></li>
        ))}
      </ul>
    </div>
  );
};
