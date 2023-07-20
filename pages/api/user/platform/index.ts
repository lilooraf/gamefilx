import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { withAuthentication } from "@/lib/api-middlewares/with-authentication"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { userPlatformSchema } from "@/lib/validations/user-platform"

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
        const payload = userPlatformSchema.parse(body)

        if (payload) {
          // remove all platforms from user
          await db.userPlatform.deleteMany({
            where: {
              userId: user.id,
            },
          })

          // add platforms to user

          await db.userPlatform.createMany({
            data: payload.platforms.map((platform) => {
              return {
                userId: user.id,
                platformId: platform,
              }
            }
            ),
            skipDuplicates: true,
          })
        }
      }
      return res.end()
    } else if (req.method === "GET") {
      const platforms = await db.user.findUnique({
        where: {
          id: user.id,
        },
        include: {
          userPlatforms: true,
        },
      }).then((user) => {
        if (user) {
          return user.userPlatforms
        }
        return []
      })

      return res.send({ platforms })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json(error.issues)
    }
    return res.status(422).end()
  }
}

export default withMethods(["GET", "POST"], withAuthentication(handler))
