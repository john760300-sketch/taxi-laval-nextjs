// Recompute the PRICING_ROUTES table by querying the live /api/fare endpoint.
// Run this script after fare.ts RATES change OR after Mapbox updates the
// underlying routing. Output: the 6 rows of the PRICING_ROUTES table.
//
// Usage:
//   node scripts/recompute-pricing-routes.mjs
//
// Each route is queried twice (day + night). Day = no datetime (defaults to
// current time = day for off-peak hours). Night = datetime "2026-10-17T23:30"
// (forces night tariff detection).

const API_URL = "https://besttaxilaval.ca/api/fare";

const ROUTES = [
  {
    name: "Laval (Chomedey) → Aéroport YUL",
    origin: "Chomedey, Laval, QC",
    destination: "Aéroport international Montréal-Trudeau, Dorval, QC",
  },
  {
    name: "Laval (Sainte-Rose) → Aéroport YUL",
    origin: "Sainte-Rose, Laval, QC",
    destination: "Aéroport international Montréal-Trudeau, Dorval, QC",
  },
  {
    name: "Laval → Centre-ville Montréal",
    origin: "Chomedey, Laval, QC",
    destination: "Centre-ville, Montréal, QC",
  },
  {
    name: "Boisbriand → Aéroport YUL",
    origin: "Boisbriand, QC",
    destination: "Aéroport international Montréal-Trudeau, Dorval, QC",
  },
  {
    name: "Saint-Jérôme → Aéroport YUL",
    origin: "Saint-Jérôme, QC",
    destination: "Aéroport international Montréal-Trudeau, Dorval, QC",
  },
  {
    name: "Mont-Tremblant → Aéroport YUL",
    // "Mont-Tremblant, QC" geocodes to a wrong location — use a known
    // landmark that Mapbox reliably resolves to the actual Mont-Tremblant.
    origin: "Casino de Mont-Tremblant",
    destination: "Aéroport international Montréal-Trudeau, Dorval, QC",
  },
];

function httpsGet(url) {
  // Reuse the same logic as submit-to-google-indexing.mjs — handles 308 redirect
  return new Promise((resolve, reject) => {
    import("node:https").then((https) => {
      https.get(url, (res) => {
        if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
          res.resume();
          return resolve(httpsGet(res.headers.location));
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      }).on("error", reject);
    });
  });
}

async function queryFare(origin, destination, datetime) {
  const body = JSON.stringify({ origin, destination, datetime });
  // POST request
  const https = await import("node:https");
  return new Promise((resolve, reject) => {
    const u = new URL(API_URL);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
          res.resume();
          // Re-query with the new URL (preserving the POST body)
          return resolve(queryFareAtUrl(res.headers.location, body));
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Invalid JSON: ${data.slice(0, 200)}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function queryFareAtUrl(url, body) {
  return new Promise((resolve, reject) => {
    import("node:https").then((https) => {
      const u = new URL(url);
      const req = https.request(
        {
          hostname: u.hostname,
          path: u.pathname,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body),
          },
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(new Error(`Invalid JSON: ${data.slice(0, 200)}`));
            }
          });
        }
      );
      req.on("error", reject);
      req.write(body);
      req.end();
    });
  });
}

async function main() {
  console.log("=".repeat(80));
  console.log("PRICING_ROUTES — querying live /api/fare for each route");
  console.log("=".repeat(80));
  console.log("Route                                  | Dist   | Day   | Night");
  console.log("-".repeat(80));

  for (const r of ROUTES) {
    const day = await queryFare(r.origin, r.destination, "");
    const night = await queryFare(r.origin, r.destination, "2026-10-17T23:30");
    console.log(
      `${r.name.padEnd(38)} | ${String(day.distanceKm).padStart(5)}km | $${String(day.lockedPrice).padStart(3)} | $${String(night.lockedPrice).padStart(3)}`
    );
  }
}

main().catch(console.error);
