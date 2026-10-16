import { NextResponse } from "next/server";

/**
 * Geocode autocomplete endpoint — proxies to Mapbox Geocoding API.
 * Uses the server-side MAPBOX_ACCESS_TOKEN (never exposed to browser).
 *
 * Usage: GET /api/geocode?q=chomedey&limit=5
 * Returns: [{ "place_name": "Chomedey, Laval, QC, Canada", "center": [-73.7, 45.6] }, ...]
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  const limit = url.searchParams.get("limit") || "5";

  if (!q || q.length < 3) {
    return NextResponse.json({ features: [] });
  }

  const token = process.env.MAPBOX_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "MAPBOX_ACCESS_TOKEN not set" }, { status: 503 });
  }

  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    q
  )}.json?access_token=${token}&country=ca&autocomplete=true&types=place,locality,neighborhood,poi,address&language=fr&limit=${limit}&bbox=-74.5,45.0,-73.0,47.0`;

  try {
    const res = await fetch(mapboxUrl);
    if (!res.ok) {
      return NextResponse.json({ features: [] });
    }
    const data = await res.json();
    const features = (data.features || []).map((f: {
      place_name: string;
      text_fr?: string;
      center: [number, number];
    }) => ({
      place_name: f.place_name,
      center: f.center,
    }));
    return NextResponse.json({ features });
  } catch {
    return NextResponse.json({ features: [] });
  }
}
