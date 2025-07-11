// /app/api/users/analyser/route.ts

import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file: File | null = formData.get('resume') as unknown as File;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const parsed = await pdfParse(buffer);

    const text = parsed.text;
    console.log('Resume Raw Data: ', text);

    //AI Model
    const model = new ChatGoogleGenerativeAI({
        model: 'models/gemini-1.5-flash',
        apiKey: process.env.GEMINI_API_KEY!,
    });

    const systemInstruction = `
        I want you to act as a Technical Recruiter and help the candidate understand their resume and the gaps in terms of how good their profile suitable for internship/placement.
        Given a resume text, you will:
        1. Provide an ATS compatibility score (out of 100)
        2. Highlight strengths and weaknesses
        3. Suggest 2-3 job roles the candidate is suitable for.
        4. Recommendations for the candidate to improve the quality of resume.

        Respond ONLY in strict JSON format without any explanations or surrounding text. The JSON must match the following structure:
        {
            "score":number,
            "strengths":string[],
            "weaknesses":string[],
            "job_roles":string[],
            "recommendations":string
        }
        Return valid JSON only. Do not include any other text, headings, or messages. No markdown formatting.
    `;
    const prompt = `${systemInstruction}\n\nResume:\n${text}`;

    try {
        const response = await model.invoke(prompt);
        console.log('response', response.content);

        return new Response(JSON.stringify( response.content ) , {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'AI processing failed' }), {
            status: 500,
        });
    }

    // const dummyResponse = {
    //     answer: `Here is the extracted resume text:\n\n${text.slice(0, 500)}...`, // First 500 chars
    // };
    // return NextResponse.json(dummyResponse);
}
