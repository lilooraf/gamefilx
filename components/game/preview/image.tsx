import Image from "next/image"

import { GameInfo, ImageType } from "@/types"

interface GameProps {
  game: GameInfo
}
export const GamePreviewImage = ({ game }: GameProps) => {
  if (game.images?.box?.og || game.images?.banner?.og) {
    let type: ImageType = "box"

    if (game.images) {
      type = game.images.box ? "box" : "banner"
    }

    return (
      <Image
        className={`h-32 rounded-sm ${
          type == "banner" ? "order-2 w-52" : "w-20"
        } self-center`}
        src={
          "https://img.opencritic.com/" +
          (game.images?.box?.og || game.images?.banner?.og)
        }
        alt={game.name}
        width={200}
        height={200}
      />
    )
  } else {
    return (
      <div className="h-32 w-20 self-center rounded-sm bg-gray-200/20"></div>
    )
  }
}
