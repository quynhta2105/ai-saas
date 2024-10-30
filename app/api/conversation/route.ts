import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.API_KEY

export async function POST(req: Request) {
    const genAI = new GoogleGenerativeAI(apiKey!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        if(!apiKey) {
            return new NextResponse("API Key not config", {status: 500});
        }
        if(!messages) {
            return new NextResponse("Messages are required", {status: 400});
        }

        const result = await model.generateContent(messages);

        return NextResponse.json(result.response.text())
    } catch (error) {
        console.log("[ERROR]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}