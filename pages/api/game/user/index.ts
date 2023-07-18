import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { withAuthentication } from "@/lib/api-middlewares/with-authentication"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { userGamesSchema } from "@/lib/validations/user-games"

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

        const payload = userGamesSchema.parse(body)

        if (payload) {
          await db.userGame.upsert({
            where: {
              id: `${user.id}-${payload.game.id}`,
            },
            update: {
              review: payload.review,
              score: payload.score,
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
              score: payload.score,
              status: payload.status,
              user: {
                connect: {
                  id: user.id,
                },
              },
              game: {
                connect: {
                  id: payload.game.id,
                },
                create: {
                  name: payload.game.name,
                  images: payload.game.images as any,
                  id: payload.game.id,
                  topCriticScore: payload.game.topCriticScore,
                },
              },
            }
          })
        }
      }
      return res.end()
    } else if (req.method === "GET") {
      const userGames = await db.userGame.findMany({
        where: {
          userId: user.id,
        },
        include: {
          game: true,
        },
      })

      return res.send({userGames})
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json(error.issues)
    }
    return res.status(422).end()
  }
}

export default withMethods(["GET", "POST"], withAuthentication(handler))
