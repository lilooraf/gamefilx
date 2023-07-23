"use client"
import { useState } from "react"
import axios from "axios"
import { Status } from "@prisma/client"
import { observer } from "@legendapp/state/react"
import { toast } from "react-toastify"

import { GameDetail } from "@/types"
import { Icons } from "@/components/icons"
import {
  useAddGame,
  useRemoveGame,
  useUpdateGame,
  useUser,
} from "@/hooks/use-user"
import { Button, buttonVariants } from "@/components/ui/button"
import { UserGameDeleteRequest, UserGamePostRequest } from "@/types"
import { cn } from "@/lib/utils"

interface GameActionsProps {
  game: GameDetail
}

const GameActions = observer(({ game }: GameActionsProps) => {
  const user = useUser()
  const updateGame = useUpdateGame()
  const addGame = useAddGame()
  const removeGame = useRemoveGame()

  const [isLibraryActionLoading, setIsLibraryActionLoading] = useState(false)
  const [isRatingActionLoading, setIsRatingActionLoading] = useState(false)

  const isInUserLibrary = user.games.get()?.some((userGame) => {
    return userGame.id === game?.id
  })

  const userGameStatus: Status | undefined = user.games
    .get()
    ?.find((userGame) => {
      return userGame.id === game?.id
    })?.status

  const userGameRating: number | null | undefined = user.games
    .get()
    ?.find((userGame) => {
      return userGame.id === game?.id
    })?.rating

  const handleLibraryAction = async (status?: Status) => {
    setIsLibraryActionLoading(true)
    if (isInUserLibrary && !status) {
      await handdleRemoveGame()
    }
    if (isInUserLibrary && status) {
      await handdleUpdateGameStatus(status)
    }
    if (!isInUserLibrary) {
      await handdleAddGame(status)
    }
    setIsLibraryActionLoading(false)
  }

  const handdleRateGame = (rating: number) => {
    setIsRatingActionLoading(true)

    const payload: UserGamePostRequest = {
      game: {
        id: game.id,
        images: {
          banner: {
            og: game.images?.banner?.og,
            sm: game.images?.banner?.sm,
          },
          box: {
            og: game.images?.box?.og,
            sm: game.images?.box?.sm,
          },
        },
        name: game.name,
        topCriticScore: game.topCriticScore,
      },
      rating: rating,
    }

    axios.post("/api/user/game", payload).then(() => {
      updateGame({
        id: game.id,
        rating: rating,
      })
      setIsRatingActionLoading(false)
    }).catch(() => {
      toast.error("Something went wrong")
    })
  }

  const handdleUpdateGameStatus = async (status: Status) => {
    const payload: UserGamePostRequest = {
      game: {
        id: game.id,
        name: game.name,
        topCriticScore: game.topCriticScore,
        images: {
          banner: {
            og: game.images?.banner?.og,
            sm: game.images?.banner?.sm,
          },
          box: {
            og: game.images?.box?.og,
            sm: game.images?.box?.sm,
          },
        },
      },
      status: status,
    }

    await axios.post("/api/user/game", payload).then(() => {
      updateGame({
        id: game.id,
        status: status,
      })
    }).catch(() => {
      toast.error("Something went wrong")
    })
  }

  const handdleAddGame = async (status: Status = "WISH_LIST") => {
    const payload: UserGamePostRequest = {
      game: {
        id: game.id,
        name: game.name,
        topCriticScore: game.topCriticScore,
        images: {
          banner: {
            og: game.images?.banner?.og,
            sm: game.images?.banner?.sm,
          },
          box: {
            og: game.images?.box?.og,
            sm: game.images?.box?.sm,
          },
        },
      },
      status: status,
    }

    await axios.post("/api/user/game", payload).then(() => {
      addGame({
        id: game.id,
        status: status,
        rating: null,
        review: null,
        game: payload.game,
      })
      toast.success("Game added to library")
    }).catch(() => {
      toast.error("Something went wrong")
    })
  }

  const handdleRemoveGame = async () => {
    const payload: UserGameDeleteRequest = {
      gameId: game.id,
    }

    await axios
      .delete("/api/user/game", {
        data: payload,
      })
      .then(() => {
        removeGame({ id: game.id })
        toast.success("Game removed from library")
      })
      .catch(() => {
        toast.error("Something went wrong")
      })
  }

  return (
    <>
      <div
        className={cn(
          buttonVariants({ variant: "outline" }),
          "group/action relative"
        )}
      >
        <div className="absolute bottom-0 hidden w-32 flex-col gap-2 pb-12 group-hover/action:flex md:mr-3">
          {userGameStatus !== "WISH_LIST" && (
            <Button
              variant={"default"}
              className="justify-between gap-2 whitespace-nowrap"
              onClick={() => {
                handleLibraryAction("WISH_LIST")
              }}
            >
              Wishlist
              <Icons.bookmark />
            </Button>
          )}
          {userGameStatus !== "PLAYING" && (
            <Button
              variant={"default"}
              className="justify-between gap-2 whitespace-nowrap"
              onClick={() => {
                handleLibraryAction("PLAYING")
              }}
            >
              Playing
              <Icons.gamePad />
            </Button>
          )}
          {userGameStatus !== "COMPLETED" && (
            <Button
              variant={"default"}
              className="justify-between gap-2 whitespace-nowrap"
              onClick={() => {
                handleLibraryAction("COMPLETED")
              }}
            >
              Completed
              <Icons.rocket />
            </Button>
          )}
          {isInUserLibrary && (
            <Button
              variant={"destructive"}
              className="justify-between gap-2 whitespace-nowrap"
              onClick={() => {
                handleLibraryAction()
              }}
            >
              Remove
              <Icons.trash />
            </Button>
          )}
        </div>
        {isLibraryActionLoading ? (
          <Icons.spinner className="animate-spin" />
        ) : (
          <>
            {userGameStatus === "COMPLETED" && <Icons.rocket />}
            {userGameStatus === "PLAYING" && <Icons.gamePad />}
            {userGameStatus === "WISH_LIST" && <Icons.bookmark />}
            {!isInUserLibrary && <Icons.plus />}
          </>
        )}
      </div>
      {isInUserLibrary && (
        <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            "group/rating relative gap-1"
          )}
        >
          <div className="absolute bottom-0 hidden pb-12 group-hover/rating:flex md:mr-3">
            <div className="flex flex-row-reverse rounded-md bg-slate-200 p-1 drop-shadow-md dark:bg-slate-800">
              <Icons.star
                className="star-5 p-0"
                onClick={() => {
                  handdleRateGame(5)
                }}
              />
              <Icons.star
                className="star-4 p-0"
                onClick={() => {
                  handdleRateGame(4)
                }}
              />
              <Icons.star
                className="star-3 p-0"
                onClick={() => {
                  handdleRateGame(3)
                }}
              />
              <Icons.star
                className="star-2 p-0"
                onClick={() => {
                  handdleRateGame(2)
                }}
              />
              <Icons.star
                className="star-1 p-0"
                onClick={() => {
                  handdleRateGame(1)
                }}
              />
            </div>
          </div>
          {isRatingActionLoading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <>
              <Icons.star />
              {userGameRating && <p className="p-0">{userGameRating}</p>}
            </>
          )}
        </div>
      )}
    </>
  )
})

export default GameActions
