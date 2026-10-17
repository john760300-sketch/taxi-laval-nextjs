// CTQ fare calculation logic — preserved from the original taxi-calculator project.
// All French wording kept (pointe = peak, heures de pointe = peak hours).

export const RATES = {
  day: {
    base: 4.1,
    perKm: 2.05,
    perMin: 0.77,
    label: "Jour (5h–23h)",
  },
  night: {
    base: 4.7,
    perKm: 2.35,
    perMin: 0.89,
    label: "Nuit (23h–5h)",
  },
  levy: 1.05,
} as const;

export const TERMINAL_FEE_RATE = 0.034; // 3.4 % terminal fee on card payments

export const HEURES_POINTE = [
  { start: 7, end: 9 },
  { start: 16, end: 19 },
] as const;

export type FareResult = {
  distanceKm: number;
  durationMin: number;
  rateType: string;
  baseFare: number;
  terminalFee: number;
  lockedPrice: number;
  creditPrice: number;
  cashPrice: number;
  estPointe: boolean;
  isNight: boolean;
  taxiDay: number;
  taxiNight: number;
  uberEstimate: string;
  lyftEstimate: string;
  meterEstimate: number;
  /** "taxi" (default) | "raccompagnement" (2× CTQ day meter, no UberX comparison) */
  serviceType?: "taxi" | "raccompagnement";
};

function ctqMeter(
  distanceKm: number,
  durationMin: number,
  rate: { base: number; perKm: number; perMin: number }
): number {
  // Changeover speed: below ~22.5 km/h the meter charges time only,
  // above it charges distance only — never both on the same stretch.
  const changeoverKmh = (rate.perMin * 60) / rate.perKm;
  const avgKmh = durationMin > 0 ? (distanceKm / durationMin) * 60 : 999;
  const distanceCost = distanceKm * rate.perKm;
  const timeCost = durationMin * rate.perMin;
  const useTime = avgKmh < changeoverKmh && timeCost > distanceCost;
  return rate.base + (useTime ? timeCost : distanceCost) + RATES.levy;
}

function rideshare(
  distanceKm: number,
  durationMin: number,
  flag: number,
  perKm: number,
  perMin: number,
  minimum: number,
  surge: number
): { low: number; high: number } {
  const typical = Math.max(
    minimum,
    flag + distanceKm * perKm + durationMin * perMin
  );
  return {
    low: Math.round(typical),
    high: Math.round(typical * surge),
  };
}

// Get the hour in Montreal timezone (America/Toronto handles DST automatically)
// Vercel serverless functions run in UTC by default, so we must convert.
// Using en-GB locale ensures 24h format (en-US might show AM/PM even with hour12=false)
function getMontrealHour(date: Date): number {
  const timeStr = date.toLocaleTimeString("en-GB", {
    timeZone: "America/Toronto",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return parseInt(timeStr.split(":")[0], 10);
}

// Get the day of week in Montreal timezone (0=Sunday, 6=Saturday)
function getMontrealDay(date: Date): number {
  const dayStr = date.toLocaleDateString("en-GB", {
    timeZone: "America/Toronto",
    weekday: "short",
  });
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days.indexOf(dayStr);
}

// Check if a datetime string has explicit timezone info (Z or +HH:MM).
// If absent, Vercel's Date constructor interprets it as UTC, which gives the
// WRONG Montreal hour — e.g. "2026-10-17T23:30" becomes UTC 23:30 = Montreal
// 19:30 (EDT), making isNightTime() incorrectly return false for a 23:30 trip.
const hasTimezoneInfo = (s: string): boolean =>
  /([zZ]|[+-]\d{2}:?\d{2})$/.test(s);

// Extract the hour directly from a no-timezone ISO-ish string like
// "2026-10-17T23:30" — returns the hour as a number, or null if no match.
function extractHourFromString(s: string): number | null {
  const m = s.match(/T(\d{2}):/);
  return m ? parseInt(m[1], 10) : null;
}

// Extract the day-of-week (0=Sun, 6=Sat) from a no-timezone ISO-ish string
// like "2026-10-17T23:30". We construct the date at UTC noon to avoid DST
// edge cases at midnight, then format the weekday in America/Toronto.
function extractDayOfWeekFromString(s: string): number | null {
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})[T ]/);
  if (!m) return null;
  const [, y, mo, d] = m;
  const dateUtcNoon = new Date(Date.UTC(+y, +mo - 1, +d, 12, 0, 0));
  if (Number.isNaN(dateUtcNoon.getTime())) return null;
  return getMontrealDay(dateUtcNoon);
}

function isNightTime(datetimeStr?: string | null): boolean {
  if (!datetimeStr) {
    // Default to current time
    return getMontrealHour(new Date()) >= 23 || getMontrealHour(new Date()) < 5;
  }

  // If the string has timezone info, parse normally and convert to Montreal hour
  if (hasTimezoneInfo(datetimeStr)) {
    const date = new Date(datetimeStr);
    if (Number.isNaN(date.getTime())) {
      const h = getMontrealHour(new Date());
      return h >= 23 || h < 5;
    }
    const h = getMontrealHour(date);
    return h >= 23 || h < 5;
  }

  // No timezone info — the LLM emitted something like "2026-10-17T23:30".
  // This is meant to be Montreal local time (the LLM is on a Quebec site, and
  // our raccompagnement prompt explicitly tells it to emit today's date at
  // 23:30). Extract the hour directly from the string instead of relying on
  // the Vercel-UTC interpretation.
  const hour = extractHourFromString(datetimeStr);
  if (hour === null) {
    const h = getMontrealHour(new Date());
    return h >= 23 || h < 5;
  }
  return hour >= 23 || hour < 5;
}

function estHeurePointe(datetimeStr?: string | null): boolean {
  let day: number;
  let hour: number;

  if (!datetimeStr) {
    const now = new Date();
    day = getMontrealDay(now);
    hour = getMontrealHour(now);
  } else if (hasTimezoneInfo(datetimeStr)) {
    const date = new Date(datetimeStr);
    if (Number.isNaN(date.getTime())) return false;
    day = getMontrealDay(date);
    hour = getMontrealHour(date);
  } else {
    // No timezone — extract day and hour directly (Montreal local time)
    const d = extractDayOfWeekFromString(datetimeStr);
    const h = extractHourFromString(datetimeStr);
    if (d === null || h === null) return false;
    day = d;
    hour = h;
  }

  if (day === 0 || day === 6) return false; // weekend
  return HEURES_POINTE.some((slot) => hour >= slot.start && hour < slot.end);
}

export function calculateFare(
  distanceKm: number,
  durationMin: number,
  datetimeStr?: string | null
): FareResult {
  const isNight = isNightTime(datetimeStr);
  const pointe = estHeurePointe(datetimeStr);
  const rate = isNight ? RATES.night : RATES.day;

  const meterDay = ctqMeter(distanceKm, durationMin, RATES.day);
  const meterNight = ctqMeter(distanceKm, durationMin, RATES.night);
  const meter = isNight ? meterNight : meterDay;

  // UberX & Lyft estimates (low = habituel, high = pointe / demande forte)
  const uber = rideshare(distanceKm, durationMin, 5.75, 1.15, 0.28, 8, 1.45);
  const lyft = rideshare(distanceKm, durationMin, 5.05, 1.05, 0.25, 7, 1.4);

  // Prix fixe = max(UberX pointe, compteur CTQ arrondi)
  //
  // Marketing rule (confirmed 2026-10-17): the prix fixe MUST equal the high
  // end of the UberX estimate interval (uber.high) whenever Uber peak
  // dominates the CTQ meter — i.e. for short/medium trips. Customers expect
  // to see exactly the UberX peak number from the "À comparer" section.
  //
  // Note: this means day and night prix fixe are identical for short/medium
  // trips (Uber peak doesn't differentiate time of day in our model). The
  // day-vs-night distinction is preserved via:
  //   - The gold "Prix fixe · Nuit" badge in the header
  //   - The "Taxi CTQ nuit (23h–5h)" row in the comparison section showing
  //     the higher night meter separately
  // For long trips where the CTQ night meter exceeds Uber peak, prix fixe
  // automatically switches to ceil(meterNight) — e.g. 45 km night trip
  // gives $112 (CTQ night) instead of $102 (Uber peak).
  const cardPrice = Math.max(uber.high, Math.ceil(meter));
  const cashPrice =
    Math.round((cardPrice / (1 + TERMINAL_FEE_RATE)) * 100) / 100;
  const terminalFee = Math.round((cardPrice - cashPrice) * 100) / 100;
  const baseFare = cashPrice;

  return {
    distanceKm: Number(distanceKm.toFixed(1)),
    durationMin: Math.round(durationMin),
    rateType: rate.label,
    baseFare,
    terminalFee,
    lockedPrice: cardPrice,
    creditPrice: cardPrice,
    cashPrice,
    estPointe: pointe,
    isNight,
    taxiDay: Math.round(meterDay * 100) / 100,
    taxiNight: Math.round(meterNight * 100) / 100,
    uberEstimate: `$${uber.low} – $${uber.high}`,
    lyftEstimate: `$${lyft.low} – $${lyft.high}`,
    meterEstimate: Math.round(meter),
    serviceType: "taxi",
  };
}

/**
 * Raccompagnement (designated driver in client's own car).
 *
 * Pricing rule (updated 2026-10-17 per user):
 *   - Detect day/night from trip datetime (default = now)
 *   - Day (5h–23h):   prix fixe = 2 × ceil(CTQ day meter)
 *   - Night (23h–5h): prix fixe = 2 × ceil(CTQ night meter)
 *   - Cash price = prix fixe / 1.034 (same 3.4 % terminal fee discount as taxi)
 *   - No UberX/Lyft comparison (those services don't apply here)
 *
 * Previously: always used day rate (per spec 2026-10-12). User changed the
 * rule on 2026-10-17 so night trips get the proper night surcharge.
 *
 * The driver drives the client's car home, with a chase car following
 * to bring the driver back. The 2× multiplier covers the round trip.
 */
export function calculateRaccompagnementFare(
  distanceKm: number,
  durationMin: number,
  datetimeStr?: string | null
): FareResult {
  const isNight = isNightTime(datetimeStr);
  const rate = isNight ? RATES.night : RATES.day;
  const meter = ctqMeter(distanceKm, durationMin, rate);
  const meterDay = ctqMeter(distanceKm, durationMin, RATES.day);
  const meterNight = ctqMeter(distanceKm, durationMin, RATES.night);

  // Prix raccompagnement = 2 × meter (rounded to nearest dollar at the end).
  // We use Math.round(meter * 2) instead of Math.ceil(meter) * 2 because:
  //   - For day trip with meter $46.81: round(46.81 × 2) = round($93.62) = $94 ✓ (same as ceil)
  //   - For night trip with meter $53.50: round(53.50 × 2) = round($107.00) = $107 ✓
  //   - ceil(53.50) × 2 = 54 × 2 = $108 — would be $1 too high vs what customers
  //     expect (53.50 × 2 = 107 exactly).
  // Rounding at the end (after ×2) is more accurate than ceiling before ×2.
  const cardPrice = Math.round(meter * 2);
  const cashPrice =
    Math.round((cardPrice / (1 + TERMINAL_FEE_RATE)) * 100) / 100;
  const terminalFee = Math.round((cardPrice - cashPrice) * 100) / 100;

  return {
    distanceKm: Number(distanceKm.toFixed(1)),
    durationMin: Math.round(durationMin),
    rateType: isNight ? "Raccompagnement (tarif nuit)" : "Raccompagnement (tarif jour)",
    baseFare: cashPrice,
    terminalFee,
    lockedPrice: cardPrice,
    creditPrice: cardPrice,
    cashPrice,
    estPointe: false, // Not relevant for raccompagnement pricing
    isNight,
    taxiDay: Math.round(meterDay * 100) / 100,
    taxiNight: Math.round(meterNight * 100) / 100,
    uberEstimate: "",
    lyftEstimate: "",
    meterEstimate: Math.round(meter),
    serviceType: "raccompagnement",
  };
}
