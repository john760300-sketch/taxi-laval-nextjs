// Mapbox-based geocoding + routing.
// Free tier: 50k requests/month (covers taxi dispatcher usage easily).
// Uses live traffic data for accurate peak-hour trip times.
//
// Token: stored in process.env.MAPBOX_ACCESS_TOKEN (server-side only).
// Add to .env.local for dev, set MAPBOX_ACCESS_TOKEN in Vercel/Cloudflare
// env vars UI for production.

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
    geocodeAddress(origin),
    geocodeAddress(destination),
  ]);
  if (!o || !d) return null;

  const token = getToken();
  // Mapbox directions with driving-traffic profile (live traffic-aware durations)
  // URL format: /{lng},{lat};{lng},{lat}  (lng comes first!)
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${o.lng},${o.lat};${d.lng},${d.lat}?access_token=${token}&overview=false&annotations=distance,duration&language=fr`;

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
    const route = data.routes[0];
    return {
      distanceKm: route.distance / 1000,
      durationMin: route.duration / 60,
    };
  } catch (err) {
    console.error("Mapbox routing error:", err);
    return null;
  }
}
