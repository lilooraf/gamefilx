import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from "zod"

import { withAuthentication } from '@/lib/api-middlewares/with-authentication';
import { withMethods } from '@/lib/api-middlewares/with-methods';
import { GamesResultSchema } from '@/lib/validations/games';


async function handler(req: NextApiRequest,
    res: NextApiResponse) {

    try {
        if (req.method === "GET") {
            const platforms = req.query.platforms
            const skip = req.query.skip
            const sort = req.query.sort

            const data = await fetch(`${process.env.API_URL}/game?sort=${sort || 'score'}&platforms=${platforms}&skip=${skip || 0}`, {
                headers: {
                    'X-RapidAPI-Key': process.env.API_KEY as string,
                    'X-RapidAPI-Host': process.env.API_HOST as string,
                }
            }).then(res => res.json())

            const games = GamesResultSchema.parse(data)

            res.send(games)
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json(error.issues)
        }
        return res.status(422).end()
    }
}

export default withMethods(["GET"], withAuthentication(handler))
