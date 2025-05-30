import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Run } from "@/models/Run";

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
const RAPID_API_KEY = process.env.JUDGE0_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { code, languageId, input } = await req.json();

    const response = await fetch(JUDGE0_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: input,
      }),
    });

    const data = await response.json();

    // save to MongoDB
    await connectToDatabase();
    await Run.create({
      languageId,
      language: getLanguageName(languageId),
      code,
      input,
      output: data.stdout || data.compile_output || data.message || "No output",
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error("Run error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

function getLanguageName(id: number): string {
  const map: Record<number, string> = {
    54: "C++",
    71: "Python",
    63: "Java",
    93: "JavaScript",
  };
  return map[id] || "Unknown";
}