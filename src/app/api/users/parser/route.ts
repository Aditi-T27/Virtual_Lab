// // /app/api/users/analyser/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import pdfParse from 'pdf-parse';
// import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
// import { SystemMessage, HumanMessage } from '@langchain/core/messages';

// function extractJson(text: string): string | null {
//     const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
//     if (match && match[1]) {
//         return match[1].trim();
//     }
//     const fallbackMatch = text.match(/{[\s\S]*}/);
//     return fallbackMatch ? fallbackMatch[0] : null;
// }

// export async function POST(req: NextRequest) {
//     const formData = await req.formData();
//     const file: File | null = formData.get('resume') as unknown as File;

//     if (!file) {
//         return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
//     const parsed = await pdfParse(buffer);

//     const text = parsed.text;
//     console.log('Resume Raw Data: ', text);

//     //AI Model
//     const model = new ChatGoogleGenerativeAI({
//         model: 'models/gemini-1.5-flash',
//         apiKey: process.env.GEMINI_API_KEY!,
//     });

//     const systemInstruction = `
//         I want you to act as a Technical Recruiter and help the candidate understand their resume and the gaps in terms of how good their profile suitable for internship/placement.
//         Given a resume text, you will:
//         1. Provide an ATS compatibility score (out of 100)
//         2. Highlight strengths and weaknesses
//         3. Suggest 2-3 job roles the candidate is suitable for.
//         4. Recommendations for the candidate to improve the quality of resume.

//         Respond ONLY in strict JSON format without any explanations or surrounding text. The JSON must match the following structure:
//         {
//             "score":number,
//             "strengths":string[],
//             "weaknesses":string[],
//             "suggestedRoles":string[],
//             "recommendation":string
//         }
//         Return valid JSON only. Do not include any other text, headings, or messages. No markdown formatting.
//     `;
    
    
//     try {
//     const response = await model.invoke([
//       new SystemMessage(systemInstruction),
//       new HumanMessage(text)
//     ]);

//     // ✅ Fix: Safely extract text content
//     let aiText = '';
//     if (typeof response.content === 'string') {
//         aiText = response.content;
//     } else if (Array.isArray(response.content)) {
//         aiText = response.content.map(part => (typeof part === 'string' ? part : part.text || '')).join('');
//     }

//     // ✅ Extract clean JSON string
//     const extractedJson = extractJson(aiText);

//     let parsedAnswer = {};
//     try {
//         if (!extractedJson) throw new Error('No valid JSON found in AI response');
//         parsedAnswer = JSON.parse(extractedJson);
//     } catch (parseError) {
//         console.error('Failed to parse AI response:', parseError, aiText);
//         return new Response(JSON.stringify({ error: 'Invalid AI response format' }), { status: 500 });
//     }

//     return new Response(JSON.stringify({ answer: parsedAnswer }), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//     });

//     } catch (error) {
//         console.error(error);
//         return new Response(JSON.stringify({ error: 'AI processing failed' }), { status: 500 });
//     }
    
// }




// import { NextRequest, NextResponse } from 'next/server';
// import pdfParse from 'pdf-parse';
// import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
// import { SystemMessage, HumanMessage } from '@langchain/core/messages';
// import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
// import { MemoryVectorStore } from 'langchain/vectorstores/memory';
// import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";



// function extractJson(text: string): string | null {
//     const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
//     if (match && match[1]) {
//         return match[1].trim();
//     }
//     const fallbackMatch = text.match(/{[\s\S]*}/);
//     return fallbackMatch ? fallbackMatch[0] : null;
// }

// export async function POST(req: NextRequest) {
//     const formData = await req.formData();
//     const file: File | null = formData.get('resume') as unknown as File;

//     if (!file) {
//         return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
//     const parsed = await pdfParse(buffer);
//     const text = parsed.text;

//     console.log('Resume Raw Data: ', text);

//     // ✅ Vectorization Block Starts Here
//     try {
//         const splitter = new RecursiveCharacterTextSplitter({
//             chunkSize: 1000,
//             chunkOverlap: 200,
//         });

//         const docs = await splitter.createDocuments([text]);


// const embeddings = new HuggingFaceTransformersEmbeddings({

//     apiKey: process.env.HUGGINGFACE_API_KEY!,
// });


//         const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

//         console.log('✅ VectorStore created with', docs.length, 'chunks');

//         // (Optional) You can now do similarity search
//         // const results = await vectorStore.similaritySearch("machine learning", 3);
//         // console.log("Top matches:", results);
//     } catch (vectorErr) {
//         console.error('Vectorization failed:', vectorErr);
//         return new Response(JSON.stringify({ error: 'Vectorization failed' }), { status: 500 });
//     }

//     // ✅ AI Evaluation Block
//     const model = new ChatGoogleGenerativeAI({
//         model: 'models/gemini-1.5-flash',
//         apiKey: process.env.GEMINI_API_KEY!,
//     });

//     const systemInstruction = 
//         `I want you to act as a Technical Recruiter and help the candidate understand their resume and the gaps in terms of how good their profile suitable for internship/placement.
//         Given a resume text, you will:
//         1. Provide an ATS compatibility score (out of 100)
//         2. Highlight strengths and weaknesses
//         3. Suggest 2-3 job roles the candidate is suitable for.
//         4. Recommendations for the candidate to improve the quality of resume.

//         Respond ONLY in strict JSON format without any explanations or surrounding text. The JSON must match the following structure:
//         {
//             "score":number,
//             "strengths":string[],
//             "weaknesses":string[],
//             "suggestedRoles":string[],
//             "recommendation":string
//         }
//         Return valid JSON only. Do not include any other text, headings, or messages. No markdown formatting.
//     `;

//     try {
//         const response = await model.invoke([
//             new SystemMessage(systemInstruction),
//             new HumanMessage(text)
//         ]);

//         let aiText = '';
//         if (typeof response.content === 'string') {
//             aiText = response.content;
//         } else if (Array.isArray(response.content)) {
//             aiText = response.content.map(part => (typeof part === 'string' ? part : part.text || '')).join('');
//         }

//         const extractedJson = extractJson(aiText);
//         let parsedAnswer = {};

//         try {
//             if (!extractedJson) throw new Error('No valid JSON found in AI response');
//             parsedAnswer = JSON.parse(extractedJson);
//         } catch (parseError) {
//             console.error('Failed to parse AI response:', parseError, aiText);
//             return new Response(JSON.stringify({ error: 'Invalid AI response format' }), { status: 500 });
//         }

//         return new Response(JSON.stringify({ answer: parsedAnswer }), {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' },
//         });

//     } catch (error) {
//         console.error(error);
//         return new Response(JSON.stringify({ error: 'AI processing failed' }), { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf'

import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import fs from 'fs';
import path from 'path';

function extractJson(text: string): string | null {
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (match && match[1]) return match[1].trim();

    const fallbackMatch = text.match(/{[\s\S]*}/);
    return fallbackMatch ? fallbackMatch[0].trim() : null;
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('resume') as unknown as File;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const parsed = await pdfParse(buffer);
    const text = parsed.text;

    // ✅ Step 1: Create chunks & vectorize
    let storedChunks: {
        id: string;
        text: string;
        embedding: number[];
    }[] = [];

    try {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const docs = await splitter.createDocuments([text]);

        const embeddings = new HuggingFaceInferenceEmbeddings({
            apiKey: process.env.HUGGINGFACE_API_KEY!,
        });

        const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

        const vectors = await Promise.all(
            docs.map(async (doc, idx) => {
                const embedding = await embeddings.embedQuery(doc.pageContent);
                return {
                    id: `chunk-${idx}`,
                    text: doc.pageContent,
                    embedding,
                };
            })
        );

        storedChunks = vectors;

        // ✅ Step 2: Save to local JSON file
      const outputPath = path.join(process.cwd(), 'public', 'resume-embeddings.json');

        fs.writeFileSync(outputPath, JSON.stringify(storedChunks, null, 2));

        console.log(`✅ Saved ${vectors.length} embeddings to ${outputPath}`);
    } catch (err) {
        console.error('❌ Embedding error:', err);
        return NextResponse.json({ error: 'Vectorization failed' }, { status: 500 });
    }

    // ✅ Step 3: Query LLM
    const model = new ChatGoogleGenerativeAI({
        model: 'models/gemini-1.5-flash',
        apiKey: process.env.GEMINI_API_KEY!,
    });

    const systemInstruction = `
    I want you to act as a Technical Recruiter and help the candidate understand their resume and the gaps in terms of how good their profile is for internships/placements.
    Given a resume text, respond with:
    {
        "score": number,
        "strengths": string[],
        "weaknesses": string[],
        "suggestedRoles": string[],
        "recommendation": string
    }
    ONLY return valid JSON. No extra text or markdown.
    `;

    try {
        const response = await model.invoke([
            new SystemMessage(systemInstruction),
            new HumanMessage(text),
        ]);

        let aiText = typeof response.content === 'string'
            ? response.content
            : Array.isArray(response.content)
                ? response.content.map(p => (typeof p === 'string' ? p : p.text || '')).join('')
                : '';

        const extractedJson = extractJson(aiText);

        if (!extractedJson) {
            return NextResponse.json({ error: 'Invalid AI JSON format' }, { status: 500 });
        }

        const parsedAnswer = JSON.parse(extractedJson);

        return NextResponse.json({ answer: parsedAnswer }, { status: 200 });

    } catch (err) {
        console.error('❌ AI processing failed:', err);
        return NextResponse.json({ error: 'AI processing failed' }, { status: 500 });
    }
}
