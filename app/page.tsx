"use client";
import { useState } from "react";
import ResumeUpload from "@/components/ResumeUpload";
import JobList from "@/components/JobList";
import type { VerifiedJob } from "@/app/api/search/route";

type Step = "idle" | "extracting" | "searching" | "done" | "error";

interface Profile {
  jobTitles: string[];
  skills: string[];
  yearsExperience: number;
  seniorityLevel: string;
}

export default function Home() {
  const [step, setStep] = useState<Step>("idle");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [jobs, setJobs] = useState<VerifiedJob[]>([]);
  const [totalScanned, setTotalScanned] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(file: File) {
    setStep("extracting");
    setError(null);
    setJobs([]);
    setProfile(null);

    try {
      // Step 1: Extract profile from resume
      const formData = new FormData();
      formData.append("resume", file);

      const extractRes = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      if (!extractRes.ok) {
        const err = await extractRes.json();
        throw new Error(err.error || "Extraction failed");
      }

      const { profile: extractedProfile } = await extractRes.json();
      setProfile(extractedProfile);
      setStep("searching");

      // Step 2: Search and filter jobs
      const searchRes = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitles: extractedProfile.jobTitles,
          seniorityLevel: extractedProfile.seniorityLevel,
        }),
      });

      if (!searchRes.ok) {
        const err = await searchRes.json();
        throw new Error(err.error || "Search failed");
      }

      const { verifiedJobs, totalFound } = await searchRes.json();
      setJobs(verifiedJobs);
      setTotalScanned(totalFound);
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("error");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Gemini Job Bot
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Upload your resume → get verified job listings from real company boards
          </p>
        </div>

        {/* Upload */}
        <ResumeUpload
          onUpload={handleUpload}
          loading={step === "extracting" || step === "searching"}
        />

        {/* Status */}
        {step === "extracting" && (
          <div className="mt-6 text-center text-sm text-gray-500 animate-pulse">
            Parsing resume with Gemini...
          </div>
        )}

        {step === "searching" && profile && (
          <div className="mt-6 text-center text-sm text-gray-500 animate-pulse">
            Searching for: {profile.jobTitles.slice(0, 3).join(", ")}...
          </div>
        )}

        {/* Profile pill summary */}
        {profile && step === "done" && (
          <div className="mt-6 bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
            <span className="font-medium text-gray-800">{profile.seniorityLevel}</span>
            {" · "}
            {profile.yearsExperience} yrs experience
            {" · "}
            Searching: {profile.jobTitles.slice(0, 4).join(", ")}
          </div>
        )}

        {/* Error */}
        {step === "error" && error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Results */}
        {step === "done" && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Verified Job Listings
            </h2>
            <JobList jobs={jobs} totalScanned={totalScanned} />
          </div>
        )}
      </div>
    </main>
  );
}
