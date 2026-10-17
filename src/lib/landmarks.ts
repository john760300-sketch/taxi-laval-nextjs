/**
 * Shared landmark database for Laval / Montreal / Rive-Nord area.
 *
 * Used by:
 *   - src/app/api/geocode/route.ts  → autocomplete suggestions
 *   - src/lib/routing.ts            → exact coords for known POIs (avoids
 *                                     Mapbox geocoding returning wrong coords
 *                                     for "Station Cartier" etc.)
 *
 * Why this exists: Mapbox's free geocoding tier often matches landmark names
 * (e.g. "Station Cartier, Laval, QC") to wrong places — a street named Cartier
 * in a different neighborhood, sometimes 30+ km off. Routing from wrong coords
 * produces wildly inflated distances (45 km for a 23 km trip). For known
 * POIs we use exact coords from this list, bypassing Mapbox geocoding entirely.
 *
 * Coordinates sourced from Wikipedia / STM / STL official documentation.
 * Precision: ~30m (good enough for taxi routing).
 */

export type Landmark = {
  name: string;
  place_name: string;
  /** [lng, lat] — Mapbox convention (longitude first) */
  center: [number, number];
  keywords: string[];
};

export const LANDMARKS: Landmark[] = [
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

/**
 * Normalize a string for case-insensitive, accent-tolerant matching.
 * Converts to lowercase and strips common French accents so that
 * "Côte-Vertu" matches "cote-vertu".
 */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // strip combining diacritics
}

/**
 * Autocomplete matcher — returns up to 5 landmark suggestions whose
 * keywords match the query (substring either way).
 *
 * Used by /api/geocode for the address autocomplete dropdown.
 */
export function matchLandmarks(q: string): Array<{
  place_name: string;
  center: [number, number];
}> {
  const lower = normalize(q.trim());
  if (lower.length < 2) return [];

  const matched = LANDMARKS.filter((l) =>
    l.keywords.some((kw) => {
      const kwN = normalize(kw);
      return lower.includes(kwN) || kwN.includes(lower);
    })
  );

  return matched.slice(0, 5).map((l) => ({
    place_name: l.place_name,
    center: l.center,
  }));
}

/**
 * Exact-coords lookup for routing — if the user picked a landmark from
 * the autocomplete dropdown, the place_name string passed to /api/fare
 * will exactly match a landmark. Use the precise coords here instead
 * of re-geocoding via Mapbox (which can return wrong coords for POIs).
 *
 * Match strategy (in order of confidence):
 * 1. Exact place_name match (case-insensitive, accent-tolerant)
 * 2. Address contains the landmark's place_name (e.g. user typed extra context)
 * 3. Address matches a unique keyword (e.g. "uqam" → Berri-UQAM)
 *
 * Returns [lng, lat] or null if no landmark matches.
 */
export function findLandmarkCoords(address: string): [number, number] | null {
  const a = normalize(address.trim());
  if (!a) return null;

  // 1. Exact place_name match
  for (const l of LANDMARKS) {
    if (normalize(l.place_name) === a) return l.center;
  }

  // 2. Address contains a place_name (e.g. "Station Cartier, Laval, QC, Canada")
  for (const l of LANDMARKS) {
    const p = normalize(l.place_name);
    if (p && a.includes(p)) return l.center;
  }

  // 3. Address matches a unique keyword
  //    To avoid false positives (e.g. "bell" matching "Bell" street), only
  //    match keywords that are unique enough — keywords containing 5+ chars
  //    OR keywords that contain a hyphen/space (multi-word).
  for (const l of LANDMARKS) {
    for (const kw of l.keywords) {
      const kwN = normalize(kw);
      // Skip very short single-word keywords to prevent false positives
      if (kwN.length < 5 && !kwN.includes("-") && !kwN.includes(" ")) continue;
      if (a.includes(kwN)) return l.center;
    }
  }

  return null;
}
