import { GameDetail} from '@/types';
import { Icons } from '@/components/icons';

interface GameActionsProps {
  game?: GameDetail;
}

const GameActions = ({ game }: GameActionsProps) => {
  return (
    <>
      <button className='flex items-center p-1 justify-center text-sm font-bold text-white bg-white/20 active:bg-white/50 transition-colors rounded-md'>
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
