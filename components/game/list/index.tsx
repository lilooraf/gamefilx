"use client"

import { Games } from "@/types"
import GamePreview from "@/components/game/preview"
import { Icons } from "@/components/icons"

interface GameListProps {
  games: Games
  id: number
}

export const GameList = ({ games, id }: GameListProps) => {
  const slideLeft = () => {
    const slider = document.getElementById("slider" + id)
    if (slider) {
      slider.scrollLeft -= 200
    }
  }

  const slideRight = () => {
    const slider = document.getElementById("slider" + id)
    if (slider) {
      slider.scrollLeft += 200
    }
  }

  return (
    <div
      id={"slider" + id}
      className="scrollbar-hidden group flex snap-x snap-mandatory items-center overflow-x-scroll scroll-smooth"
    >
      <div
        onClick={slideLeft}
        className="absolute left-0 z-30 h-full cursor-pointer items-center bg-gradient-to-l from-transparent via-white/70 to-white p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-black/70 dark:to-black"
      >
        <Icons.chevronLeft className="h-full w-10 transition-transform hover:scale-125 " />
      </div>
      <ul className="flex gap-3 p-5">
        {games?.map((game) => <GamePreview key={game.id} game={game} />)}
      </ul>
      <div
        onClick={slideRight}
        className="absolute right-0 z-30 h-full cursor-pointer items-center bg-gradient-to-r from-transparent via-white/70 to-white p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-black/70 dark:to-black"
      >
        <Icons.chevronRight className="h-full w-10 transition-transform hover:scale-125 " />
      </div>
    </div>
  )
}

export { GameListSkeleton } from "./skeleton"
