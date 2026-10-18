// scripts/submit-sitemap-to-gsc.mjs
//
// Submit the sitemap URL to Google Search Console via the Webmaster API.
// This is a DIFFERENT API than the Indexing API (which is for per-URL
// submission). The Webmaster API handles sitemaps + sites.
//
// One-time setup (in addition to the Indexing API enable from earlier):
//   - Enable the "Search Console API" (also called "Webmaster API") in
//     the same Google Cloud project (gsc-control-agent)
//   - The same service account is used — it's already a verified owner
//
// Authentication:
//   - Same service account JSON at /home/z/.service-account.json
//   - Different OAuth2 scope: webmasters (not indexing)
//   - Same JWT signing flow
//
// Endpoint:
//   POST https://www.googleapis.com/webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}
//   - siteUrl: URL-encoded site property (e.g. https%3A%2F%2Fbesttaxilaval.ca%2F)
//   - feedpath: URL-encoded sitemap URL (e.g. https%3A%2F%2Fbesttaxilaval.ca%2Fsitemap.xml)
//
// Response: 204 No Content on success (empty body). 4xx/5xx on error.

import crypto from "node:crypto";
import https from "node:https";
import { readFile } from "node:fs/promises";

const KEY_PATH =
  process.env.GOOGLE_SERVICE_ACCOUNT_PATH || "/home/z/.service-account.json";

const SITE_URL = "sc-domain:besttaxilaval.ca"; // Domain property in GSC
const SITEMAP_URL = "https://besttaxilaval.ca/sitemap.xml";

function signJwt(header, payload, privateKeyPem) {
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString(
    "base64url"
  );
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );
  const input = `${encodedHeader}.${encodedPayload}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(input);
  const signature = sign.sign(privateKeyPem, "base64url");
  return `${input}.${signature}`;
}

async function getAccessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  // IMPORTANT: scope is 'webmasters' (Search Console API), NOT 'indexing'
  const payload = {
    iss: key.client_email,
    scope: "https://www.googleapis.com/auth/webmasters",
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
        path: u.pathname + u.search,
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
            reject(
              new Error(
                `OAuth2 token exchange failed: HTTP ${res.statusCode} — ${data}`
              )
            );
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

async function submitSitemap(token) {
  // URL-encode the site URL and sitemap URL for the path segments
  const siteUrlEncoded = encodeURIComponent(SITE_URL);
  const sitemapUrlEncoded = encodeURIComponent(SITEMAP_URL);
  const path = `/webmasters/v3/sites/${siteUrlEncoded}/sitemaps/${sitemapUrlEncoded}`;

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "www.googleapis.com",
        path: path,
        method: "PUT", // GSC API uses PUT to submit a sitemap
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Content-Length": 0, // empty body — just metadata in path
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({ status: res.statusCode, body: data });
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function main() {
  console.log("📊 Submitting sitemap to Google Search Console");
  console.log(`   Sitemap URL: ${SITEMAP_URL}`);
  console.log(`   Site URL:    ${SITE_URL}`);
  console.log("");

  // 1. Load service account
  let key;
  try {
    const raw = await readFile(KEY_PATH, "utf8");
    key = JSON.parse(raw);
  } catch (e) {
    console.error(
      `❌ Could not load service account JSON from ${KEY_PATH}.\n` +
        `   Original error: ${e.message}`
    );
    process.exit(1);
  }
  console.log(`✓ Loaded service account: ${key.client_email}`);

  // 2. Authenticate with webmasters scope
  console.log(`\n🔐 Authenticating with Search Console API (webmasters scope)...`);
  let token;
  try {
    token = await getAccessToken(key);
    console.log(
      `✓ Got OAuth2 access token (first 30 chars: ${token.slice(0, 30)}...)`
    );
  } catch (e) {
    console.error(`\n❌ Auth failed: ${e.message}`);
    console.error(
      `\n   Likely cause: "Search Console API" (aka Webmaster API) is not\n` +
        `   enabled in your Google Cloud project. Enable it at:\n` +
        `   https://console.developers.google.com/apis/library\n\n` +
        `   Search for "Search Console API" → Enable.\n\n` +
        `   (This is a different API from the "Indexing API" you enabled earlier.)`
    );
    process.exit(1);
  }

  // 3. Submit the sitemap
  console.log(`\n📡 Submitting sitemap...`);
  const result = await submitSitemap(token);

  if (result.status === 204) {
    console.log(`\n✅ Sitemap submitted successfully!`);
    console.log(`   HTTP 204 No Content = Google accepted the submission.`);
    console.log(
      `\n📋 Next steps:\n` +
        `   - Check status in https://search.google.com/search-console\n` +
        `     → Sitemaps (left sidebar)\n` +
        `     → You should see "https://besttaxilaval.ca/sitemap.xml"\n` +
        `       with Status: Success and 510 discovered URLs\n` +
        `   - Google will now crawl URLs from the sitemap at its own pace\n` +
        `   - Indexing takes hours to weeks depending on URL priority`
    );
  } else {
    console.error(`\n❌ Submission failed: HTTP ${result.status}`);
    console.error(`   Response: ${result.body.slice(0, 500)}`);
    if (result.status === 403) {
      console.error(
        `\n   Likely cause: the service account isn't a verified owner\n` +
          `   of the besttaxilaval.ca property in Search Console. Add:\n` +
          `   ${key.client_email}\n` +
          `   as a verified owner in GSC → Settings → Users and permissions.`
      );
    } else if (result.status === 404) {
      console.error(
        `\n   Likely cause: the site property "${SITE_URL}" isn't registered\n` +
          `   in Search Console. Verify it at:\n` +
          `   https://search.google.com/search-console → Add property\n` +
          `   → URL prefix → enter "https://besttaxilaval.ca/"`
      );
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err.message);
  process.exit(1);
});
