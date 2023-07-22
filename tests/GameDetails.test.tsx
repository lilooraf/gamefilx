import "@testing-library/react"
import { render, screen, act } from "@testing-library/react"
import GameDetails from "@/components/game/details"
import { UserProvider } from "@/hooks/use-user"
import { GameDetail } from "@/types"

import axios from "axios"
jest.mock("axios")

describe("GameDetails", () => {
  it("renders error state", async () => {
    const game = {
      id: 52,
      name: "Test Game",
      topCriticScore: 80,
      firstReleaseDate: "date",
      Genres: [],
      Companies: [],
      Platforms: [],
      trailers: [],
    }
    axios.get = jest.fn().mockResolvedValue({ data: game })

    await act(async () =>
      render(
        <UserProvider
          initialUser={{
            id: "fae",
            name: "fee",
            email: "email@email.com",
            image: "linktoimage",
            platforms: [],
            games: [],
          }}
        >
          <GameDetails game={game} />
        </UserProvider>
      )
    )

    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
  })

  it("renders game details", async () => {
    const game: GameDetail = {
      id: 52,
      name: "Test Game",
      topCriticScore: 80,
      description: "Test description",
      firstReleaseDate: "date",
      Genres: [],
      Companies: [],
      Platforms: [],
      trailers: [],
    }
    axios.get = jest.fn().mockResolvedValue({ data: game })

    await act(async () =>
      render(
        <UserProvider
          initialUser={{
            id: "fae",
            name: "fee",
            email: "email@email.com",
            image: "linktoimage",
            platforms: [],
            games: [],
          }}
        >
          <GameDetails game={game} />
        </UserProvider>
      )
    )

    expect(screen.getByText("Test Game")).toBeInTheDocument()
    expect(screen.getByText("Test description")).toBeInTheDocument()
    expect(screen.getByText("80%")).toBeInTheDocument()
  })
})
