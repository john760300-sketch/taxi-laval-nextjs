// Recompute the PRICING_ROUTES table based on the ACTUAL fare.ts logic.
// For each route, try several trip profiles (shortest / midpoint / longest
// plausible distance for that route) and produce an indicative price range.

const RATES = {
  day:   { base: 4.1, perKm: 2.05, perMin: 0.77 },
  night: { base: 4.7, perKm: 2.35, perMin: 0.89 },
  levy: 1.05,
};
const TERMINAL_FEE_RATE = 0.034;

function ctqMeter(distanceKm, durationMin, rate) {
  const changeoverKmh = (rate.perMin * 60) / rate.perKm;
  const avgKmh = durationMin > 0 ? (distanceKm / durationMin) * 60 : 999;
  const distanceCost = distanceKm * rate.perKm;
  const timeCost = durationMin * rate.perMin;
  const useTime = avgKmh < changeoverKmh && timeCost > distanceCost;
  return rate.base + (useTime ? timeCost : distanceCost) + RATES.levy;
}
function rideshareHigh(distanceKm, durationMin, flag, perKm, perMin, minimum, surge) {
  const typical = Math.max(minimum, flag + distanceKm * perKm + durationMin * perMin);
  return Math.round(typical * surge);
}
function prixFixe(distanceKm, durationMin, isNight) {
  const meterDay = ctqMeter(distanceKm, durationMin, RATES.day);
  const meterNight = ctqMeter(distanceKm, durationMin, RATES.night);
  const meter = isNight ? meterNight : meterDay;
  const uberHigh = rideshareHigh(distanceKm, durationMin, 5.75, 1.15, 0.28, 8, 1.45);
  return Math.max(uberHigh, Math.ceil(meter));
}

// Each route = name + array of (distanceKm, durationMin) trip profiles spanning
// the plausible range for that route (light traffic / typical / heavy traffic).
const ROUTES = [
  {
    name: "Laval (Chomedey) → YUL",
    trips: [
      [18, 22],   // light traffic, short
      [22, 27],   // typical
      [25, 35],   // heavy traffic
    ],
  },
  {
    name: "Laval (Sainte-Rose) → YUL",
    trips: [
      [22, 25],
      [27, 32],
      [30, 40],
    ],
  },
  {
    name: "Laval → Downtown Montréal",
    trips: [
      [12, 18],
      [18, 25],
      [25, 35],
    ],
  },
  {
    name: "Boisbriand → YUL",
    trips: [
      [35, 35],
      [42, 45],
      [50, 55],
    ],
  },
  {
    name: "Saint-Jérôme → YUL",
    trips: [
      [50, 45],
      [60, 55],
      [75, 70],
    ],
  },
  {
    name: "Mont-Tremblant → YUL",
    trips: [
      [120, 80],
      [135, 95],
      [150, 110],
    ],
  },
];

console.log("=".repeat(80));
console.log("RECALCULATED PRICING_ROUTES — based on actual fare.ts logic");
console.log("=".repeat(80));
console.log("Route                               | Day range       | Night range");
console.log("-".repeat(80));
const results = [];
for (const r of ROUTES) {
  const dayPrices = r.trips.map(t => prixFixe(t[0], t[1], false));
  const nightPrices = r.trips.map(t => prixFixe(t[0], t[1], true));
  const dayLow = Math.min(...dayPrices);
  const dayHigh = Math.max(...dayPrices);
  const nightLow = Math.min(...nightPrices);
  const nightHigh = Math.max(...nightPrices);
  console.log(
    `${r.name.padEnd(35)} | $${String(dayLow).padStart(3)}–$${String(dayHigh).padStart(3)}       | $${String(nightLow).padStart(3)}–$${String(nightHigh).padStart(3)}`
  );
  results.push({ name: r.name, dayLow, dayHigh, nightLow, nightHigh });
}
console.log("");

// Also compute the FAQ answer #1 example: Laval → YUL airport typical trip
console.log("=== FAQ Answer #1 example: Laval→YUL typical trip ===");
const example = prixFixe(22, 27, false);
const exampleNight = prixFixe(22, 27, true);
console.log(`  Day:   $${example}`);
console.log(`  Night: $${exampleNight}`);

// Cash discount example: $60 → $58.03 (calculator). The blog/FAQ says $57.97
console.log("");
console.log("=== Cash discount example verification ===");
console.log(`  $60 card → $${(60 / 1.034).toFixed(2)} cash (calculator)`);
console.log(`  $57 card → $${(57 / 1.034).toFixed(2)} cash (calculator)`);
console.log(`  $64 card → $${(64 / 1.034).toFixed(2)} cash (calculator)`);
