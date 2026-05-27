import { NextRequest, NextResponse } from "next/server";
import { searchJobs, SerperResult } from "@/lib/serperClient";
import { isVerifiedJobUrl } from "@/lib/jobBoardAllowlist";

export const runtime = "nodejs";
export const maxDuration = 45;

export interface VerifiedJob {
  title: string;
  company: string;
  link: string;
  applyLink: string;
  snippet: string;
  source: string;
  searchedRole: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobTitles, seniorityLevel } = body as {
      jobTitles: string[];
      seniorityLevel: string;
    };

    if (!jobTitles || !Array.isArray(jobTitles) || jobTitles.length === 0) {
      return NextResponse.json({ error: "jobTitles required" }, { status: 400 });
    }

    const titlesToSearch = jobTitles.slice(0, 5);
    const searchResults = await Promise.allSettled(
      titlesToSearch.map((title) => searchJobs(title, seniorityLevel || "Senior"))
    );

    const allResults: Array<{ result: SerperResult; role: string }> = [];
    searchResults.forEach((settled, idx) => {
      if (settled.status === "fulfilled") {
        settled.value.forEach((r) => {
          allResults.push({ result: r, role: titlesToSearch[idx] });
        });
      }
    });

    const seen = new Set<string>();
    const verifiedJobs: VerifiedJob[] = [];

    for (const { result, role } of allResults) {
      if (!result.link || seen.has(result.link)) continue;
      if (!isVerifiedJobUrl(result.link)) continue;

      seen.add(result.link);

      let company = "";
      try {
        const hostname = new URL(result.link).hostname.replace(/^www\./, "");
        company = hostname.split(".")[0];
        company = company.charAt(0).toUpperCase() + company.slice(1);
      } catch {
        company = result.source || "Unknown";
      }

      verifiedJobs.push({
        title: result.title,
        company,
        link: result.link,
        applyLink: result.link,
        snippet: result.snippet,
        source: result.source || "",
        searchedRole: role,
      });
    }

    return NextResponse.json({ verifiedJobs, totalFound: allResults.length });
  } catch (err) {
    console.error("[search]", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
