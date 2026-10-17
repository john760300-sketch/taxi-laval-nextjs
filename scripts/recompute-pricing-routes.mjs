// Recompute the PRICING_ROUTES table using CTQ meter ONLY (no Uber peak comparison).
// For each route, compute ceil(meterDay) and ceil(meterNight) for 3 trip profiles
// (light/typical/heavy traffic) and take the min-max range.

const RATES = {
  day:   { base: 4.1, perKm: 2.05, perMin: 0.77 },
  night: { base: 4.7, perKm: 2.35, perMin: 0.89 },
  levy: 1.05,
};

function ctqMeter(distanceKm, durationMin, rate) {
  const changeoverKmh = (rate.perMin * 60) / rate.perKm;
  const avgKmh = durationMin > 0 ? (distanceKm / durationMin) * 60 : 999;
  const distanceCost = distanceKm * rate.perKm;
  const timeCost = durationMin * rate.perMin;
  const useTime = avgKmh < changeoverKmh && timeCost > distanceCost;
  return rate.base + (useTime ? timeCost : distanceCost) + RATES.levy;
}

// CTQ-only price (no Uber comparison) — what the user wants for this table.
function ctqOnly(distanceKm, durationMin, isNight) {
  const meter = ctqMeter(distanceKm, durationMin, isNight ? RATES.night : RATES.day);
  return Math.ceil(meter);
}

const ROUTES = [
  { name: "Laval (Chomedey) → YUL",            trips: [[18,22],[22,27],[25,35]] },
  { name: "Laval (Sainte-Rose) → YUL",         trips: [[22,25],[27,32],[30,40]] },
  { name: "Laval → Centre-ville Montréal",      trips: [[12,18],[18,25],[25,35]] },
  { name: "Boisbriand → YUL",                   trips: [[35,35],[42,45],[50,55]] },
  { name: "Saint-Jérôme → YUL",                trips: [[50,45],[60,55],[75,70]] },
  { name: "Mont-Tremblant → YUL",              trips: [[120,80],[135,95],[150,110]] },
];

console.log("=".repeat(80));
console.log("RECOMPUTED PRICING_ROUTES — CTQ meter ONLY (no Uber comparison)");
console.log("=".repeat(80));
console.log("Route                               | Day range     | Night range");
console.log("-".repeat(80));
for (const r of ROUTES) {
  const dayPrices = r.trips.map(t => ctqOnly(t[0], t[1], false));
  const nightPrices = r.trips.map(t => ctqOnly(t[0], t[1], true));
  const dLow = Math.min(...dayPrices);
  const dHigh = Math.max(...dayPrices);
  const nLow = Math.min(...nightPrices);
  const nHigh = Math.max(...nightPrices);
  console.log(
    `${r.name.padEnd(35)} | $${String(dLow).padStart(3)}–$${String(dHigh).padStart(3)}     | $${String(nLow).padStart(3)}–$${String(nHigh).padStart(3)}`
  );
}
