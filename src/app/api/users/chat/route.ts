import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { cosineSimilarity } from '@langchain/core/utils/math';

interface ResumeVector {
  id: string;
  text: string;
  embedding: number[];
}


function cosineSim(a: number[], b: number[]): number {
  const dot = a.reduce((acc, val, i) => acc + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
  return dot / (normA * normB);
}

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'No question provided' }, { status: 400 });
    }

    // Load the stored embeddings from the JSON file
    const filePath = path.join(process.cwd(), 'public', 'resume-embeddings.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const resumeVectors: ResumeVector[] = JSON.parse(fileData);

    // Embed the user question
    const embeddings = new HuggingFaceInferenceEmbeddings({
            apiKey: process.env.HUGGINGFACE_API_KEY!,
        });
    const questionEmbedding = await embeddings.embedQuery(question);

    // Find the most similar resume context
    let bestMatch: ResumeVector | null = null;
    let bestScore = -Infinity;

    for (const vector of resumeVectors) {
      const sim = cosineSim(vector.embedding, questionEmbedding);
      if (sim > bestScore) {
        bestScore = sim;
        bestMatch = vector;
      }
    }

    if (!bestMatch) {
      return NextResponse.json({ error: 'No relevant context found' }, { status: 404 });
    }

    // Construct prompt
const prompt = `
You are an AI career assistant. A user is asking a question about their resume.
ONLY use the following resume context to answer. Do NOT make up information.
Only provide the answer for asked question, do not add any extra information from other sections.

Resume Context:
"""
${bestMatch.text}
"""

Question:
"${question}"

Give a detailed, personalized, and resume-based answer.
`;



    const chat = new ChatGoogleGenerativeAI({
            model: 'models/gemini-1.5-flash',
            apiKey: process.env.GEMINI_API_KEY!,
        });
    const response = await chat.invoke(prompt);

    return NextResponse.json({ answer: response.content });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
