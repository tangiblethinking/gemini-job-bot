export interface SerperResult {
  title: string;
  link: string;
  snippet: string;
  source?: string;
}

export async function searchJobs(
  jobTitle: string,
  seniorityLevel: string
): Promise<SerperResult[]> {
  const query = `${seniorityLevel} ${jobTitle} job opening apply now`;

  const response = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "X-API-KEY": "de8d39b9df33b793a1185f8c565f42e610f21857",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: query,
      num: 10,
      gl: "us",
      hl: "en",
    }),
  });

  if (!response.ok) {
    throw new Error(`Serper API error: ${response.status}`);
  }

  const data = await response.json();
  const organic: SerperResult[] = (data.organic || []).map((r: Record<string, string>) => ({
    title: r.title || "",
    link: r.link || "",
    snippet: r.snippet || "",
    source: r.source || "",
  }));

  return organic;
}
