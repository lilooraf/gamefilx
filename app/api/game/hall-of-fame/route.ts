import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const res = await fetch(`${process.env.API_URL}/game/hall-of-fame`, {
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY as string,
            'X-RapidAPI-Host': process.env.API_HOST as string,
        }
    });

    const product = await res.json()

    return NextResponse.json(product)
}