import { NextResponse } from "next/server";
import { matchLandmarks } from "@/lib/landmarks";

/**
 * Geocode autocomplete endpoint — custom landmarks + Mapbox Geocoding API.
 *
 * Two-step search:
 * 1. Check custom Laval/Montreal landmarks (YUL, metro stations, Place Bell, etc.)
 *    — these are POIs that Mapbox's free geocoding doesn't find well
 * 2. Query Mapbox Geocoding API for streets, addresses, neighborhoods
 * 3. Merge results (landmarks first, then Mapbox results)
 */


export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  const limit = parseInt(url.searchParams.get("limit") || "5", 10);

  if (!q || q.length < 2) {
    return NextResponse.json({ features: [] });
  }

  // 1. Check custom landmarks first
  const landmarkResults = matchLandmarks(q);

  // 2. Query Mapbox for streets, addresses, neighborhoods, POIs (metro stations, malls, etc.)
  // Note: types MUST include "poi" so that metro stations, hospitals, malls,
  // schools etc. show up in autocomplete — without it, searching for
  // "station cartier" returns only streets named Cartier, never the metro.
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  let mapboxResults: Array<{ place_name: string; center: [number, number] }> = [];

  if (token) {
    try {
      const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        q
      )}.json?access_token=${token}&country=ca&autocomplete=true&types=place,locality,neighborhood,address,poi&language=fr&limit=${limit}&bbox=-74.5,45.0,-73.0,47.0`;

      const res = await fetch(mapboxUrl);
      if (res.ok) {
        const data = await res.json();
        mapboxResults = (data.features || []).map((f: {
          place_name: string;
          center: [number, number];
        }) => ({
          place_name: f.place_name,
          center: f.center,
        }));
      } else {
        // Mapbox returned an error — log it so it's visible in Vercel logs
        console.error(
          `[geocode] Mapbox API error: HTTP ${res.status} for query "${q}"`
        );
      }
    } catch (err) {
      // Network / parsing error — log it (was previously silent, which made
      // debugging impossible)
      console.error(`[geocode] Mapbox fetch failed for query "${q}":`, err);
    }
  } else {
    // Missing token is the #1 cause of "autocomplete doesn't find addresses"
    // complaints. Log it loudly so the issue surfaces in Vercel logs instead
    // of silently degrading to landmarks-only mode.
    console.warn(
      "[geocode] MAPBOX_ACCESS_TOKEN env var is not set — geocode will only return custom landmarks. Set it in Vercel Project Settings → Environment Variables."
    );
  }

  // 3. Merge: landmarks first, then Mapbox results (deduplicated by place_name)
  const seen = new Set<string>();
  const merged = [...landmarkResults, ...mapboxResults]
    .filter((r) => {
      const key = r.place_name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);

  return NextResponse.json({ features: merged });
}
