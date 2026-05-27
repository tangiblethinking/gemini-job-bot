"use client";
import type { VerifiedJob } from "@/app/api/search/route";

interface Props {
  jobs: VerifiedJob[];
  totalScanned: number;
}

export default function JobList({ jobs, totalScanned }: Props) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No verified jobs found. Try uploading a different resume.
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-400 mb-4">
        {jobs.length} verified listings from {totalScanned} total results
      </p>
      <ul className="space-y-4">
        {jobs.map((job, i) => (
          <li
            key={i}
            className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">
                  {job.searchedRole}
                </p>
                <h3 className="font-semibold text-gray-900 text-base leading-snug truncate">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{job.snippet}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition whitespace-nowrap"
                >
                  View Job
                </a>
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition whitespace-nowrap text-center"
                >
                  Apply
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
