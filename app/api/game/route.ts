import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const platforms = searchParams.get('platforms')
    const skip = searchParams.get('skip')
    const sort = searchParams.get('sort')

    console.log('platforms', platforms)
    console.log('skip', skip)

    const res = await fetch(`${process.env.API_URL}/game?sort=${sort || 'score'}&platforms=${platforms}&skip=${skip || 0}`, {
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY as string,
            'X-RapidAPI-Host': process.env.API_HOST as string,
        }
    });
    const product = await res.json()

    return NextResponse.json({ product })
}