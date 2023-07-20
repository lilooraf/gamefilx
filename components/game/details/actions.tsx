'use client';
import { GameDetail } from '@/types';
import { Icons } from '@/components/icons';
import { Status } from '@prisma/client';
import { useUser } from '@/hooks/use-user';
import { observer } from '@legendapp/state/react';
import { observable } from '@legendapp/state';
import { Button } from '@/components/ui/button';
interface GameActionsProps {
  game?: GameDetail;
}

const GameActions = observer(({ game }: GameActionsProps) => {
  const user = useUser();

  const isInUserLibrary = user.games.get()?.some((userGame) => {
    return userGame.id.get() === game?.id;
  });

  const handdleAddRemove = (status?: Status) => {
    if (isInUserLibrary) {
      handdleRemoveFromUserLibrary();
    } else {
      handdleAddToUserLibrary(status);
    }
  };

  const handdleAddToUserLibrary = (status: Status = 'WISH_LIST') => {
    if (game) {
      fetch('/api/user/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game: game,
          status: status,
        }),
      }).then(() => {
        user.games.set([
          ...user.games.get(),
          {
            id: observable(game.id),
            rating: observable(null),
            review: observable(null),
            status: observable(status),
          },
        ]);
      });
    }
  };

  const handdleRemoveFromUserLibrary = () => {
    if (game) {
      fetch('/api/user/game', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: game.id,
        }),
      }).then(() => {
        user.games.set(
          user.games.get()?.filter((userGame) => {
            return userGame.id.get() !== game?.id;
          })
        );
      });
    }
  };

  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => handdleAddRemove()}
        className=''
      >
        {isInUserLibrary ? (
          <Icons.check />
        ) : (
          <Icons.plus />
        )}
      </Button>
      <Button variant={'outline'} className=''>
        <Icons.app />
      </Button>
      <Button variant={'outline'} className=''>
        <Icons.app />
      </Button>
    </>
  );
});

export default GameActions;
