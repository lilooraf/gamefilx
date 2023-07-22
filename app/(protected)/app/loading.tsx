import { GamesSectionSekeleton } from "@/components/game/section"

export default function GamesLoadingPage() {
  return (
    <div>
      {Array.from(Array(5).keys()).map((id) => (
        <GamesSectionSekeleton key={id} id={id} />
      ))}
    </div>
  )
}
