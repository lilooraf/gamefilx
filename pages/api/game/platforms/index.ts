import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {
    const platforms = req.query.platforms
    const skip = req.query.skip
    const sort = req.query.sort

    const data = await fetch(`${process.env.API_URL}/game?sort=${sort || 'score'}&platforms=${platforms}&skip=${skip || 0}`, {
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY as string,
            'X-RapidAPI-Host': process.env.API_HOST as string,
        }
    }).then(res => res.json())

    res.send(data)
}