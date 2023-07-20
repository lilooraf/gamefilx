import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"

import { withAuthentication } from "@/lib/api-middlewares/with-authentication"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { db } from "@/lib/db"

async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    if (req.method === "GET") {
      const platforms = await db.platform.findMany({})

      return res.send(platforms)
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json(error.issues)
    }
    return res.status(422).end()
  }
}

export default withMethods(["GET"], withAuthentication(handler))
