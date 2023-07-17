import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const res = await fetch(`${process.env.API_URL}/game/${params.id}`, {
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY as string,
            'X-RapidAPI-Host': process.env.API_HOST as string,
        }
    });
    const product = await res.json()

    return NextResponse.json(product)
}