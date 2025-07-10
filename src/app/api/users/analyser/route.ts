import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { file } from '@/app/utils/file';  // Make sure path works

export async function POST(req: Request) {
  const model = new ChatGoogleGenerativeAI({
    model: 'models/gemini-1.5-flash',
    apiKey: process.env.GEMINI_API_KEY!,
  });

  const systemInstruction = `
You are an expert resume evaluator. 
Given a resume text, you will:
1. Provide an ATS compatibility score (out of 100)
2. Highlight strengths and weaknesses
3. Suggest 2-3 job roles the candidate is suitable for.
`;

  const prompt = `${systemInstruction}\n\nResume:\n${file}`;

  try {
    const response = await model.invoke(prompt);
    return new Response(JSON.stringify({ answer: response.content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'AI processing failed' }), {
      status: 500,
    });
  }
}
