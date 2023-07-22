import { GamesSection } from "@/components/game/section"
import { GamesUserPlatforms } from "@/components/game/games-user-platform"
import { gameLists } from "@/config/game-lists"

const GamesPage = () => {

  return (
    <div>
      {gameLists.map((gameList, index) => (
        <GamesSection key={gameList.title} gameList={gameList} id={index} />
      ))}
      <GamesUserPlatforms />
    </div>
  )
}

export default GamesPage
