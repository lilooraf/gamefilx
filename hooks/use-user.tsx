"use client"

import { createContext, useContext, useReducer } from "react"
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
    | {
        name: string
        longName: string
      }[]
    | undefined
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

type Action =
  | {
    type: "addPlatform"
    payload: {
      name: string
      longName: string
    }
  }
  | {
    type: "removePlatform"
    payload: {
      name: string
    }
  }
  | {
    type: "setLibraryFilter"
    payload: Status
  }
  | {
    type: "addGame"
    payload: {
      id: number
      rating: number | null
      review: string | null
      status: Status
      game: GameInfo
    }
  }
  | {
    type: "removeGame"
    payload: {
      id: number
    }
  }
  | {
    type: "updateGame"
    payload: {
      id: number
      rating?: number | null
      review?: string | null
      status?: Status
    }
  }

export const UserContext = createContext<UseUserManagerResult>({
  user: {
    id: observable(''),
    name: observable(null),
    email: observable(null),
    image: observable(null),
    library_filter: observable("WISH_LIST"),
    platforms: observable(undefined),
    games: observable([]),
  },
  addPlatform: () => { },
  removePlatform: () => { },
  setLibraryFilter: () => { },
  addGame: () => { },
  removeGame: () => { },
  updateGame: () => { },
})


type UseUserManagerResult = ReturnType<typeof useUserManager>

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
    value={useUserManager({
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
    })}
  >
    {children}
  </UserContext.Provider>
)

function useUserManager(initialUser: User): {
  user: User
  addPlatform: (platform: {
    name: string
    longName: string
  }) => void
  removePlatform: (platform: {
    name: string
  }) => void
  setLibraryFilter: (filter: Status) => void
  addGame: (game: {
    id: number
    rating: number | null
    review: string | null
    status: Status
    game: GameInfo
  }) => void
  removeGame: (game: {
    id: number
  }) => void
  updateGame: (game: {
    id: number
    rating?: number | null
    review?: string | null
    status?: Status
  }) => void
} {
  const [user, dispatch] = useReducer(
    userReducer,
    initialUser
  )

  const addPlatform = (platform: {
    name: string
    longName: string
  }) => {
    dispatch({ type: "addPlatform", payload: platform })
  }

  const removePlatform = (platform: {
    name: string
  }) => {
    dispatch({ type: "removePlatform", payload: platform })
  }

  const setLibraryFilter = (filter: Status) => {
    dispatch({ type: "setLibraryFilter", payload: filter })
  }

  const addGame = (game: {
    id: number
    rating: number | null
    review: string | null
    status: Status
    game: GameInfo
  }) => {
    dispatch({ type: "addGame", payload: game })
  }

  const removeGame = (game: {
    id: number
  }) => {
    dispatch({ type: "removeGame", payload: game })
  }

  const updateGame = (game: {
    id: number
    rating?: number | null
    review?: string | null
    status?: Status
  }) => {
    dispatch({ type: "updateGame", payload: game })
  }

  return {
    user,
    addPlatform,
    removePlatform,
    setLibraryFilter,
    addGame,
    removeGame,
    updateGame,
  }
}

const userReducer = (state: User, action: Action): User => {
  switch (action.type) {
    case "addPlatform":
      return {
        ...state,
        platforms: observable(state?.platforms.get()?.concat(action.payload)),
      }
    case "removePlatform":
      return {
        ...state,
        platforms: observable(state?.platforms.get()?.filter(
          (platform) => platform.name !== action.payload.name
        )),
      }
    case "setLibraryFilter":
      return {
        ...state,
        library_filter: observable(action.payload),
      }
    case "addGame":
      return {
        ...state,
        games: observable(state?.games.concat(action.payload)),
      }
    case "removeGame":
      return {
        ...state,
        games: observable(state?.games.get().filter(
          (game) => game.id !== action.payload.id
        )),
      }
    case "updateGame":
      return {
        ...state,
        games: observable(state?.games.get().map((game) =>
          game.id === action.payload.id
            ? {
              ...game,
              ...(action.payload.rating && { rating: action.payload.rating }),
              ...(action.payload.review && { review: action.payload.review }),
              ...(action.payload.status && { status: action.payload.status }),
              }
            : game
        )),
      }
    default:
      return state
  }
}


export const useUser = (): UseUserManagerResult["user"] => {
  const { user } = useContext(UserContext)
  return user
}

export const useAddPlatform = (): UseUserManagerResult["addPlatform"] => {
  const { addPlatform } = useContext(UserContext)
  return addPlatform
}

export const useRemovePlatform = (): UseUserManagerResult["removePlatform"] => {
  const { removePlatform } = useContext(UserContext)
  return removePlatform
}

export const useSetLibraryFilter = (): UseUserManagerResult["setLibraryFilter"] => {
  const { setLibraryFilter } = useContext(UserContext)
  return setLibraryFilter
}

export const useAddGame = (): UseUserManagerResult["addGame"] => {
  const { addGame } = useContext(UserContext)
  return addGame
}

export const useRemoveGame = (): UseUserManagerResult["removeGame"] => {
  const { removeGame } = useContext(UserContext)
  return removeGame
}

export const useUpdateGame = (): UseUserManagerResult["updateGame"] => {
  const { updateGame } = useContext(UserContext)
  return updateGame
}
