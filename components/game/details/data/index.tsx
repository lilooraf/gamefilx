import { GameDetail } from '@/types';
import GameActions from '../actions';
import { GameDataSkeleton } from './skeleton';

interface GameDataProps {
  game?: GameDetail;
  isLoading: boolean;
}

export const GameData = ({ game, isLoading }: GameDataProps) => {

  if (isLoading || !game) return <GameDataSkeleton />

  return (
    <div className='flex flex-col w-full justify-between lg:flex-row xl:flex-col space-y-2 lg:space-x-2 lg:space-y-0 xl:space-x-0 xl:space-y-2'>
      <div className='space-y-2 font-mono min-w-fit'>
        <p className='text-sm font-bold line-clamp-2 '>
          By {game?.Companies.map((company) => (
            <span key={company.name} >
              {company.name} <br />
            </span>
          ))}
        </p>
        <div className='flex flex-col space-y-1'>
          <p className='text-xs font-bold'>Genre</p>
          <div className='flex flex-wrap text-xs gap-1'>
            {game?.Genres.map((genre) => (
              <div
                key={genre.id}
                className='p-1 border rounded-md whitespace-nowrap'
              >
                {genre.name}
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col space-y-1'>
          <p className='flex flex-wrap gap-1 text-xs font-bold'>Platform</p>
          <div className='flex flex-wrap text-xs gap-1'>
            {game?.Platforms.map((platform) => (
              <div
                key={platform.id}
                className='p-1 border rounded-md whitespace-nowrap'
              >
                {platform.shortName}
              </div>
            ))}
          </div>
        </div>
        <p className='text-xs font-bold line-clamp-2'>
          Published:{' '}
          {new Date(game.firstReleaseDate).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className='hidden sm:block lg:hidden'>
          <GameActions game={game} />
        </div>
      </div>

      <div className='overflow-y-auto overflow-hidden max-h-24 lg:max-h-44 xl:max-h-none'>
        <p className='text-sm'>{game?.description}</p>
      </div>

      <div className='sm:hidden lg:block'>
        <GameActions game={game} />
      </div>
    </div>
  );
};

export { GameDataSkeleton } from './skeleton';
