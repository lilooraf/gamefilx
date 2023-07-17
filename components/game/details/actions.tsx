import { GameDetail} from '@/types';
import { Icons } from '@/components/icons';

interface GameActionsProps {
  game?: GameDetail;
}

const GameActions = ({ game }: GameActionsProps) => {
  return (
    <div className='flex h-10 w-full py-1 items-center justify-around'>
      <button className='flex items-center p-1 justify-center text-sm font-bold text-white bg-white/20 active:bg-white/50 transition-colors rounded-md'>
        <Icons.plus />
      </button>
      <button className='flex items-center p-1 justify-center text-sm font-bold text-white bg-white/20 active:bg-white/50 transition-colors rounded-md'>
        <Icons.app />
      </button>
      <button className='flex items-center p-1 justify-center text-sm font-bold text-white bg-white/20 active:bg-white/50 transition-colors rounded-md'>
        <Icons.app />
      </button>
    </div>
  );
};

export default GameActions;
