# Worklog — Taxi Chomedey AI Fare Agent Integration

## Project Context

- **Live site**: https://besttaxilaval.ca (hand-coded static HTML, served via Cloudflare)
- **Target repo**: https://github.com/john760300-sketch/taxi-laval-nextjs.git
- **Repo state**: Full Next.js 15.2.4 migration of besttaxilaval.ca — FR+EN pages for every service, multi-city routing, shared Header/Footer/ServicePage components. NOT YET PUBLISHED to production (perfect time to integrate).
- **Latest commit on origin/main**: `9f549fb fix: mobile hamburger menu (z-index, touch target, drawer, body scroll lock)`

## Sandbox State (this session)

Built a complete AI taxi fare agent in the sandbox (Next.js 16 + shadcn/ui + z-ai-web-dev-sdk). Working end-to-end with free OpenStreetMap (Nominatim + OSRM) routing. Tested via agent-browser: full conversation flow → live fare calculation → table render with real OSRM data.

**Preview link**: https://preview-chat-7fa4f105-401f-44ed-b416-614729ea3633.space-z.ai/
- `?view=embedded` (default) — mock of `besttaxilaval.ca/taxi/transport-aeroport/` with agent embedded in "Tarif Forfaitaire Compétitif" section
- `?view=standalone` — full-page agent UI (what would live at `agent.besttaxilaval.ca`)

## Decisions Made

1. **Stack choice**: Integrate agent INTO user's existing Next.js 15.2.4 repo (NOT deploy as separate standalone app). The agent's logic (lib/fare.ts, lib/routing.ts, api/chat/route.ts, api/fare/route.ts) is pure TypeScript and works as-is. UI components (ChatAgent, FareTable, StandaloneAgentPage) need rewriting to use plain Tailwind instead of shadcn/ui.

2. **Maps backend**: Path A — ship v1 with OSM (free, no signup), upgrade to Mapbox later in v2.

3. **Phone number**: +15142396512 (from the live site header), replacing the +14506888888 placeholder that was in the user's original calculator upload.

4. **French wording**: All "peak" → "pointe" (peak hours → heures de pointe, isPeakTime → estHeurePointe, etc.). User explicitly requested this French translation.

5. **Agent placement strategy (hybrid)**:
   - New standalone routes `/fr/calculer-prix/` and `/en/calculate-fare/` — short URL for marketing
   - Embedded agent on `/fr/transport-aeroport/` and `/en/airport-transport/` — replaces the static "Tarif Forfaitaire Compétitif" + 3 trust bullets section

6. **TARIF TAXI nav button**: Navy bg + white text, added between CONTACT and the phone CTA in the existing Header.tsx / HeaderEn.tsx components.

## Integration Plan (when resuming)

| Step | Action | Files affected |
|---|---|---|
| 1 | Backup current sandbox agent files to /tmp/agent-backup/ | `src/lib/fare.ts`, `src/lib/routing.ts`, `src/app/api/chat/route.ts`, `src/app/api/fare/route.ts`, `src/components/chat-agent.tsx`, `src/components/fare-table.tsx`, `src/components/standalone-agent-page.tsx` |
| 2 | Reset local main to origin/main | Lose sandbox-only commits + junk files (agent-*.png screenshots, db/custom.db, download/, tool-results/, upload/, .zscripts/) |
| 3 | Add agent logic files as-is | `src/lib/fare.ts`, `src/lib/routing.ts`, `src/app/api/chat/route.ts`, `src/app/api/fare/route.ts` |
| 4 | Rewrite UI components without shadcn | `src/components/ChatAgent.tsx`, `src/components/FareTable.tsx` — plain Tailwind matching user's color vars (#1e3a5f navy, #e6b422 gold, #d4a017 accent) |
| 5 | Add standalone routes | `src/app/fr/calculer-prix/page.tsx`, `src/app/en/calculate-fare/page.tsx` — wrap ChatAgent in user's existing Header/Footer |
| 6 | Add `showAgent` prop to ServicePage template | `src/components/ServicePage.tsx` + `src/components/ServicePageEn.tsx` |
| 7 | Enable agent on airport pages | `src/app/fr/transport-aeroport/page.tsx` + `src/app/en/airport-transport/page.tsx` — pass `showAgent={true}` |
| 8 | Add TARIF TAXI nav button | `src/components/Header.tsx` + `src/components/HeaderEn.tsx` — between CONTACT and phone CTA, links to /fr/calculer-prix and /en/calculate-fare |
| 9 | Add z-ai-web-dev-sdk dependency | `package.json` |
| 10 | Add .env.example | `MAPBOX_ACCESS_TOKEN=` placeholder (for v2 upgrade) |
| 11 | Update README with agent setup instructions | `README.md` |
| 12 | Run lint + test existing routes still work | `bun run lint` + dev server |
| 13 | Commit with clear message | `feat: AI fare agent — /fr/calculer-prix + /en/calculate-fare + embedded on airport pages` |
| 14 | Push to origin/main | Needs PAT from user |

## What's still needed from user (for tomorrow)

1. **Personal Access Token (PAT)** for pushing — Option 1
   - Create at https://github.com/settings/tokens with `repo` scope, 7-day expiration
   - Paste in chat
   - I configure remote, push, then strip token from config
   - User revokes PAT immediately after push confirms

2. **OR pick Option 2 (git bundle)** — I export a .bundle file to /home/z/my-project/download/, user clones and pushes themselves with their own credentials. Zero token exposure but extra steps for user.

3. **OR pick Option 3 (clone sandbox themselves)** — User figures out how to clone the sandbox state to their local machine.

## Key technical notes for tomorrow's session

- The sandbox runs Next.js 16 with shadcn/ui, but the user's repo runs Next.js 15.2.4 with plain Tailwind. Do NOT push sandbox code as-is — adapt UI components to plain Tailwind first.
- The user's existing color system uses CSS variables in globals.css: `--color-primary: #1e3a5f`, `--color-secondary: #e6b422`, `--color-accent: #d4a017`. Use these.
- The user's existing ServicePage template has the "Tarif Forfaitaire Compétitif" section with 3 trust bullets (10 ans, 50+ véhicules, 4.9/5). The agent should occupy this exact space when `showAgent={true}`.
- The Header has nav links: ACCUEIL / SERVICES ▼ / URGENCE / VILLE ▼ / CONTACT, then phone CTA. Add TARIF TAXI button between CONTACT and phone CTA.
- z-ai-web-dev-sdk MUST be server-side only (per skill rule). Already correctly placed in /api/* routes only — do not import in client components.
- OSRM/Nominatim has 1 req/sec rate limit per IP. For production, switch to Mapbox in v2.

## Sandbox artifacts that may not survive session reset

- `agent-initial.png`, `agent-final.png`, `airport-embed-preview.png`, `airport-embed-v2.png`, `airport-top-agent.png`, `standalone-view.png`, `standalone-full.png`, `standalone-mobile.png`, `nav-with-tarif-button.png` — screenshots from this session (informational only, don't need to push to repo)
- Local git commits beyond origin/main — these are sandbox-only and will be discarded when we reset to origin/main tomorrow
- The preview link may or may not work tomorrow depending on sandbox state
