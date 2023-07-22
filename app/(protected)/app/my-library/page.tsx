import { Metadata } from "next"

import { UserLibrary } from "@/components/game/library"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "My Library",
  description: "Your game library",
}

export default function GamesPage() {
  return (
    <div className="px-4">
      <UserLibrary />
    </div>
  )
}
