import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const imageUrl = `https://image.pollinations.ai/prompt/${messages}`;

        const result = await fetch(imageUrl);
        console.log(result);
        return NextResponse.json(result)
    } catch (error) {
        console.log("[ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}