"use client"
import { createContext, useContext } from "react"
import { observable, Observable } from "@legendapp/state"
import { Status } from "@prisma/client"

import { GameInfo } from "@/types"

type User = {
  id: Observable<string>
  name: Observable<string | null>
  email: Observable<string | null>
  image: Observable<string | null>
  library_filter: Observable<Status>
  platforms: Observable<
    {
      name: string
      longName: string
    }[]
  >
  games: Observable<
    {
      id: number
      rating: number | null
      review: string | null
      status: Status
      game: GameInfo
    }[]
  >
}

export const UserContext = createContext<User>({
  id: observable(""),
  name: observable(null),
  email: observable(null),
  image: observable(null),
  library_filter: observable("WISH_LIST"),
  platforms: observable([]),
  games: observable([]),
})

interface UserProviderProps {
  initialUser: {
    id: string | undefined
    name: string | null | undefined
    email: string | null | undefined
    image: string | null | undefined
    platforms:
      | {
          name: string
          longName: string
        }[]
      | undefined
    games: {
      id: number
      rating: number | null
      review: string | null
      status: Status
      game: GameInfo
    }[]
  }
  children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({
  initialUser,
  children,
}) => (
  <UserContext.Provider
    value={{
      id: observable(initialUser.id),
      name: observable(initialUser.name),
      email: observable(initialUser.email),
      image: observable(initialUser.image),
      library_filter: observable("WISH_LIST"),
      platforms: observable(
        initialUser.platforms?.map((platform) => ({
          name: platform.name,
          longName: platform.longName,
        }))
      ),
      games: observable(
        initialUser.games.map((game) => ({
          id: game.id,
          rating: game.rating,
          review: game.review,
          status: game.status,
          game: game.game,
        }))
      ),
    }}
  >
    {children}
  </UserContext.Provider>
)

export const useUserPlatforms = () => {
  const { platforms } = useContext(UserContext)
  return platforms
}

export const useUserId = () => {
  const { id } = useContext(UserContext)
  return id
}

export const useUserName = () => {
  const { name } = useContext(UserContext)
  return name
}

export const useUserEmail = () => {
  const { email } = useContext(UserContext)
  return email
}

export const useUserImage = () => {
  const { image } = useContext(UserContext)
  return image
}

export const useUserLibraryFilter = () => {
  const { library_filter } = useContext(UserContext)
  return library_filter
}

export const useUserGames = () => {
  const { games } = useContext(UserContext)

  const removeGame = (id: number) => {
    games.set(games.get()?.filter((game) => game.id !== id))
  }

  const addGame = ({
    id,
    rating,
    review,
    status,
    game,
  }: {
    id: number
    rating: number | null
    review: string | null
    status: Status
    game: GameInfo
  }) => {
    games.set(
      games.get()?.concat({
        id: id,
        rating: rating,
        review: review,
        status: status,
        game: game,
      })
    )
  }

  const updateGame = ({
    id,
    rating,
    review,
    status,
  }: {
    id: number
    rating?: number | null
    review?: string | null
    status?: Status
  }) => {
    games.set(
      games.get().map((game) =>
        game.id === id
          ? {
              ...game,
              ...(rating && {
                rating: rating,
              }),
              ...(review && {
                review: review,
              }),
              ...(status && {
                status: status,
              }),
            }
          : game
      )
    )
  }

  return {
    games,
    addGame,
    removeGame,
    updateGame,
  }
}
