import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface ExtractedProfile {
  jobTitles: string[];
  skills: string[];
  yearsExperience: number;
  seniorityLevel: string;
}

export async function extractProfileFromResume(
  resumeText: string
): Promise<ExtractedProfile> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a resume parser. Extract structured job search data from this resume text.

Return ONLY valid JSON with this exact structure, no markdown, no explanation:
{
  "jobTitles": ["list of job titles/roles this person has held or is qualified for, ordered by relevance, max 8"],
  "skills": ["top 10 skills from the resume"],
  "yearsExperience": <total years of experience as integer>,
  "seniorityLevel": "one of: Junior, Mid, Senior, Lead, Director, VP, C-Level"
}

Resume text:
${resumeText}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/```json|```/g, "").trim();
  return JSON.parse(text) as ExtractedProfile;
}
