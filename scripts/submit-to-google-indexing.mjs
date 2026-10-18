// scripts/submit-to-google-indexing.mjs
//
// Submit each URL from the sitemap to Google's Indexing API for faster indexing.
//
// WHAT THIS DOES:
//   1. Fetches the sitemap.xml from https://besttaxilaval.ca/sitemap.xml
//   2. Extracts all <loc> URLs (typically 100+ URLs: home, calculator, 8 service
//      pages × 2 languages, ~30 city landing pages × 2 languages, 3 blog articles
//      × 2 languages, sc/* sub-pages, etc.)
//   3. Authenticates with the Google Indexing API using a service account
//      JWT (signed with RSA-SHA256 using the private key from the JSON key file)
//   4. For each URL, POSTs to the Indexing API with type "URL_UPDATED"
//   5. Logs success/failure for each URL
//   6. Rate limits to 1 request per 350ms (Google allows 200/min, this is well under)
//
// CAVEAT — Indexing API official support:
//   Google's documentation officially supports the Indexing API only for
//   JobPosting and BroadcastEvent (live stream) schema types. For general
//   content (like a taxi website), Google's official recommendation is to
//   submit a sitemap in Google Search Console and use URL Inspection manually.
//
//   HOWEVER: many SEO professionals report that the Indexing API works for
//   any URL — Google processes the request and queues the URL for crawling
//   faster than waiting for organic discovery. Worst case: the API returns
//   200 OK but the URL is just queued without priority. Best case: Google
//   crawls within hours instead of days/weeks.
//
//   For the initial index of a new site (like besttaxilaval.ca), this script
//   can accelerate indexing significantly. For ongoing maintenance, rely on
//   the sitemap — Google auto-discovers new URLs from it.
//
// SETUP (one-time, manual — can't be automated):
//   1. Go to https://console.cloud.google.com
//   2. Create a new project (or use existing) — call it "besttaxilaval-indexing"
//   3. Enable the Indexing API for the project:
//      Search "Indexing API" in the cloud console → Enable
//   4. Create a service account:
//      IAM & Admin → Service Accounts → Create Service Account
//      - Name: "gsc-indexing"
//      - Role: don't assign any role (the service account only needs the
//              Indexing API permission, which is granted via the key)
//   5. Create a JSON key for the service account:
//      Click the service account → Keys → Add Key → Create New Key → JSON
//      A JSON file will download. Save it as `service-account.json`
//   6. Add the service account email as a verified owner in Google Search
//      Console:
//      a. Copy the `client_email` from the JSON file (e.g.
//         "gsc-indexing@besttaxilaval-indexing.iam.gserviceaccount.com")
//      b. Go to https://search.google.com/search-console
//      c. Select the besttaxilaval.ca property
//      d. Settings → Users and permissions → Add user
//      e. Paste the service account email → Permission: Owner → Add
//      f. The service account must also be a verified owner — if not
//         already verified, you'll need to verify domain ownership via
//         DNS TXT record (Google provides the value to add).
//
// USAGE:
//   GOOGLE_SERVICE_ACCOUNT_PATH=/path/to/service-account.json \
//     node scripts/submit-to-google-indexing.mjs
//
//   Or place service-account.json in the project root and just:
//     node scripts/submit-to-google-indexing.mjs
//
//   To re-run for a subset of URLs, set SITEMAP_FILTER env var:
//     SITEMAP_FILTER=/fr/ node scripts/submit-to-google-indexing.mjs
//     (only submits URLs matching the filter, e.g. only French URLs)
//
//   Dry-run mode (don't actually call the API):
//     DRY_RUN=1 node scripts/submit-to-google-indexing.mjs
//     (prints what it would submit without making API calls)

import crypto from "node:crypto";
import https from "node:https";
import { readFile } from "node:fs/promises";

const SITEMAP_URL = "https://besttaxilaval.ca/sitemap.xml";
const KEY_PATH =
  process.env.GOOGLE_SERVICE_ACCOUNT_PATH || "./service-account.json";
const FILTER = process.env.SITEMAP_FILTER || "";
const DRY_RUN = process.env.DRY_RUN === "1";

// ─── HTTP helpers (no external dependencies) ─────────────────────────────

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Follow redirects (301, 302, 307 Temporary, 308 Permanent)
      // Vercel uses 308 to redirect non-www → www
      if (
        [301, 302, 307, 308].includes(res.statusCode) &&
        res.headers.location
      ) {
        // Drain the redirect response body to free the socket
        res.resume();
        return resolve(httpsGet(res.headers.location));
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

function httpsPost(url, headers, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: "POST",
        headers: {
          ...headers,
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () =>
          resolve({ status: res.statusCode, body: data })
        );
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ─── JWT signing for Google OAuth2 service account auth ──────────────────

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
  const payload = {
    iss: key.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const header = { alg: "RS256", typ: "JWT", kid: key.private_key_id };
  const jwt = signJwt(header, payload, key.private_key);

  const body =
    "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=" +
    encodeURIComponent(jwt);
  const res = await httpsPost(
    "https://oauth2.googleapis.com/token",
    { "Content-Type": "application/x-www-form-urlencoded" },
    body
  );
  if (res.status !== 200) {
    throw new Error(
      `OAuth2 token exchange failed: HTTP ${res.status} — ${res.body}`
    );
  }
  const data = JSON.parse(res.body);
  return data.access_token;
}

// ─── Sitemap fetching + URL extraction ────────────────────────────────────

async function fetchSitemapUrls() {
  const xml = await httpsGet(SITEMAP_URL);
  const urls = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    const url = m[1].trim();
    if (!FILTER || url.includes(FILTER)) {
      urls.push(url);
    }
  }
  return urls;
}

// ─── Submit a single URL to the Indexing API ──────────────────────────────

async function submitUrl(url, token) {
  const body = JSON.stringify({
    url: url,
    type: "URL_UPDATED",
  });
  const res = await httpsPost(
    "https://indexing.googleapis.com/v3/urlNotifications:publish",
    {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body
  );
  if (res.status === 200) {
    const data = JSON.parse(res.body);
    return {
      ok: true,
      detail: data.urlNotificationMetadata?.latestNotifyResult
        ?.notifyTime || "queued",
    };
  }
  return { ok: false, error: `HTTP ${res.status}: ${res.body.slice(0, 200)}` };
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n📊 Google Indexing API submission`);
  console.log(`   Sitemap: ${SITEMAP_URL}`);
  console.log(`   Filter:  ${FILTER || "(none — all URLs)"}`);
  console.log(`   Mode:    ${DRY_RUN ? "DRY RUN (no API calls)" : "LIVE"}`);
  console.log("");

  // 1. Load service account (skip in dry-run mode)
  let key;
  if (DRY_RUN) {
    console.log(`\n(DRY RUN — skipping auth and API calls)\n`);
  } else {
    try {
      const raw = await readFile(KEY_PATH, "utf8");
      key = JSON.parse(raw);
    } catch (e) {
      console.error(
        `❌ Could not load service account JSON from ${KEY_PATH}.\n` +
          `   Set GOOGLE_SERVICE_ACCOUNT_PATH env var or place service-account.json\n` +
          `   in the project root.\n\n` +
          `   Original error: ${e.message}\n\n` +
          `   See script header comments for full setup instructions.\n\n` +
          `   Tip: run with DRY_RUN=1 to test sitemap fetching without auth.`
      );
      process.exit(1);
    }
    console.log(`✓ Loaded service account: ${key.client_email}`);
  }

  if (DRY_RUN) {
    const urls = await fetchSitemapUrls();
    console.log(`Would submit ${urls.length} URLs to Google Indexing API:`);
    console.log("");
    for (let i = 0; i < Math.min(urls.length, 20); i++) {
      console.log(`  ${urls[i]}`);
    }
    if (urls.length > 20) {
      console.log(`  ... and ${urls.length - 20} more (showing first 20 only)`);
    }
    console.log("");
    console.log(`To actually submit: provide service-account.json and re-run without DRY_RUN.`);
    return;
  }

  // 2. Authenticate
  console.log(`\n🔐 Authenticating with Indexing API...`);
  const token = await getAccessToken(key);
  console.log(`✓ Got OAuth2 access token (first 30 chars: ${token.slice(0, 30)}...)`);

  // 3. Fetch sitemap URLs
  console.log(`\n📡 Fetching sitemap...`);
  const urls = await fetchSitemapUrls();
  console.log(`✓ Found ${urls.length} URLs in sitemap\n`);

  // 4. Submit each URL
  let ok = 0;
  let fail = 0;
  const failures = [];
  console.log(`🚀 Submitting ${urls.length} URLs (350ms delay between each)...\n`);
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    process.stdout.write(
      `[${i + 1}/${urls.length}] ${url} ... `
    );
    try {
      const result = await submitUrl(url, token);
      if (result.ok) {
        ok++;
        console.log(`✓`);
      } else {
        fail++;
        failures.push({ url, error: result.error });
        console.log(`✗ ${result.error}`);
      }
    } catch (e) {
      fail++;
      failures.push({ url, error: e.message });
      console.log(`✗ ${e.message}`);
    }
    // Rate limit: 350ms = ~170 req/min (under Google's 200/min limit)
    if (i < urls.length - 1) await new Promise((r) => setTimeout(r, 350));
  }

  // 5. Summary
  console.log(`\n${"=".repeat(60)}`);
  console.log(`✓ Submitted: ${ok}`);
  console.log(`✗ Failed:    ${fail}`);
  console.log(`Total:      ${urls.length}`);
  if (failures.length > 0) {
    console.log(`\nFailures:`);
    for (const f of failures) console.log(`  ${f.url}: ${f.error}`);
  }
  console.log(`\nNext steps:`);
  console.log(`  - Check indexing status in https://search.google.com/search-console`);
  console.log(`  - Use URL Inspection on a few URLs to see Google's crawl queue`);
  console.log(`  - Re-run this script when new pages are added to the sitemap`);
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err.message);
  process.exit(1);
});
