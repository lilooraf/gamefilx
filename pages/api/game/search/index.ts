import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from "zod"

import { withAuthentication } from '@/lib/api-middlewares/with-authentication';
import { withMethods } from '@/lib/api-middlewares/with-methods';
import { GameSearchSchema } from '@/lib/validations/game-search';

async function handler(req: NextApiRequest,
  res: NextApiResponse) {

  try {
    if (req.method === "GET") {
      const name = req.query.name

      const data = await fetch(`${process.env.API_URL}/game/search?criteria=${name}`, {
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY as string,
          'X-RapidAPI-Host': process.env.API_HOST as string,
        }
      }).then(res => res.json())

      const games = GameSearchSchema.parse(data)

      // take the first 5 results
      res.send(games.slice(0, 5))
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json(error.issues)
    }
    return res.status(422).end()
  }
}

export default withMethods(["GET"], withAuthentication(handler))
