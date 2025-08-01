// ./app/api/users/parser/route.ts

import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file: File | null = formData.get('resume') as unknown as File;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    try {
        // Parse PDF
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const parsed = await pdfParse(buffer);

        const resumeText = parsed.text;
        console.log('Resume Raw Data:', resumeText);

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

        // Get embedding model
        const model = genAI.getGenerativeModel({ model: 'embedding-001' });

        // Embed the resume text
        const result = await model.embedContent(resumeText);
        const vector = result.embedding.values;

        return NextResponse.json({
            vector,
            resumeText, // Send raw text if needed by next route
        });
    } catch (err) {
        console.error('Error parsing/analyzing resume:', err);
        return NextResponse.json({ error: 'Resume analysis failed' }, { status: 500 });
    }
}
