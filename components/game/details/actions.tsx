import { GameDetail} from '@/types';
import { Icons } from '@/components/icons';
import { Status } from '@prisma/client';

interface GameActionsProps {
  game?: GameDetail;
}

const GameActions = ({ game }: GameActionsProps) => {

  const handdleAddToMyList = (status?: Status) => {
    fetch("/api/game/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        game: game,
        status: status,
      }),
    })
  };

  return (
    <>
      <button onClick={() => {handdleAddToMyList()}} className='flex items-center p-1 justify-center text-sm font-bold text-white bg-white/20 active:bg-white/50 transition-colors rounded-md'>
        <Icons.plus />
      </button>
      <button className='flex items-center p-1 justify-center text-sm font-bold text-white bg-white/20 active:bg-white/50 transition-colors rounded-md'>
        <Icons.app />
      </button>
      <button className='flex items-center p-1 justify-center text-sm font-bold text-white bg-white/20 active:bg-white/50 transition-colors rounded-md'>
        <Icons.app />
      </button>
    </>
  );
};

export default GameActions;
