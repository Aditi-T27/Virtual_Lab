// /app/api/users/analyser/route.ts

import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';

function extractJson(text: string): string | null {
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (match && match[1]) {
        return match[1].trim();
    }
    const fallbackMatch = text.match(/{[\s\S]*}/);
    return fallbackMatch ? fallbackMatch[0] : null;
}

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
            "suggestedRoles":string[],
            "recommendation":string
        }
        Return valid JSON only. Do not include any other text, headings, or messages. No markdown formatting.
    `;
    
    // const systemInstruction = `
    // You are an expert resume evaluator.

    // Respond strictly in valid JSON format only. Do not include any explanation, greetings, or commentary. Just output pure JSON.

    // The format must be:
    // {
    // "score": "number/100",
    // "strengths": ["..."],
    // "weaknesses": ["..."],
    // "suggestedRoles": ["..."],
    // "recommendation": "..."
    // }

    // Only output valid JSON. Do not say anything else.
    // `;
    
    try {
    const response = await model.invoke([
      new SystemMessage(systemInstruction),
      new HumanMessage(text)
    ]);

    // ✅ Fix: Safely extract text content
    let aiText = '';
    if (typeof response.content === 'string') {
        aiText = response.content;
    } else if (Array.isArray(response.content)) {
        aiText = response.content.map(part => (typeof part === 'string' ? part : part.text || '')).join('');
    }

    // ✅ Extract clean JSON string
    const extractedJson = extractJson(aiText);

    let parsedAnswer = {};
    try {
        if (!extractedJson) throw new Error('No valid JSON found in AI response');
        parsedAnswer = JSON.parse(extractedJson);
    } catch (parseError) {
        console.error('Failed to parse AI response:', parseError, aiText);
        return new Response(JSON.stringify({ error: 'Invalid AI response format' }), { status: 500 });
    }

    return new Response(JSON.stringify({ answer: parsedAnswer }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'AI processing failed' }), { status: 500 });
    }
    // try {
    //     const response = await model.invoke(prompt);
    //     console.log('response', response.content);

    //     return new Response(JSON.stringify( response.content ) , {
    //         status: 200,
    //         headers: { 'Content-Type': 'application/json' },
    //     });
    // } catch (error) {
    //     console.error(error);
    //     return new Response(JSON.stringify({ error: 'AI processing failed' }), {
    //         status: 500,
    //     });
    // }

    // const dummyResponse = {
    //     answer: `Here is the extracted resume text:\n\n${text.slice(0, 500)}...`, // First 500 chars
    // };
    // return NextResponse.json(dummyResponse);
}
