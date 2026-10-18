"use client";

import { useEffect } from "react";

/**
 * Strips tracking query parameters from the URL on page load, leaving
 * the address bar cleaner and the analytics tidier.
 *
 * WHY:
 * - Google Search Console appends `srsltid=...` to URLs when users click
 *   through from search results — ugly in the address bar, noisy in
 *   analytics. Google itself doesn't index `srsltid`, but stripping it
 *   client-side gives users a clean URL.
 * - Email marketing platforms (Mailchimp, etc.) append `mc_cid=...` and
 *   `mc_eid=...`.
 * - Ad platforms append click IDs (`gclid` Google Ads, `fbclid` Facebook,
 *   `msclkid` Microsoft, `ttclid` TikTok, `twclid` X, `yclid` Yahoo,
 *   `li_fat_id` LinkedIn, `igshid` Instagram).
 * - HubSpot appends `_hsenc` and `_hsmi`.
 * - UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, etc.) are
 *   used by Google Analytics — once GA has processed the hit (which
 *   happens on initial page load before this component runs), they're
 *   safe to strip.
 *
 * HOW:
 * - Runs once on mount via `useEffect(() => {}, [])`.
 * - Checks if any tracking param is present.
 * - If so, builds a clean URL (without the tracking params) and uses
 *   `history.replaceState()` to update the address bar WITHOUT triggering
 *   a navigation or page reload.
 * - Preserves all non-tracking query params (e.g. any future legitimate
 *   search params) and the hash fragment (e.g. `#section`).
 *
 * SERVER-SIDE:
 * - This component renders nothing server-side (returns `null`) — it's
 *   purely a client-side effect.
 * - SSR/SSG output is unchanged, so search engines see the same content.
 *
 * EDGE CASES:
 * - If a URL contains ONLY tracking params, the cleaned URL has no `?`
 *   at all (e.g. `/fr/calculatrice-taxi?srsltid=ABC` → `/fr/calculatrice-taxi`).
 * - If a URL contains tracking params + legitimate params, only the
 *   tracking params are stripped (e.g. `/page?id=123&utm_source=email`
 *   → `/page?id=123`).
 * - The hash is preserved (e.g. `/page#section?srsltid=ABC` → cleaned
 *   URL keeps `#section`).
 */

const TRACKING_PARAMS = [
  // Google Search Console Search Term ID
  "srsltid",

  // Urchin Tracking Module (UTM) — Google Analytics
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "utm_source_platform",
  "utm_creative_format",
  "utm_marketing_tactic",
  "gbraid",
  "wbraid",

  // Ad platform click IDs
  "gclid", // Google Ads
  "fbclid", // Facebook Ads
  "msclkid", // Microsoft / Bing Ads
  "ttclid", // TikTok Ads
  "twclid", // X / Twitter Ads
  "yclid", // Yahoo Ads
  "li_fat_id", // LinkedIn
  "igshid", // Instagram share

  // Email marketing platforms
  "mc_cid", // Mailchimp campaign ID
  "mc_eid", // Mailchimp email ID
  "vero_id", // Vero
  "cio_id", // Customer.io
  "pk_cid", // Piper kerman campaigns

  // HubSpot
  "_hsenc",
  "_hsmi",
  "hsCtaTracking",

  // Other marketing/analytics
  "spm", // Some Chinese platforms
  "yclid", // Yahoo
  "ref", // Generic referrer (sometimes tracking)
  "ref_src",
  "ref_url",
  "_ga", // Google Analytics 4 client ID
  "yrvid",
  "afftrack",
  "cio",
  "trk", // LinkedIn tracking
  "trkInfo",
  "oly_enc_id", // Olytics
  "oly_anon_id",
  "vero_conv", // Vero conversions
  "ICID", // some ad platforms
  "_branch_match_id", // Branch.io
];

export function UrlCleaner() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const params = url.searchParams;
    let changed = false;

    for (const param of TRACKING_PARAMS) {
      if (params.has(param)) {
        params.delete(param);
        changed = true;
      }
    }

    if (!changed) return;

    // Build the cleaned URL — preserve pathname, hash, and any remaining
    // (non-tracking) query params.
    const newSearch = params.toString();
    const newUrl = newSearch
      ? `${url.pathname}?${newSearch}${url.hash}`
      : `${url.pathname}${url.hash}`;

    // replaceState doesn't trigger a navigation or page reload — just
    // updates the address bar and the entry in browser history.
    window.history.replaceState(null, "", newUrl);
  }, []);

  return null;
}
