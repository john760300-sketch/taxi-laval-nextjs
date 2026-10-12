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

function isNightTime(datetimeStr?: string | null): boolean {
  let date = datetimeStr ? new Date(datetimeStr) : new Date();
  if (Number.isNaN(date.getTime())) date = new Date();
  const hour = date.getHours();
  return hour >= 23 || hour < 5;
}

function estHeurePointe(datetimeStr?: string | null): boolean {
  const date = datetimeStr ? new Date(datetimeStr) : new Date();
  if (Number.isNaN(date.getTime())) return false;
  const day = date.getDay();
  if (day === 0 || day === 6) return false; // weekend
  const hour = date.getHours();
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
 * Pricing rule (per user, 2026-10-12):
 *   - Always uses the CTQ DAY rate (no night detection)
 *   - Prix fixe = 2 × ceil(CTQ day meter)
 *   - Cash price = prix fixe / 1.034 (same 3.4 % terminal fee discount as taxi)
 *   - No UberX/Lyft comparison (those services don't apply here)
 *
 * The driver drives the client's car home, with a chase car following
 * to bring the driver back. The 2× multiplier covers the round trip.
 */
export function calculateRaccompagnementFare(
  distanceKm: number,
  durationMin: number
): FareResult {
  const rate = RATES.day; // Force day rate always
  const meter = ctqMeter(distanceKm, durationMin, rate);

  const cardPrice = Math.ceil(meter) * 2;
  const cashPrice =
    Math.round((cardPrice / (1 + TERMINAL_FEE_RATE)) * 100) / 100;
  const terminalFee = Math.round((cardPrice - cashPrice) * 100) / 100;

  return {
    distanceKm: Number(distanceKm.toFixed(1)),
    durationMin: Math.round(durationMin),
    rateType: "Raccompagnement (tarif jour)",
    baseFare: cashPrice,
    terminalFee,
    lockedPrice: cardPrice,
    creditPrice: cardPrice,
    cashPrice,
    estPointe: false, // Not relevant — fixed day rate
    isNight: false, // Always day rate
    taxiDay: Math.round(meter * 100) / 100,
    taxiNight: 0, // Not applicable
    uberEstimate: "",
    lyftEstimate: "",
    meterEstimate: Math.round(meter),
    serviceType: "raccompagnement",
  };
}
