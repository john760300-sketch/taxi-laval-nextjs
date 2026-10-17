// Mapbox-based geocoding + routing.
// Free tier: 50k requests/month (covers taxi dispatcher usage easily).
//
// Token: stored in process.env.MAPBOX_ACCESS_TOKEN (server-side only).
// Add to .env.local for dev, set MAPBOX_ACCESS_TOKEN in Vercel/Cloudflare
// env vars UI for production.

import { findLandmarkCoords } from "@/lib/landmarks";

export type GeoPoint = { lat: number; lng: number };

export type RouteResult = {
  distanceKm: number;
  durationMin: number;
};

function getToken(): string {
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      "MAPBOX_ACCESS_TOKEN env var not set. Add it to .env.local for dev or set it in your deployment env vars UI."
    );
  }
  return token;
}

async function resolvePoint(address: string): Promise<GeoPoint | null> {
  // 1. Check custom landmarks FIRST. This bypasses Mapbox geocoding for
  //    known POIs (metro stations, malls, hospitals, YUL airport, etc.)
  //    Why: Mapbox's free geocoding frequently matches POI names like
  //    "Station Cartier, Laval, QC" to wrong places — a street named
  //    Cartier in a different neighborhood 30+ km away — producing
  //    wildly inflated routes (e.g. 45 km for a real 23 km trip).
  //    Our landmark coords are exact (~30m precision), sourced from
  //    Wikipedia / STM / STL official documentation.
  const landmark = findLandmarkCoords(address);
  if (landmark) {
    const [lng, lat] = landmark;
    return { lat, lng };
  }

  // 2. Fall back to Mapbox geocoding for unknown addresses (street names,
  //    civic numbers, neighborhoods not in our landmark DB)
  return geocodeAddress(address);
}

async function geocodeAddress(address: string): Promise<GeoPoint | null> {
  const token = getToken();
  // Mapbox geocoding with:
  // - country=ca (restrict to Canada)
  // - language=fr (French results for Quebec addresses)
  // - types=place,locality,neighborhood,poi,address (prefer area-level matches
  //   over street addresses — fixes "Centre-ville, Montréal" matching a street
  //   in Saint-Félicien instead of downtown Montréal)
  // - bbox (restrict to Quebec area: roughly 45-47°N, 73-74.5°W)
  //   prevents matching places in France or other "Laval"/"Montréal" duplicates
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${token}&country=ca&language=fr&limit=1&types=place,locality,neighborhood,poi,address&bbox=-74.5,45.0,-73.0,47.0`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Mapbox geocoding HTTP ${res.status} for "${address}"`);
      return null;
    }
    const data = (await res.json()) as {
      features?: Array<{
        center: [number, number]; // [lng, lat]
      }>;
    };
    if (!data.features?.length) return null;
    const [lng, lat] = data.features[0].center;
    if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
    return { lat, lng };
  } catch (err) {
    console.error("Mapbox geocode error:", err);
    return null;
  }
}

export async function routeBetween(
  origin: string,
  destination: string
): Promise<RouteResult | null> {
  const [o, d] = await Promise.all([
    resolvePoint(origin),
    resolvePoint(destination),
  ]);
  if (!o || !d) return null;

  const token = getToken();
  // Mapbox Directions API with the `driving` profile (NOT `driving-traffic`).
  //
  // Why `driving` over `driving-traffic`:
  //   - `driving-traffic` returns the route that's fastest WITH current live
  //     traffic. At peak hours it picks longer detours to avoid congestion —
  //     e.g. a 23 km trip shows as 45 km because it routes around traffic.
  //   - `driving` returns the typical shortest-time route based on the road
  //     network's normal speeds. Distance is stable and predictable, which
  //     is what a taxi fare calculator needs — customers expect the Google
  //     Maps distance, not a traffic-aware detour.
  //
  // We also request `alternatives=true` (up to 3 routes) and pick the
  // SHORTEST by distance — Mapbox's primary route is optimized for time,
  // not distance, so sometimes a slightly shorter route exists.
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${o.lng},${o.lat};${d.lng},${d.lat}?access_token=${token}&alternatives=true&annotations=distance,duration&language=fr&overview=false`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Mapbox directions HTTP ${res.status}`);
      return null;
    }
    const data = (await res.json()) as {
      code?: string;
      routes?: Array<{
        distance: number; // meters
        duration: number; // seconds
      }>;
    };
    if (data.code !== "Ok" || !data.routes?.length) return null;
    // Pick the SHORTEST route by distance (not duration) — for taxi fares
    // the customer expects the actual driving distance, not the fastest path.
    const shortest = data.routes.reduce((best, r) =>
      r.distance < best.distance ? r : best
    );
    return {
      distanceKm: shortest.distance / 1000,
      durationMin: shortest.duration / 60,
    };
  } catch (err) {
    console.error("Mapbox routing error:", err);
    return null;
  }
}
