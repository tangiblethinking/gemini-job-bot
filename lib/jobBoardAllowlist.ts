// Verified ATS domains — second-party only, companies post directly
export const VERIFIED_DOMAINS: string[] = [
  "greenhouse.io",
  "boards.greenhouse.io",
  "ashbyhq.com",
  "jobs.ashbyhq.com",
  "lever.co",
  "jobs.lever.co",
  "workday.com",
  "myworkdayjobs.com",
  "wd1.myworkdayjobs.com",
  "wd3.myworkdayjobs.com",
  "icims.com",
  "careers.icims.com",
  "smartrecruiters.com",
  "jobs.smartrecruiters.com",
  "corp.smartrecruiters.com",
  "bamboohr.com",
  "jobvite.com",
  "jobs.jobvite.com",
  "taleo.net",
  "oracle.taleo.net",
  "successfactors.com",
  "workable.com",
  "apply.workable.com",
  "recruitee.com",
  "jazzhr.com",
  "applytojob.com",
  "rippling.com",
  "jobs.rippling.com",
  "careers.rippling.com",
  "breezy.hr",
  "pinpointhq.com",
  "dover.io",
  "app.dover.io",
  "paylocity.com",
  "paycom.com",
  "adp.com",
  "careers.adp.com",
  "oracle.com",
  "hire.trakstar.com",
  "recooty.com",
  "teamtailor.com",
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
  "dayforce.com",
  "jobsoid.com",
  "freshteam.com",
  "comeet.com",
  "recruiting.ultipro.com",
  "resumator.com",
];

// Explicit blocklist — these must never appear regardless of any other logic
const BLOCKED_DOMAINS: string[] = [
  "ziprecruiter.com",
  "indeed.com",
  "glassdoor.com",
  "linkedin.com",
  "monster.com",
  "careerbuilder.com",
  "simplyhired.com",
  "dice.com",
  "flexjobs.com",
  "wellfound.com",
  "angel.co",
  "builtin.com",
  "builtinnyc.com",
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
  "randstad.com",
  "randstadusa.com",
  "governmentjobs.com",
  "usajobs.gov",
  "idealist.org",
  "snagajob.com",
  "jobot.com",
  "ladders.com",
  "theladders.com",
  "hired.com",
  "salary.com",
  "payscale.com",
  "recruiter.com",
  "jobs2careers.com",
  "jooble.org",
  "careerjet.com",
  "talent.com",
  "neuvoo.com",
  "adzuna.com",
];

export function isVerifiedJobUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase().replace(/^www\./, "");

    // Block first — if on blocklist, always reject
    const isBlocked = BLOCKED_DOMAINS.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    );
    if (isBlocked) return false;

    // Then check allowlist
    return VERIFIED_DOMAINS.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}
