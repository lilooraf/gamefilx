"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

import { GameInfo, GameDetail } from "@/types"
import { GameData } from "@/components/game/details/data"
import GameTrailers from "@/components/game/details/trailers"
import { GameImages } from "@/components/game/details/images"
import { GameImageBanner } from "@/components/game/details/image"
import { GameResultSchema } from "@/lib/validations/game"

interface GameDetailsProps {
  game: GameInfo
}

const GameDetails = ({ game }: GameDetailsProps) => {
  const [gameData, setGameData] = useState<GameDetail | undefined>(undefined)
  const [isError, setError] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getGame(game.id).then((game) => {
      setGameData(game)
      setLoading(false)
    }).catch(() => {
      setError(true)
      setLoading(false)
      toast.error("Something went wrong")
    })
  }, [game])

  const getGame = async (id: number) => {
    const data = await axios
      .get(`${process.env.NEXT_PUBLIC_APP_URL}/api/game/${id}`)
      .then((res) => res.data)

    return GameResultSchema.parse(data)
  }

  if (isError) {
    return <p className="p-2 text-xl font-medium">Oops this game is not available now</p>
  }

  return (
    <div className="flex w-64 flex-col gap-2 space-y-2 sm:w-80 md:w-96 lg:w-[50rem] xl:w-[70rem]">
      <div className="max-w-[32rem]">
        <p className="mb-2 line-clamp-2 text-xl font-medium">{game.name}</p>
      </div>
      <div className="flex flex-col gap-4 lg:h-full xl:h-[28rem] xl:flex-row">
        <div className="flex flex-col">
          <div className="relative flex aspect-video h-full w-64 items-center justify-center sm:w-80 md:w-[24rem] lg:w-[50rem]">
            <GameImageBanner
              game={gameData}
              isLoading={isLoading}
              topCriticScore={game.topCriticScore}
            />
          </div>
        </div>
        <GameData game={gameData} isLoading={isLoading} />
      </div>
      <div className="flex flex-col space-y-1">
        <GameImages game={gameData} isLoading={isLoading} />
        <GameTrailers game={gameData} />
      </div>
    </div>
  )
}

export default GameDetails
