import { GamesSection } from "@/components/game/section"
import { SectionsUserPlatforms } from "@/components/game/sections-user-platform"
import { gameLists } from "@/config/game-lists"

const GamesPage = () => {

  return (
    <div>
      {gameLists.map((gameList, index) => (
        <GamesSection key={gameList.title} gameList={gameList} id={index} />
      ))}
      <SectionsUserPlatforms />
    </div>
  )
}

export default GamesPage
