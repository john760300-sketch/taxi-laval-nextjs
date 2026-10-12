# taxi-laval-nextjs

Modern Next.js (App Router) + TypeScript + Tailwind CSS version of the Taxi Laval / TAXI CHOMEDEY website. Full migration with new URL structure, bilingual support, local SEO pages, and an AI fare agent.

## What's new in this commit

### 🚖 AI Fare Agent (Taxi Chomedey)

Conversational agent that collects trip info (origin → destination → date) and returns a fixed, guaranteed fare based on official CTQ rates aligned with UberX peak pricing.

**Two surfaces:**

| Surface | Route | Purpose |
|---|---|---|
| **Standalone page** | `/fr/calculer-prix` (FR) and `/en/calculate-fare` (EN) | Short URL for ads, SMS, social — full-page chat experience |
| **Embedded on airport pages** | `/fr/transport-aeroport` and `/en/airport-transport` | Agent replaces the static "Tarif Forfaitaire Compétitif" + 3 trust bullets section, catches users at peak intent |

**Nav button added:** `TARIF TAXI` (FR) / `FARE CALC` (EN) in the desktop + mobile nav, between `CONTACT` and the phone CTA.

### How it works

1. Client types a request → agent asks one question at a time (origin, then destination, then date)
2. When all 3 are collected, agent emits a `===FARE_REQUEST===` block with the parsed trip data
3. Frontend calls `/api/fare` which:
   - Geocodes origin + destination via **OpenStreetMap Nominatim** (free, no API key)
   - Routes via **OSRM public server** (free)
   - Runs the **CTQ fare calculation** logic from `src/lib/fare.ts` (preserved from the original calculator)
4. Frontend renders the fare table inline in the chat

### Files added

```
src/lib/fare.ts                       # CTQ fare logic (pointe/UberX alignment, cash discount)
src/lib/routing.ts                    # Nominatim + OSRM (free v1; swap to Mapbox in v2)
src/app/api/chat/route.ts             # LLM agent endpoint (z-ai-web-dev-sdk, server-side)
src/app/api/fare/route.ts             # Fare calculation endpoint
src/components/ChatAgent.tsx          # Self-contained chat UI (plain Tailwind)
src/components/FareTable.tsx          # Inline fare table renderer (plain Tailwind)
src/app/fr/calculer-prix/page.tsx    # Standalone FR page (Header + agent + Footer)
src/app/en/calculate-fare/page.tsx   # Standalone EN page
.env.example                          # Documents env vars (none required for v1)
```

### Files modified

- `src/components/ServicePage.tsx` + `ServicePageEn.tsx` — added `showAgent` prop. When `true`, replaces the static "price card + 3 trust bullets" with the embedded ChatAgent
- `src/app/fr/transport-aeroport/page.tsx` + `en/airport-transport/page.tsx` — pass `showAgent={true}` to enable the agent on airport pages
- `src/components/Header.tsx` + `HeaderEn.tsx` — added `TARIF TAXI` / `FARE CALC` button in desktop + mobile nav
- `package.json` — added `z-ai-web-dev-sdk` dependency

## Tech stack

- **Next.js 15.2.4** (App Router) + TypeScript 5
- **Tailwind CSS 4** (plain — no shadcn/ui)
- **z-ai-web-dev-sdk** (LLM agent, server-side only)
- **OpenStreetMap Nominatim + OSRM** (free geocoding + routing — no API key needed for v1)

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` (redirects to `/fr`).

To test the agent:
- Visit `/fr/calculer-prix` (standalone) or `/fr/transport-aeroport` (embedded on airport page)
- Try: "Bonjour, je veux un prix pour Laval → YUL demain 8h"

## Production deployment

The app deploys cleanly to Vercel or Cloudflare Pages — no special configuration needed. `z-ai-web-dev-sdk` is server-side only (used in `/api/chat` route) so the API key never reaches the browser.

### v2 upgrades (optional)

- **Mapbox** instead of OSM — better Quebec address accuracy + live traffic data. Set `MAPBOX_ACCESS_TOKEN` in your deployment env vars and swap `src/lib/routing.ts` to use Mapbox Geocoding + Directions APIs. See `.env.example`.
- **Reservation capture** — collect name + phone + flight number in the chat, email to dispatcher
- **Multi-language LLM responses** — current agent always replies in French (works for most Quebec clients)
- **Real photos** of your fleet, drivers, YUL pickup zone — drop into `/public/fleet/` and use Next.js `<Image>` component. AI-generated photos hurt trust for local taxi services — use real ones.

## Phone + branding

- Phone: **514-239-6512** (from the live site header)
- Domain: **besttaxilaval.ca**
- Color system: `#1e3a5f` (navy primary), `#e6b422` (gold secondary), `#d4a017` (gold accent)
- NEQ: 2276874064
