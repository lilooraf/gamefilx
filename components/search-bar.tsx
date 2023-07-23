"use client"
import { useEffect, useRef, useState } from "react"
import axios from "axios"

import { GameSearch } from "@/types"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import useOutsideCloser from "@/hooks/use-outside-closer"
import { Modal } from "@/components/modal"
import { GameSearchSchema } from "@/lib/validations/game-search"
import { useDebounce } from "@/hooks/use-debounce"
import GameDetails from "@/components/game/details"

const searchGames = async (name: string) => {
  const data = await axios
    .get("/api/game/search", { params: { name: name } })
    .then((res) => res.data)
  const games = GameSearchSchema.parse(data)

  return games
}

export const SearchBar = () => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState("")
  const [selectedGame, setSelectedGame] = useState<GameSearch[0] | undefined>(
    undefined
  )

  const [games, setGames] = useState<GameSearch>([])

  const getGames = async (name: string) => {
    setIsLoading(true)

    searchGames(name)
      .then((games) => {
        setGames(games)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  const debouncedInput = useDebounce(input, 1000)

  useEffect(() => {
    if (debouncedInput) {
      getGames(debouncedInput)
    }
  }, [debouncedInput])

  return (
    <div className="relative flex justify-center">
      <input
        autoFocus
        type="text"
        className="rounded-md border-2 border-white bg-slate-200 px-4 py-1 ring-indigo-500 focus:outline-none focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          if (!e.target.value) {
            setGames([])
          }
        }}
      />
      {isLoading && (
        <Icons.spinner className="absolute right-2 h-full animate-spin" />
      )}

      {games.length > 0 && !isLoading && input && (
        <div className="absolute top-14 rounded-md bg-slate-200 p-2 dark:bg-gray-800">
          <div className="flex flex-col gap-1">
            {games.map((game) => (
              <Button
                variant="default"
                key={game.id}
                className="w-full max-w-xs md:max-w-md"
                onClick={() => {
                  setSelectedGame(game)
                  setIsModalOpened(true)
                }}
              >
                <p className="truncate whitespace-nowrap">{game.name}</p>
              </Button>
            ))}
          </div>
        </div>
      )}
      <Modal isOpen={isModalOpened} onClose={() => setIsModalOpened(false)}>
        {isModalOpened && selectedGame && (
          <GameDetails
            game={{
              id: selectedGame.id,
              name: selectedGame.name,
              topCriticScore: null,
            }}
          />
        )}
      </Modal>
    </div>
  )
}

export const SearchBarButton = () => {
  const [isOpened, setIsOpened] = useState(false)
  const ref = useRef(null)

  useOutsideCloser(ref, () => setIsOpened(false))

  if (!isOpened) {
    return (
      <Button
        className="p-0"
        variant={"link"}
        onClick={() => setIsOpened(true)}
      >
        <Icons.search />
      </Button>
    )
  } else {
    return (
      <div ref={ref}>
        <SearchBar />
      </div>
    )
  }
}
