"use client"

import { useUserLibraryFilter, useUserGames } from "@/hooks/use-user"
import { observer } from "@legendapp/state/react"
import GamePreview from "@/components/game/preview"
import { Status } from "@prisma/client"

export const UserLibrary = observer(() => {
  const userLibraryFilter = useUserLibraryFilter()
  const { games } = useUserGames()

  return (
    <div className="flex flex-col gap-4">
      <div className="w-32">
        <select
          id="countries"
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-slate-200 p-2 text-sm text-gray-900 ring-indigo-500 focus:outline-none focus:ring-2 dark:border-gray-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
          value={userLibraryFilter.get()}
          onChange={(e) => {
            userLibraryFilter.set(e.target.value as Status)
          }}
        >
          <option value="WISH_LIST">Wishlisted</option>
          <option value="COMPLETED">Complited</option>
          <option value="PLAYING">Playing</option>
        </select>
      </div>
      <div className="flex justify-center md:justify-start">
        <div className="flex flex-wrap justify-center gap-4">
          {games
            .get()
            .filter((game) => game.status == userLibraryFilter.get())
            ?.map((game) => <GamePreview key={game.id} game={game.game} />)}
        </div>
      </div>
    </div>
  )
})
