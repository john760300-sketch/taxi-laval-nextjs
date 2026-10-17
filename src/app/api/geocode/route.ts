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
    name: "Station Cartier",
    place_name: "Station Cartier, Laval, QC",
    center: [-73.7117, 45.5697],
    keywords: ["cartier", "station cartier", "metro cartier", "cartier laval"],
  },
  {
    name: "Station De La Concorde",
    place_name: "Station De La Concorde, Laval, QC",
    center: [-73.6612, 45.5708],
    keywords: ["concorde", "de la concorde", "station concorde", "metro concorde"],
  },
  {
    name: "Station Longueuil–Université-de-Sherbrooke",
    place_name: "Station Longueuil–Université-de-Sherbrooke, Longueuil, QC",
    center: [-73.5261, 45.5404],
    keywords: ["longueuil", "longueuil-universite-de-sherbrooke", "longueuil universite", "station longueuil"],
  },
  {
    name: "Station Jean-Talon",
    place_name: "Station Jean-Talon, Montréal, QC",
    center: [-73.6129, 45.5386],
    keywords: ["jean-talon", "jean talon", "station jean-talon"],
  },
  {
    name: "Station Berri-UQAM",
    place_name: "Station Berri-UQAM, Montréal, QC",
    center: [-73.5618, 45.5087],
    keywords: ["berri", "berri-uqam", "berri uqam", "uqam", "station berri"],
  },
  {
    name: "Station Mont-Royal",
    place_name: "Station Mont-Royal, Montréal, QC",
    center: [-73.5782, 45.5117],
    keywords: ["mont-royal", "mount royal", "station mont-royal"],
  },
  {
    name: "Station Lionel-Groulx",
    place_name: "Station Lionel-Groulx, Montréal, QC",
    center: [-73.5842, 45.4911],
    keywords: ["lionel-groulx", "lionel groulx", "station lionel"],
  },
  {
    name: "Station Place-des-Arts",
    place_name: "Station Place-des-Arts, Montréal, QC",
    center: [-73.5672, 45.5089],
    keywords: ["place-des-arts", "place des arts", "station place-des-arts"],
  },
  {
    name: "Station McGill",
    place_name: "Station McGill, Montréal, QC",
    center: [-73.5703, 45.5073],
    keywords: ["mcgil", "mcgill", "station mcgill"],
  },
  {
    name: "Station Atwater",
    place_name: "Station Atwater, Montréal, QC",
    center: [-73.5833, 45.4872],
    keywords: ["atwater", "station atwater"],
  },
  {
    name: "Station Guy-Concordia",
    place_name: "Station Guy-Concordia, Montréal, QC",
    center: [-73.5760, 45.4965],
    keywords: ["guy-concordia", "guy concordia", "station guy", "concordia"],
  },
  {
    name: "Station Snowdon",
    place_name: "Station Snowdon, Montréal, QC",
    center: [-73.6179, 45.4706],
    keywords: ["snowdon", "station snowdon"],
  },
  {
    name: "Station Côte-Vertu",
    place_name: "Station Côte-Vertu, Montréal, QC",
    center: [-73.6839, 45.4924],
    keywords: ["cote-vertu", "côte-vertu", "station cote-vertu"],
  },
  {
    name: "Station Henri-Bourassa",
    place_name: "Station Henri-Bourassa, Montréal, QC",
    center: [-73.6670, 45.5564],
    keywords: ["henri-bourassa", "henri bourassa", "station henri-bourassa"],
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
