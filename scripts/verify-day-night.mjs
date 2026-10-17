// Reproduce the day-vs-night same-price bug and verify the fix.
// Mirrors src/lib/fare.ts logic (before and after fix).

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
  return Math.round(Math.max(minimum, flag + distanceKm * perKm + durationMin * perMin) * surge);
}

// BEFORE FIX (current production)
function calcBefore(distanceKm, durationMin, isNight) {
  const meterDay = ctqMeter(distanceKm, durationMin, RATES.day);
  const meterNight = ctqMeter(distanceKm, durationMin, RATES.night);
  const meter = isNight ? meterNight : meterDay;
  const uberHigh = rideshareHigh(distanceKm, durationMin, 5.75, 1.15, 0.28, 8, 1.45);
  const cardPrice = Math.max(uberHigh, Math.ceil(meter));
  return cardPrice;
}

// AFTER FIX (add night surcharge to Uber peak)
function calcAfter(distanceKm, durationMin, isNight) {
  const meterDay = ctqMeter(distanceKm, durationMin, RATES.day);
  const meterNight = ctqMeter(distanceKm, durationMin, RATES.night);
  const meter = isNight ? meterNight : meterDay;
  const uberHigh = rideshareHigh(distanceKm, durationMin, 5.75, 1.15, 0.28, 8, 1.45);
  const nightSurcharge = Math.max(0, Math.ceil(meterNight) - Math.ceil(meterDay));
  const uberBaseline = isNight ? uberHigh + nightSurcharge : uberHigh;
  const cardPrice = Math.max(uberBaseline, Math.ceil(meter));
  return cardPrice;
}

const trips = [
  { name: "Courte (5 km, 10 min)",  distanceKm: 5,  durationMin: 10 },
  { name: "Moyenne (10 km, 18 min)", distanceKm: 10, durationMin: 18 },
  { name: "Cartier-YUL (23 km, 22 min)", distanceKm: 23, durationMin: 22 },
  { name: "Longue (45 km, 45 min)", distanceKm: 45, durationMin: 45 },
  { name: "Bouchon (8 km, 30 min)", distanceKm: 8,  durationMin: 30 },
];

console.log("=".repeat(78));
console.log("BEFORE FIX (current production): day vs night cardPrice");
console.log("=".repeat(78));
console.log("Trip                              | Day  | Night | Same?");
console.log("-".repeat(78));
for (const t of trips) {
  const day = calcBefore(t.distanceKm, t.durationMin, false);
  const night = calcBefore(t.distanceKm, t.durationMin, true);
  console.log(`${t.name.padEnd(33)} | $${String(day).padStart(3)} | $${String(night).padStart(3)}  | ${day === night ? "SAME BAD" : "different ok"}`);
}

console.log("\n" + "=".repeat(78));
console.log("AFTER FIX: night surcharge applied to Uber peak baseline");
console.log("=".repeat(78));
console.log("Trip                              | Day  | Night | Night > Day?");
console.log("-".repeat(78));
for (const t of trips) {
  const day = calcAfter(t.distanceKm, t.durationMin, false);
  const night = calcAfter(t.distanceKm, t.durationMin, true);
  console.log(`${t.name.padEnd(33)} | $${String(day).padStart(3)} | $${String(night).padStart(3)}  | ${night > day ? "yes ok" : "NO BAD"}`);
}
