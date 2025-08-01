// /app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';

export async function POST(req: NextRequest) {
    try {
        const { resumeText, userQuery ,messages} = await req.json();

        const model = new ChatGoogleGenerativeAI({
            model: 'models/gemini-1.5-flash',
            apiKey: process.env.GEMINI_API_KEY!,
        });

        // Create chat history context
        const historyContext = messages
        .map((msg: any) => `${msg.sender === 'user' ? 'User' : 'Bot'}: ${msg.text}`)
        .join('\n');

        const systemPrompt = `
        You are a helpful career assistant. Use the candidate's resume to guide your responses.
            Resume:
            ${resumeText}

            Chat history:
            ${historyContext}

            User: ${userQuery}
            Bot:
        `;

        const response = await model.invoke([
            new SystemMessage(systemPrompt),
            new HumanMessage(userQuery),
        ]);

        return NextResponse.json({ reply: response.content });
    } catch (err) {
        console.error('Chat route error:', err);
        return NextResponse.json({ error: 'Chat error occurred' }, { status: 500 });
    }
}
