import { GameDetail } from '@/types';
import GameActions from '../actions';
import { GameDataSkeleton } from './skeleton';

interface GameDataProps {
  game?: GameDetail;
  isLoading: boolean;
}

export const GameData = ({ game, isLoading }: GameDataProps) => {
  if (isLoading || !game) return <GameDataSkeleton />;

  return (
    <div className='flex w-full flex-col justify-between space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0 xl:flex-col xl:space-x-0 xl:space-y-2'>
      <div className='min-w-fit  space-y-2'>
        <p className='line-clamp-2 text-sm font-bold '>
          By{' '}
          {game?.Companies.map((company) => (
            <span key={company.name}>
              {company.name} <br />
            </span>
          ))}
        </p>
        <div className='flex flex-col space-y-1'>
          <p className='text-xs font-bold'>Genre</p>
          <div className='flex flex-wrap gap-1 text-xs'>
            {game?.Genres.map((genre) => (
              <div
                key={genre.id}
                className='whitespace-nowrap rounded-md border border-slate-700 p-1 dark:border-slate-200'
              >
                {genre.name}
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col space-y-1'>
          <p className='flex flex-wrap gap-1 text-xs font-bold'>Platform</p>
          <div className='flex flex-wrap gap-1 text-xs'>
            {game?.Platforms.map((platform) => (
              <div
                key={platform.id}
                className='whitespace-nowrap rounded-md border border-slate-700 p-1 dark:border-slate-200'
              >
                {platform.shortName}
              </div>
            ))}
          </div>
        </div>
        <p className='line-clamp-2 text-xs font-bold'>
          Published:{' '}
          {new Date(game.firstReleaseDate).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className='flex justify-around lg:hidden'>
          <GameActions game={game} />
        </div>
      </div>

      <div className='max-h-24 overflow-hidden overflow-y-auto lg:max-h-44 xl:max-h-none'>
        <p className='text-sm'>{game?.description}</p>
      </div>

      <div className='hidden justify-around lg:flex lg:flex-col xl:flex-row'>
        <GameActions game={game} />
      </div>
    </div>
  );
};

export { GameDataSkeleton } from './skeleton';
