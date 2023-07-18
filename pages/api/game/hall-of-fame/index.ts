import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {

    const data = await fetch(`${process.env.API_URL}/game/hall-of-fame`, {
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY as string,
            'X-RapidAPI-Host': process.env.API_HOST as string,
        }
    }).then(res => res.json())

    res.send(data)
}