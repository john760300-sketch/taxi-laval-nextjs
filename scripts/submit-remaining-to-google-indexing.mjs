// scripts/submit-remaining-to-google-indexing.mjs
//
// Smart re-run of the Google Indexing API submission — only submits URLs
// that haven't been successfully submitted in previous runs.
//
// Reads previous log files from /tmp/indexing-run-*.log to identify
// which URLs already succeeded (✓). Submits only the URLs that:
//   - haven't been submitted yet, OR
//   - failed in previous runs (✗)
//
// This avoids burning quota on URLs that have already been queued.
//
// Usage:
//   GOOGLE_SERVICE_ACCOUNT_PATH=/home/z/.service-account.json \
//     node scripts/submit-remaining-to-google-indexing.mjs
//
// To force re-submitting ALL URLs (ignore previous logs):
//   FORCE_ALL=1 GOOGLE_SERVICE_ACCOUNT_PATH=/home/z/.service-account.json \
//     node scripts/submit-remaining-to-google-indexing.mjs

import crypto from "node:crypto";
import https from "node:https";
import { readFile, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const SITEMAP_URL = "https://besttaxilaval.ca/sitemap.xml";
const KEY_PATH =
  process.env.GOOGLE_SERVICE_ACCOUNT_PATH || "/home/z/.service-account.json";
const LOG_DIR = "/home/z/my-project/scripts";
const LOG_PATTERN = /indexing-run.*\.log/;
const STATE_FILE = "/tmp/indexing-submitted-state.json";
const FORCE_ALL = process.env.FORCE_ALL === "1";
const DRY_RUN = process.env.DRY_RUN === "1";

// ─── HTTP + JWT helpers (same as submit-to-google-indexing.mjs) ──────────

function httpsGet(url) {
  return new Promise((resolve, reject) => {
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
}

function httpsPost(url, headers, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: "POST",
        headers: { ...headers, "Content-Length": Buffer.byteLength(body) },
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

function signJwt(header, payload, privateKeyPem) {
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
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
    throw new Error(`OAuth2 token exchange failed: HTTP ${res.status} — ${res.body}`);
  }
  return JSON.parse(res.body).access_token;
}

// ─── Sitemap + state management ─────────────────────────────────────────

async function fetchSitemapUrls() {
  const xml = await httpsGet(SITEMAP_URL);
  const urls = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    urls.push(m[1].trim());
  }
  return urls;
}

/**
 * Read all previous indexing-run log files AND the git-tracked
 * scripts/submitted-urls.json to find URLs that already succeeded (✓).
 * Returns a Set of URL strings that have already been successfully submitted.
 *
 * The JSON file is the PRIMARY source (git-tracked, survives sandbox resets).
 * Log files are a SECONDARY source (may be wiped by session resets).
 */
async function getAlreadySubmittedUrls() {
  const submitted = new Set();

  // 1. Read from the git-tracked JSON state file (persists across session resets)
  try {
    const json = JSON.parse(await readFile(`${LOG_DIR}/submitted-urls.json`, "utf8"));
    if (json.submittedUrls && Array.isArray(json.submittedUrls)) {
      for (const url of json.submittedUrls) {
        submitted.add(url);
      }
      console.log(`  (from submitted-urls.json: ${json.submittedUrls.length} URLs)`);
    }
  } catch (e) {
    // File doesn't exist yet — that's OK for first run
  }

  // 2. Also read from log files (may have additional URLs from this session)
  try {
    const files = await readdir(LOG_DIR);
    const logFiles = files.filter((f) => LOG_PATTERN.test(f));
    for (const file of logFiles) {
      const content = await readFile(`${LOG_DIR}/${file}`, "utf8");
      const lines = content.split("\n");
      for (const line of lines) {
        const match = line.match(/^\[\d+\/\d+\]\s+(\S+)\s+\.\.\.\s+✓$/);
        if (match) {
          submitted.add(match[1]);
        }
      }
    }
  } catch (e) {
    // No log files found — that's OK
  }

  return submitted;
}

// ─── Main ────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n📊 Google Indexing API — Smart Re-Run`);
  console.log(`   Sitemap: ${SITEMAP_URL}`);
  console.log(`   Mode:    ${DRY_RUN ? "DRY RUN" : FORCE_ALL ? "FORCE ALL" : "SUBMIT REMAINING ONLY"}`);
  console.log("");

  // 1. Load service account
  let key;
  if (!DRY_RUN) {
    try {
      key = JSON.parse(await readFile(KEY_PATH, "utf8"));
    } catch (e) {
      console.error(`❌ Could not load service account JSON from ${KEY_PATH}.\n` +
        `   Original error: ${e.message}`);
      process.exit(1);
    }
    console.log(`✓ Loaded service account: ${key.client_email}`);
  }

  // 2. Get already-submitted URLs (from previous logs)
  const alreadySubmitted = FORCE_ALL ? new Set() : await getAlreadySubmittedUrls();
  console.log(`✓ Already successfully submitted: ${alreadySubmitted.size} URLs (from previous runs)`);

  // 3. Fetch all sitemap URLs
  const allUrls = await fetchSitemapUrls();
  console.log(`✓ Found ${allUrls.length} URLs in sitemap`);

  // 4. Filter to URLs that haven't been submitted yet
  const remaining = allUrls.filter((url) => !alreadySubmitted.has(url));
  console.log(`✓ Remaining to submit: ${remaining.length} URLs (skipping ${alreadySubmitted.size} already done)\n`);

  if (remaining.length === 0) {
    console.log(`\n✅ All URLs already successfully submitted! Nothing to do.`);
    return;
  }

  if (DRY_RUN) {
    console.log(`\n(DRY RUN — would submit these ${remaining.length} URLs:)`);
    for (let i = 0; i < Math.min(remaining.length, 30); i++) {
      console.log(`  ${remaining[i]}`);
    }
    if (remaining.length > 30) console.log(`  ... and ${remaining.length - 30} more`);
    return;
  }

  // 5. Authenticate
  console.log(`\n🔐 Authenticating with Indexing API...`);
  const token = await getAccessToken(key);
  console.log(`✓ Got OAuth2 access token\n`);

  // 6. Submit each remaining URL
  let ok = 0;
  let fail = 0;
  const failures = [];
  console.log(`🚀 Submitting ${remaining.length} URLs (350ms delay between each)...\n`);
  for (let i = 0; i < remaining.length; i++) {
    const url = remaining[i];
    process.stdout.write(`[${i + 1}/${remaining.length}] ${url} ... `);
    try {
      const body = JSON.stringify({ url, type: "URL_UPDATED" });
      const res = await httpsPost(
        "https://indexing.googleapis.com/v3/urlNotifications:publish",
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body
      );
      if (res.status === 200) {
        ok++;
        alreadySubmitted.add(url); // Track for state file
        console.log("✓");
      } else {
        fail++;
        failures.push({ url, error: `HTTP ${res.status}` });
        console.log(`✗ HTTP ${res.status}`);
        // If we hit 429 (quota), stop early — no point retrying
        if (res.status === 429) {
          console.log(`\n⚠️  Quota exceeded (HTTP 429). Stopping early.`);
          console.log(`   ${remaining.length - i - 1} URLs not attempted this run.`);
          break;
        }
      }
    } catch (e) {
      fail++;
      failures.push({ url, error: e.message });
      console.log(`✗ ${e.message}`);
    }
    if (i < remaining.length - 1) await new Promise((r) => setTimeout(r, 350));
  }

  // 7. Summary
  console.log(`\n${"=".repeat(60)}`);
  console.log(`✓ Submitted this run: ${ok}`);
  console.log(`✗ Failed this run:    ${fail}`);
  console.log(`Total attempted:     ${ok + fail}`);
  console.log(`Already done before:  ${alreadySubmitted.size}`);
  console.log(`Total in sitemap:    ${allUrls.length}`);

  if (fail > 0 && failures.some((f) => f.error.includes("429"))) {
    console.log(`\n💡 Quota hit — wait 24h and re-run this script.`);
    console.log(`   It'll skip the ${alreadySubmitted.size} already-submitted URLs`);
    console.log(`   and only attempt the remaining ${allUrls.length - alreadySubmitted.size}.`);
  }

  // 8. Save updated state to git-tracked JSON file (survives session resets)
  if (ok > 0) {
    const stateJson = JSON.stringify({
      submittedUrls: [...alreadySubmitted].sort(),
      lastUpdated: new Date().toISOString(),
      totalSubmitted: alreadySubmitted.size,
    }, null, 2);
    try {
      await writeFile(`${LOG_DIR}/submitted-urls.json`, stateJson);
      console.log(`\n💾 Saved ${alreadySubmitted.size} submitted URLs to scripts/submitted-urls.json`);
      console.log(`   (git-tracked — survives sandbox session resets)`);
    } catch (e) {
      console.log(`\n⚠️  Could not save state file: ${e.message}`);
    }
  }
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err.message);
  process.exit(1);
});
