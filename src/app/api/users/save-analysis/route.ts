import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";

// Define types for analyserData (based on your JSON example)
interface AnalyserData {
  score: number[];
  improvements: { current: string; improved: string }[];
  strengths: string[];
  weaknesses: string[];
  suggestedRoles: string[];
  recommendation: string;
  [key: string]: any; // allow extra fields
}


// GET request handler for retrieving resume analysis
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId in query params" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("resume_analysis")
      .select("*")
      .eq("analysis_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("DB fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch resume analysis" },
        { status: 500 }
      );
    }

    return NextResponse.json({ analyses: data }, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId, analyserData }: { userId: string; analyserData: AnalyserData } =
      await req.json();

    if (!userId || !analyserData) {
      return NextResponse.json(
        { error: "Missing userId or analyserData" },
        { status: 400 }
      );
    }

    const analysisId = uuidv4();

    const { data, error } = await supabase
      .from("resume_analysis")
      .insert([
        {
          analysis_id: analysisId,
          user_id: userId,
          analysis_summary: analyserData.recommendation,
          score: analyserData.score?.reduce((a, b) => a + b, 0) || 0,
          ats_score: analyserData.score?.[2] || 0,
          resume_data: analyserData, // JSONB column
        },
      ])
      .select();

    if (error) {
      console.error("DB insert error:", error);
      return NextResponse.json(
        { error: "Failed to save resume analysis" },
        { status: 500 }
      );
    }

    return NextResponse.json({ analysisId, data }, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
