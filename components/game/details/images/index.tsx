import Image from "next/image"

import { GameDetail } from "@/types"
import { GameImagesSkeleton } from "./skeleton"

interface GameImagesProps {
  game?: GameDetail
  isLoading: boolean
}

export const GameImages = ({ game, isLoading }: GameImagesProps) => {
  if (isLoading) {
    return <GameImagesSkeleton />
  }
  return (
    <div className="group flex snap-x snap-mandatory space-x-2 overflow-x-scroll scroll-smooth">
      {game?.images?.screenshots?.map((screenshot) => (
        <Image
          key={screenshot.og}
          alt="screenshot"
          className="aspect-video w-64 snap-center self-center rounded-sm bg-gray-200/20 md:w-96"
          src={`https://img.opencritic.com/${screenshot.og}`}
          width={800}
          height={800}
        />
      ))}
    </div>
  )
}

export { GameImagesSkeleton } from "./skeleton"
