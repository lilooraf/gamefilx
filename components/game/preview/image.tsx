import Image from 'next/image';
import { GameInfo, ImageType } from '@/types';

interface GameProps {
  game: GameInfo;
}
export const GamePreviewImage = ({ game }: GameProps) => {
  if (game.images.box?.og || game.images.banner?.og) {
    const type: ImageType = game.images.box ? 'box' : 'banner';

    return (
      <Image
        className={`rounded-sm h-32 ${
          type == 'banner' ? 'order-2 w-52' : 'w-20'
        } self-center`}
        src={
          'https://img.opencritic.com/' +
          (game.images.box?.og || game.images.banner?.og)
        }
        alt={game.name}
        width={200}
        height={200}
      />
    );
  } else {
    return (
      <div className='h-32 w-20 self-center bg-gray-200/20 rounded-sm'></div>
    );
  }
};
