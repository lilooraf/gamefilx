import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { withAuthentication } from "@/lib/api-middlewares/with-authentication"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { userGameDeleteSchema, userGamePostSchema } from "@/lib/validations/user-game"

async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const session = await getServerSession(req, res, authOptions)
    const user = session?.user

    if (!user) {
      throw new Error("User not found.")
    }

    const body = req.body

    if (req.method === "POST") {
      if (body) {
        const payload = userGamePostSchema.parse(body)

        if (payload) {
          await db.userGame.upsert({
            where: {
              id: `${user.id}-${payload.game.id}`,
            },
            update: {
              review: payload.review,
              rating: payload.rating,
              status: payload.status,
              game: {
                update: {
                  name: payload.game.name,
                  images: payload.game.images as any,
                  topCriticScore: payload.game.topCriticScore,
                },
              },
            },
            create: {
              id: `${user.id}-${payload.game.id}`,
              review: payload.review,
              rating: payload.rating,
              status: payload.status,
              user: {
                connect: {
                  id: user.id,
                },
              },
              game: {
                connectOrCreate: {
                  where: {
                    id: payload.game.id,
                  },
                  create: {
                    name: payload.game.name,
                    images: payload.game.images as any,
                    id: payload.game.id,
                    topCriticScore: payload.game.topCriticScore,
                  },
                },
              },
            }
          }).then(() => {
            res.status(200).end()
          })
        }
      }
      return res.end()
    } else if (req.method === "GET") {
      const games = await db.userGame.findMany({
        where: {
          userId: user.id,
        },
        include: {
          game: true,
        },
      }).then((user) => {
        // return array of games
        return user.map((userGame) => {
          return userGame.game
        })
      })

      return res.send(games)
    } else if (req.method === "DELETE") {
      const payload = userGameDeleteSchema.parse(body)

      await db.userGame.delete({
        where: {
          id: `${user.id}-${payload.gameId}`,
        },
      }).then(() => {
        console.log("deleted")
        res.status(200).end()
      })
      return res.end()
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json(error.issues)
    }
    return res.status(422).end()
  }
}

export default withMethods(["GET", "POST", "DELETE"], withAuthentication(handler))
