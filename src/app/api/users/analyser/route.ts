import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { file } from '@/app/utils/file';
function extractJson(text: string): string | null {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (match && match[1]) {
    return match[1].trim();
  }
  const fallbackMatch = text.match(/{[\s\S]*}/);
  return fallbackMatch ? fallbackMatch[0] : null;
}

export async function POST(req: Request) {
  const model = new ChatGoogleGenerativeAI({
    model: 'models/gemini-1.5-flash',
    apiKey: process.env.GEMINI_API_KEY!,
  });

const systemInstruction = `
You are an expert resume evaluator.

Respond strictly in valid JSON format only. Do not include any explanation, greetings, or commentary. Just output pure JSON.

The format must be:
{
  "score": "number/100",
  "strengths": ["..."],
  "weaknesses": ["..."],
  "suggestedRoles": ["..."],
  "recommendation": "..."
}

Only output valid JSON. Do not say anything else.
`;


  try {
    const response = await model.invoke([
      new SystemMessage(systemInstruction),
      new HumanMessage(file)
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
}
