'use client';
import { useState } from 'react';
import { useColor } from 'color-thief-react';
import { GameInfo, ImageType } from '@/types';
import { Icons } from '@/components/icons';
import { Modal } from '@/components/modal';
import GameDetails from '@/components/game/details';
import { GamePreviewSkeleton } from './skeleton';
import { GamePreviewImage } from './image';

interface GameProps {
  game: GameInfo;
}
const GamePreview = ({ game }: GameProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading, error } = useColor(
    'https://img.opencritic.com/' +
      (game.images?.box?.og || game.images?.banner?.og),
    'rgbArray',
    {
      crossOrigin: 'img.opencritic.com',
    }
  )

  if (loading) {
    return <GamePreviewSkeleton delay={0} />;
  }

  let imageType: ImageType = 'box';

  if (game.images) {
    imageType = game.images.box ? 'box' : 'banner';
  }

  return (
    <>
      <li
        onClick={() => setIsOpen(true)}
        style={{
          backgroundColor: `rgba(${data}, 0.4)`,
        }}
        className='flex relative w-72 h-40 rounded-md p-2 cursor-pointer hover:scale-105 hover:z-10 dark:bg-gray-950 bg-white transition duration-150 ease-in-out snap-center'
      >
        <div
          className={`flex gap-2 ${
            imageType == 'banner' ? 'flex-col' : 'flex-row'
          }`}
        >
          <GamePreviewImage game={game} />
          <div className='max-w-44 max-h-32 pt-1 '>
            <h4
              className={`text-md font-medium ${
                imageType == 'banner' ? 'line-clamp-1' : 'line-clamp-4'
              }`}
            >
              {game.name}
            </h4>
          </div>
          {game.topCriticScore && game.topCriticScore > 0 && (
            <div className='flex absolute bottom-0 right-0 m-2 gap-1 font-mono'>
              <Icons.star className='w-4' />
              {game.topCriticScore && game.topCriticScore.toPrecision(2)}%
            </div>
          )}
        </div>
      </li>
      <Modal isOpen={isOpen} customColor={data} onClose={() => setIsOpen(false)}>
        <GameDetails game={game} />
      </Modal>
    </>
  );
};

export default GamePreview;

export { GamePreviewSkeleton } from './skeleton';
