"use client"
import { useState } from "react"
import { useColor } from "color-thief-react"

import { GameInfo, ImageType } from "@/types"
import { Icons } from "@/components/icons"
import { Modal } from "@/components/modal"
import GameDetails from "@/components/game/details"
import { GamePreviewSkeleton } from "@/components/game/preview/skeleton"
import { GamePreviewImage } from "@/components/game/preview/image"

interface GameProps {
  game: GameInfo
}
const GamePreview = ({ game }: GameProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data, loading, error } = useColor(
    "https://img.opencritic.com/" +
      (game.images?.box?.og || game.images?.banner?.og),
    "rgbArray",
    {
      crossOrigin: "img.opencritic.com",
    }
  )

  if (loading) {
    return <GamePreviewSkeleton delay={0} />
  }

  let imageType: ImageType = "box"

  if (game.images) {
    imageType = game.images.box ? "box" : "banner"
  }

  return (
    <>
      <li
        onClick={() => setIsOpen(true)}
        style={{
          backgroundColor: `rgba(${data}, 0.4)`,
        }}
        className="relative flex h-40 w-72 cursor-pointer snap-center rounded-md bg-white p-2 transition duration-150 ease-in-out hover:z-10 hover:scale-105 dark:bg-gray-950 lg:snap-proximity lg:snap-align-none"
      >
        <div
          className={`flex gap-2 ${
            imageType == "banner" ? "flex-col" : "flex-row"
          }`}
        >
          <GamePreviewImage game={game} />
          <div className="max-w-44 max-h-32 pt-1 ">
            <h4
              className={`text-md font-medium ${
                imageType == "banner" ? "line-clamp-1" : "line-clamp-4"
              }`}
            >
              {game.name}
            </h4>
          </div>
          {game.topCriticScore && game.topCriticScore > 0 && (
            <div className="absolute bottom-0 right-0 m-2 flex gap-1 font-mono">
              <Icons.star className="w-4" />
              {game.topCriticScore && game.topCriticScore.toPrecision(2)}%
            </div>
          )}
        </div>
      </li>
      <Modal
        isOpen={isOpen}
        customColor={data}
        onClose={() => setIsOpen(false)}
      >
        <GameDetails game={game} />
      </Modal>
    </>
  )
}

export default GamePreview

export { GamePreviewSkeleton } from "./skeleton"
