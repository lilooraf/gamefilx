import { GameDetail } from '@/types';
import { Icons } from '@/components/icons';

interface GameTrailersProps {
  game?: GameDetail;
}

const GameTrailers = ({ game }: GameTrailersProps) => {
  if (game?.trailers[0]?.videoId) {
    return (
      <details className='group flex'>
        <summary className='flex cursor-pointer items-center justify-center text-center align-middle'>
          <Icons.chevronDown className='h-8 transition-transform duration-200 group-open:rotate-180' />
        </summary>
        <div className='group flex space-x-2 overflow-y-auto overflow-x-scroll scroll-smooth pb-2'>
          {game?.trailers.map((trailer) => (
            <div key={trailer.videoId} className='flex flex-col space-y-2'>
              <p className='line-clamp-2 text-sm font-bold'>
                {trailer.specialName}
              </p>
              <div className='flex flex-col space-y-2'>
                <div className='relative'>
                  <iframe
                    className='aspect-video w-64 self-center rounded-sm md:w-96'
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
