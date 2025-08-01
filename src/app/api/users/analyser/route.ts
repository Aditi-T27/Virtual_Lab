// /app/api/users/analyser/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';

function extractJson(text: string): string | null {
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (codeBlockMatch && codeBlockMatch[1]) {
        return codeBlockMatch[1].trim();
    }

    // Fallback: attempt to find the largest {...} block
    const braceMatch = text.match(/{[\s\S]*}/);
    if (braceMatch) {
        try {
            // Make sure it's valid JSON
            JSON.parse(braceMatch[0]);
            return braceMatch[0];
        } catch {
            return null;
        }
    }
    return null;
}

export async function POST(req: NextRequest) {
    const { resumeText } =await req.json();
    console.log("Analyser:" + resumeText);
    //AI Model
    const model = new ChatGoogleGenerativeAI({
        model: 'models/gemini-1.5-flash',
        apiKey: process.env.GEMINI_API_KEY!,
    });
    console.log("Model Loaded");

    const systemInstruction = `
        
You are a Senior Technical Expert and a Recruiter who does the screening of the resume and assess the content to validate given resume information to assist user in understanding their current profile how suitable it is for Jobs / Internships


You are Tasked with below instructions to validate the content and rate with the feedbacks user can improve upon 

Points 10 - Personal Information 
Must : 
Name 
Email
Phone 
Linkedin 
Github 
Optional - Portfolio, twitter etc . 
Summary / Objective 
Check the personal details and give feedback on the missing or improvisation to the user 
Examples (Optional)

20 points
Tech Stack : 
Programming Language
Domain
Tools 
Concepts 

Make sure resume has foundation skills for the job by checking for above information and give the feedback on essentials missing / wrongly mentioned 
30 points projects
Have link 
Title
Tech stack
Description
What they have contributed to 
What is the outcome / impact
Validate against tech stack

Every project should have a sensible name which describes easily and also validate tech stack against the Skills 
Description should not be vague it should talk about the tasks and the impact / outcome 


20 points Internships / Freelance / Part time
Title
Tech stack
Description
What they have contributed to 
What is the outcome / impact
Validate against tech stack

Every experience should have a sensible name which describes easily and also validate tech stack against the Skills 
Description should not be vague it should talk about the tasks and the impact / outcome 


10 Education Details

10 Extra curricular activities

        Respond ONLY in strict JSON format without any explanations or surrounding text. The JSON must match the following structure:
        {
            "score":array(number) total score out of 100 and score for each section,
            "improvements":array(json) current point and improvised point (if any) for each section ,
            "strengths":string[],
            "weaknesses":string[],
            "suggestedRoles":string[],
            "recommendation":string
        }
        Return valid JSON only. Do not include any other text, headings, or messages. No markdown formatting.
    `;
    
    try {
        const response = await model.invoke([
            new SystemMessage(systemInstruction),
            new HumanMessage(resumeText)
        ]);
        console.log(response);

        // ✅ Fix: Safely extract text content
        let aiText = '';
        if (typeof response.content === 'string') {
            aiText = response.content;
        } else if (Array.isArray(response.content)) {
            aiText = response.content.map(part => (typeof part === 'string' ? part : part.text || '')).join('');
        }
        console.log(aiText);

        // ✅ Extract clean JSON string
        const extractedJson = extractJson(aiText);
        if (!extractedJson) {
            console.error("AI responded with:", aiText);
            throw new Error('No valid JSON found in AI response');
        }
        console.log(extractedJson);

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
