import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import { extractProfileFromResume } from "@/lib/geminiClient";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "File must be a PDF" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const parsed = await pdfParse(buffer);
    const resumeText = parsed.text;

    if (!resumeText || resumeText.trim().length < 100) {
      return NextResponse.json(
        { error: "Could not extract text from PDF" },
        { status: 422 }
      );
    }

    const profile = await extractProfileFromResume(resumeText);
    return NextResponse.json({ profile });
  } catch (err) {
    console.error("[extract]", err);
    return NextResponse.json({ error: "Extraction failed" }, { status: 500 });
  }
}
