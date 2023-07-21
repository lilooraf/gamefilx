'use client';
import axios from 'axios';
import { GameDetail } from '@/types';
import { Icons } from '@/components/icons';
import { Status } from '@prisma/client';
import { useUser } from '@/hooks/use-user';
import { observer } from '@legendapp/state/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  UserGameDeleteRequest,
  UserGamePostRequest,
} from '@/types';
interface GameActionsProps {
  game: GameDetail;
}

const GameActions = observer(({ game }: GameActionsProps) => {
  const user = useUser();

  const [isLibraryActionLoading, setIsLibraryActionLoading] = useState(false);
  const [isRatingActionLoading, setIsRatingActionLoading] = useState(false);

  const isInUserLibrary = user.games.get()?.some((userGame) => {
    return userGame.id === game?.id;
  });

  const userGameStatus: Status | undefined = user.games
    .get()
    ?.find((userGame) => {
      return userGame.id === game?.id;
    })?.status;

  const userGameRating: number | null | undefined = user.games
    .get()
    ?.find((userGame) => {
      return userGame.id === game?.id;
    })?.rating;

  const handleLibraryAction = async (status?: Status) => {
    setIsLibraryActionLoading(true);
    if (isInUserLibrary && !status) {
      await handdleRemoveFromUserLibrary();
    }
    if (isInUserLibrary && status) {
      await handdleUpdateUserLibrary(status);
    }
    if (!isInUserLibrary) {
      await handdleAddToUserLibrary(status);
    }
    setIsLibraryActionLoading(false);
  };

  const handdleRateGame = (rating: number) => {
    setIsRatingActionLoading(true);

    const payload: UserGamePostRequest = {
      game: {
        id: game.id,
        images: {
          banner: {
            og: game.images?.banner?.og,
            sm: game.images?.banner?.sm
          },
          box: {
            og: game.images?.box?.og,
            sm: game.images?.box?.sm
          }
        },
        name: game.name,
        topCriticScore: game.topCriticScore
      },
      rating: rating,
    };

    axios
      .post('/api/user/game', payload)
      .then(() => {
        user.games.set(
          user.games.get()?.map((userGame) => {
            if (userGame.id === game.id) {
              return {
                ...userGame,
                rating: rating,
              };
            }
            return userGame;
          })
        );
        setIsRatingActionLoading(false);
      });
  };

  const handdleUpdateUserLibrary = async (status: Status) => {
    const payload: UserGamePostRequest = {
      game: {
        id: game.id,
        name: game.name,
        topCriticScore: game.topCriticScore,
        images: {
          banner: {
            og: game.images?.banner?.og,
            sm: game.images?.banner?.sm
          },
          box: {
            og: game.images?.box?.og,
            sm: game.images?.box?.sm
          }
        }
      },
      status: status,
    };

    await axios
      .post('/api/user/game', payload)
      .then(() => {
        user.games.set(
          user.games.get()?.map((userGame) => {
            if (userGame.id === game.id) {
              return {
                ...userGame,
                status: status,
              };
            }
            return userGame;
          })
        );
      });
  };

  const handdleAddToUserLibrary = async (status: Status = 'WISH_LIST') => {
    const payload: UserGamePostRequest = {
      game: {
        id: game.id,
        name: game.name,
        topCriticScore: game.topCriticScore,
        images: {
          banner: {
            og: game.images?.banner?.og,
            sm: game.images?.banner?.sm
          },
          box: {
            og: game.images?.box?.og,
            sm: game.images?.box?.sm
          }
        }
      },
      status: status,
    };

    await axios.post('/api/user/game', payload)
      .then(() => {
        user.games.set([
          ...user.games.get(),
          {
            id: game.id,
            rating: null,
            review: null,
            status: status,
            game: {
              id: game.id,
              name: game.name,
              topCriticScore: game.topCriticScore,
              images: {
                banner: {
                  og: game.images?.banner?.og,
                  sm: game.images?.banner?.sm
                },
                box: {
                  og: game.images?.box?.og,
                  sm: game.images?.box?.sm
                }
              }
            },
          },
        ]);
      });
  };

  const handdleRemoveFromUserLibrary = async () => {
    const payload: UserGameDeleteRequest = {
      gameId: game.id,
    };

    await axios
      .delete('/api/user/game', {
        data: payload
      })
      .then(() => {
        user.games.set(
          user.games.get()?.filter((userGame) => {
            return userGame.id !== game?.id;
          })
        );
      });
  };

  return (
    <>
      <Button variant={'outline'} className='group/action relative'>
        <div className='absolute bottom-0 md:mr-3 pb-12 hidden group-hover/action:flex flex-col gap-2 w-32'>
          {userGameStatus !== 'WISH_LIST' && (
            <Button
              variant={'default'}
              className='justify-between whitespace-nowrap gap-2'
              onClick={() => {
                handleLibraryAction('WISH_LIST');
              }}
            >
              Wishlist
              <Icons.bookmark />
            </Button>
          )}
          {userGameStatus !== 'PLAYING' && (
            <Button
              variant={'default'}
              className='justify-between whitespace-nowrap gap-2'
              onClick={() => {
                handleLibraryAction('PLAYING');
              }}
            >
              Playing
              <Icons.gamePad />
            </Button>
          )}
          {userGameStatus !== 'COMPLETED' && (
            <Button
              variant={'default'}
              className='justify-between whitespace-nowrap gap-2'
              onClick={() => {
                handleLibraryAction('COMPLETED');
              }}
            >
              Completed
              <Icons.rocket />
            </Button>
          )}
          {isInUserLibrary && (
            <Button
              variant={'destructive'}
              className='justify-between whitespace-nowrap gap-2'
              onClick={() => {
                handleLibraryAction();
              }}
            >
              Remove
              <Icons.trash />
            </Button>
          )}
        </div>
        {isLibraryActionLoading ? (
          <Icons.spinner className='animate-spin' />
        ) : (
          <>
            {userGameStatus === 'COMPLETED' && <Icons.rocket />}
            {userGameStatus === 'PLAYING' && <Icons.gamePad />}
            {userGameStatus === 'WISH_LIST' && <Icons.bookmark />}
            {!isInUserLibrary && <Icons.plus />}
          </>
        )}
      </Button>
      {isInUserLibrary && (
        <Button variant={'outline'} className='group/rating relative gap-1'>
          <div className='absolute bottom-0 md:mr-3 pb-12 hidden group-hover/rating:flex'>
            <div className='flex flex-row-reverse rounded-md p-1 bg-slate-200 dark:bg-slate-800 drop-shadow-md'>
              <Icons.star
                className='star-5 p-0'
                onClick={() => {
                  handdleRateGame(5);
                }}
              />
              <Icons.star
                className='star-4 p-0'
                onClick={() => {
                  handdleRateGame(4);
                }}
              />
              <Icons.star
                className='star-3 p-0'
                onClick={() => {
                  handdleRateGame(3);
                }}
              />
              <Icons.star
                className='star-2 p-0'
                onClick={() => {
                  handdleRateGame(2);
                }}
              />
              <Icons.star
                className='star-1 p-0'
                onClick={() => {
                  handdleRateGame(1);
                }}
              />
            </div>
          </div>
          {isRatingActionLoading ? (
            <Icons.spinner className='animate-spin' />
          ) : (
            <>
              <Icons.star />
              {userGameRating && <p className='p-0'>{userGameRating}</p>}
            </>
          )}
        </Button>
      )}
    </>
  );
});

export default GameActions;
