// scripts/list-gsc-sites.mjs
//
// List all Google Search Console properties that the service account
// has access to. Useful for debugging permission errors when trying
// to submit a sitemap via the Search Console (Webmaster) API.
//
// Usage:
//   GOOGLE_SERVICE_ACCOUNT_PATH=/home/z/.service-account.json \
//     node scripts/list-gsc-sites.mjs

import crypto from "node:crypto";
import https from "node:https";
import { readFile } from "node:fs/promises";

const KEY_PATH =
  process.env.GOOGLE_SERVICE_ACCOUNT_PATH || "/home/z/.service-account.json";

function signJwt(header, payload, privateKeyPem) {
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const input = `${encodedHeader}.${encodedPayload}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(input);
  const signature = sign.sign(privateKeyPem, "base64url");
  return `${input}.${signature}`;
}

async function getAccessToken(key, scope) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: key.client_email,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const header = { alg: "RS256", typ: "JWT", kid: key.private_key_id };
  const jwt = signJwt(header, payload, key.private_key);
  const body =
    "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=" +
    encodeURIComponent(jwt);
  return new Promise((resolve, reject) => {
    const u = new URL("https://oauth2.googleapis.com/token");
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
            return;
          }
          resolve(JSON.parse(data).access_token);
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function httpsGet(url, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function main() {
  console.log("📋 Listing Google Search Console properties for the service account\n");

  let key;
  try {
    key = JSON.parse(await readFile(KEY_PATH, "utf8"));
  } catch (e) {
    console.error(`❌ Could not load service account JSON: ${e.message}`);
    process.exit(1);
  }
  console.log(`✓ Loaded service account: ${key.client_email}\n`);

  // Get token with webmasters scope
  let token;
  try {
    token = await getAccessToken(key, "https://www.googleapis.com/auth/webmasters");
  } catch (e) {
    console.error(`❌ Auth failed: ${e.message}`);
    console.error("\n   Enable the 'Search Console API' at:");
    console.error("   https://console.developers.google.com/apis/library");
    process.exit(1);
  }
  console.log("✓ Got OAuth2 access token\n");

  // List sites
  const result = await httpsGet(
    "https://www.googleapis.com/webmasters/v3/sites",
    token
  );

  if (result.status !== 200) {
    console.error(`❌ Failed to list sites: HTTP ${result.status}`);
    console.error(`   Response: ${result.body.slice(0, 500)}`);
    process.exit(1);
  }

  const data = JSON.parse(result.body);
  if (!data.siteEntry || data.siteEntry.length === 0) {
    console.log("ℹ️  No Search Console properties found for this service account.");
    console.log("    Add the service account email as an owner in:");
    console.log("    https://search.google.com/search-console");
    console.log(`        → Settings → Users and permissions → Add user`);
    console.log(`        → Email: ${key.client_email}`);
    console.log("        → Permission: Owner");
    return;
  }

  console.log(`Found ${data.siteEntry.length} properties:\n`);
  for (const site of data.siteEntry) {
    console.log(`  • ${site.siteUrl}`);
    console.log(`    Permission level: ${site.permissionLevel}`);
  }
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
