export const VERIFIED_DOMAINS: string[] = [
  // ATS / Job Board Platforms (Second-Party — Companies Post Directly)
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

    return VERIFIED_DOMAINS.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}
