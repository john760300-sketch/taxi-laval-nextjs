import { NextResponse } from "next/server";

/**
 * Geocode autocomplete endpoint — custom landmarks + Mapbox Geocoding API.
 *
 * Two-step search:
 * 1. Check custom Laval/Montreal landmarks (YUL, metro stations, Place Bell, etc.)
 *    — these are POIs that Mapbox's free geocoding doesn't find well
 * 2. Query Mapbox Geocoding API for streets, addresses, neighborhoods
 * 3. Merge results (landmarks first, then Mapbox results)
 */

// Custom landmarks with coordinates (Mapbox free tier doesn't find these POIs well)
const LANDMARKS: Array<{
  name: string;
  place_name: string;
  center: [number, number];
  keywords: string[];
}> = [
  {
    name: "Aéroport YUL",
    place_name: "Aéroport international Montréal-Trudeau, Dorval, QC",
    center: [-73.7407, 45.4708],
    keywords: ["yul", "aeroport", "aéroport", "airport", "trudeau", "montréal-trudeau", "montreal-trudeau", "dorval"],
  },
  {
    name: "Station Montmorency",
    place_name: "Station Montmorency, Laval, QC",
    center: [-73.6486, 45.5576],
    keywords: ["montmorency", "metro montmorency", "station montmorency"],
  },
  {
    name: "Place Bell",
    place_name: "Place Bell, Laval, QC",
    center: [-73.7495, 45.5689],
    keywords: ["place bell", "bell", "rocket", "laval rocket"],
  },
  {
    name: "Carrefour Laval",
    place_name: "Carrefour Laval, Laval, QC",
    center: [-73.7274, 45.5689],
    keywords: ["carrefour", "carrefour laval", "centre d'achat", "mall"],
  },
  {
    name: "Centropolis",
    place_name: "Centropolis, Laval, QC",
    center: [-73.7336, 45.5644],
    keywords: ["centropolis", "centro"],
  },
  {
    name: "Centre-ville Montréal",
    place_name: "Centre-ville, Montréal, QC",
    center: [-73.5673, 45.5017],
    keywords: ["centre-ville", "centre ville", "downtown", "downtown montreal", "centre-ville montréal"],
  },
  {
    name: "Hôpital Cité-de-la-Santé",
    place_name: "Hôpital de la Cité-de-la-Santé, Laval, QC",
    center: [-73.7280, 45.5726],
    keywords: ["cite de la sante", "cité de la santé", "hôpital", "hopital", "hospital", "santé"],
  },
  {
    name: "Festiween",
    place_name: "Festiween, 2888 Ave du Cosmodôme, Laval, QC",
    center: [-73.7619, 45.5577],
    keywords: ["festiween", "cosmodôme", "cosmodome"],
  },
  {
    name: "Gare Vimont",
    place_name: "Gare Vimont, Laval, QC",
    center: [-73.6846, 45.5926],
    keywords: ["gare vimont", "vimont", "train", "via rail"],
  },
  {
    name: "Gare Sainte-Rose",
    place_name: "Gare Sainte-Rose, Laval, QC",
    center: [-73.7349, 45.5554],
    keywords: ["gare sainte-rose", "gare ste-rose", "sainte-rose gare"],
  },
  {
    name: "Quartier Chomedey",
    place_name: "Chomedey, Laval, QC",
    center: [-73.7150, 45.5550],
    keywords: ["chomedey"],
  },
  {
    name: "Quartier Sainte-Rose",
    place_name: "Sainte-Rose, Laval, QC",
    center: [-73.7349, 45.5554],
    keywords: ["sainte-rose", "ste-rose"],
  },
  {
    name: "Quartier Fabreville",
    place_name: "Fabreville, Laval, QC",
    center: [-73.7850, 45.5750],
    keywords: ["fabreville"],
  },
  {
    name: "Quartier Duvernay",
    place_name: "Duvernay, Laval, QC",
    center: [-73.6550, 45.5750],
    keywords: ["duvernay"],
  },
  {
    name: "Quartier Pont-Viau",
    place_name: "Pont-Viau, Laval, QC",
    center: [-73.7050, 45.5700],
    keywords: ["pont-viau", "pont viau"],
  },
  {
    name: "Quartier Laval-des-Rapides",
    place_name: "Laval-des-Rapides, Laval, QC",
    center: [-73.6800, 45.5650],
    keywords: ["laval-des-rapides", "laval des rapides", "des-rapides"],
  },
  {
    name: "Quartier Vimont",
    place_name: "Vimont, Laval, QC",
    center: [-73.6846, 45.5926],
    keywords: ["vimont"],
  },
  {
    name: "Quartier Sainte-Dorothée",
    place_name: "Sainte-Dorothée, Laval, QC",
    center: [-73.8050, 45.5700],
    keywords: ["sainte-dorothee", "ste-dorothée", "sainte-dorothée"],
  },
  {
    name: "Quartier Auteuil",
    place_name: "Auteuil, Laval, QC",
    center: [-73.7550, 45.5900],
    keywords: ["auteuil"],
  },
  {
    name: "Quartier Saint-François",
    place_name: "Saint-François, Laval, QC",
    center: [-73.6300, 45.6050],
    keywords: ["saint-françois", "st-françois"],
  },
  {
    name: "Quartier Laval-Ouest",
    place_name: "Laval-Ouest, Laval, QC",
    center: [-73.8350, 45.5600],
    keywords: ["laval-ouest", "laval ouest"],
  },
  {
    name: "Quartier Saint-Vincent-de-Paul",
    place_name: "Saint-Vincent-de-Paul, Laval, QC",
    center: [-73.7250, 45.5850],
    keywords: ["saint-vincent-de-paul", "st-vincent", "saint-vincent"],
  },
  {
    name: "Quartier Îles-Laval",
    place_name: "Îles-Laval, QC",
    center: [-73.7450, 45.5350],
    keywords: ["îles-laval", "iles-laval", "iles laval"],
  },
];

function matchLandmarks(q: string) {
  const lower = q.toLowerCase().trim();
  if (lower.length < 2) return [];

  const matched = LANDMARKS.filter((l) =>
    l.keywords.some((kw) => {
      // Match if the query contains the keyword OR the keyword contains the query
      return lower.includes(kw) || kw.includes(lower);
    })
  );

  return matched.slice(0, 5).map((l) => ({
    place_name: l.place_name,
    center: l.center,
  }));
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  const limit = parseInt(url.searchParams.get("limit") || "5", 10);

  if (!q || q.length < 2) {
    return NextResponse.json({ features: [] });
  }

  // 1. Check custom landmarks first
  const landmarkResults = matchLandmarks(q);

  // 2. Query Mapbox for streets, addresses, neighborhoods
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  let mapboxResults: Array<{ place_name: string; center: [number, number] }> = [];

  if (token) {
    try {
      const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        q
      )}.json?access_token=${token}&country=ca&autocomplete=true&types=place,locality,neighborhood,address&language=fr&limit=${limit}&bbox=-74.5,45.0,-73.0,47.0`;

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
      }
    } catch {
      // silently fail — landmarks still work
    }
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
