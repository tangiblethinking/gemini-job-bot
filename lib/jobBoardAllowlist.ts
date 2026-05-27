// Verified job board domains — companies pay to list here or these are official career pages
export const VERIFIED_DOMAINS: string[] = [
  // ATS / Job Board Platforms
  "greenhouse.io",
  "boards.greenhouse.io",
  "ashbyhq.com",
  "jobs.ashbyhq.com",
  "lever.co",
  "jobs.lever.co",
  "workday.com",
  "myworkdayjobs.com",
  "icims.com",
  "careers.icims.com",
  "smartrecruiters.com",
  "jobs.smartrecruiters.com",
  "bamboohr.com",
  "jobvite.com",
  "jobs.jobvite.com",
  "taleo.net",
  "successfactors.com",
  "workable.com",
  "apply.workable.com",
  "recruitee.com",
  "jazzhr.com",
  "applytojob.com",
  "rippling.com",
  "breezy.hr",
  "pinpointhq.com",
  "dover.com",
  "gem.com",
  "findem.ai",
  "paylocity.com",
  "paycom.com",
  "adp.com",
  "careers.adp.com",
  "oracle.com",
  "hire.trakstar.com",
  "recruitloop.com",
  "clearbit.com",
  "fountainhq.com",
  "fountain.com",
  "recooty.com",
  "teamtailor.com",
  "join.com",
  "personio.com",
  "softgarden.io",
  "erecruiter.net",
  "jobscore.com",
  "hirebridge.com",
  "silkroad.com",
  "kenexa.com",
  "halogen.software",
  "sap.com",
  "careers.sap.com",

  // Major Job Aggregators (verified listings only)
  "linkedin.com",
  "indeed.com",
  "glassdoor.com",
  "ziprecruiter.com",
  "monster.com",
  "dice.com",
  "careerbuilder.com",
  "simplyhired.com",
  "flexjobs.com",
  "wellfound.com",
  "angel.co",
  "builtinnyc.com",
  "builtin.com",
  "builtinla.com",
  "builtinchicago.com",
  "builtinboston.com",
  "builtinseattle.com",
  "builtinaustin.com",
  "builtincolorado.com",
  "otta.com",
  "levels.fyi",
  "remoteok.com",
  "weworkremotely.com",
  "remotive.com",
  "authentic-jobs.com",
  "powertofly.com",
  "hiretechladies.com",
  "diversifytech.co",
  "include.io",

  // Company career page patterns (checked separately via path matching)
  // These are matched via isCompanyCareersPage() below
];

// Path patterns that indicate an official company careers page
export const CAREERS_PATH_PATTERNS: RegExp[] = [
  /\/careers\//i,
  /\/careers$/i,
  /\/jobs\//i,
  /\/jobs$/i,
  /\/work-with-us/i,
  /\/join-us/i,
  /\/join-our-team/i,
  /\/openings/i,
  /\/open-positions/i,
  /\/job-openings/i,
];

export function isVerifiedJobUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase().replace(/^www\./, "");
    const fullPath = parsed.pathname.toLowerCase();

    // Check against explicit allowlist
    const domainMatch = VERIFIED_DOMAINS.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    );
    if (domainMatch) return true;

    // Check if it looks like a company /careers page
    const pathMatch = CAREERS_PATH_PATTERNS.some((pattern) =>
      pattern.test(fullPath)
    );
    if (pathMatch) return true;

    return false;
  } catch {
    return false;
  }
}
