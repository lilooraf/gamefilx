import { GameDetail, Trailer } from '@/types';
import { Icons } from '@/components/icons';

interface GameTrailersProps {
  game?: GameDetail;
}

const GameTrailers = ({ game }: GameTrailersProps) => {
  if (game?.trailers) {
    return (
      <details className='group flex'>
        <summary className='flex flex-col justify-center items-center align-middle text-center cursor-pointer'>
          <p className='font-bold'>Trailers</p>
          <Icons.chevronDown className='w-4 group-open:rotate-180 transition-transform duration-200' />
        </summary>
        <div className='flex space-x-2 group overflow-x-scroll scroll-smooth'>
          {game?.trailers.map((trailer: Trailer) => (
            <div key={trailer.videoId} className='flex flex-col space-y-2'>
              <p className='text-sm font-bold line-clamp-2'>
                {trailer.specialName}
              </p>
              <div className='flex flex-col space-y-2'>
                <div className='relative'>
                  <iframe
                    className='rounded-sm w-64 md:w-96 aspect-video self-center'
                    src={`https://www.youtube.com/embed/${trailer.videoId}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </details>
    );
  }
};

export default GameTrailers;
