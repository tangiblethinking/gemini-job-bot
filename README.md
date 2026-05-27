# Gemini Job Bot

Upload a resume PDF → Gemini extracts job titles → Serper searches → verified job board filter → clean list of real listings.

## Setup

1. Clone repo
2. `npm install`
3. Copy `.env.local.example` to `.env.local` and add your keys:
   - `GEMINI_API_KEY`
   - `SERPER_API_KEY`
4. `npm run dev`

## Deploy to Vercel

1. Connect repo in Vercel dashboard
2. Add env vars: `GEMINI_API_KEY`, `SERPER_API_KEY`
3. Deploy

## Order of Operations

1. User uploads PDF
2. `/api/extract` → pdf-parse → Gemini structured JSON → job titles + seniority
3. `/api/search` → Serper searches each title → full raw list
4. URL filter against `lib/jobBoardAllowlist.ts` (60+ verified domains)
5. Verified jobs returned with title, company, description, apply link
