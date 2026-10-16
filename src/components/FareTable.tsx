"use client";

import { CtqLink } from "@/components/CtqLink";

export type FareData = {
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
  origin: string;
  destination: string;
  datetime: string;
  serviceType?: "taxi" | "raccompagnement";
};

/**
 * Fare table renderer — plain Tailwind, no UI library.
 * Matches besttaxilaval.ca color system (#1e3a5f navy, #e6b422 gold).
 *
 * Two modes:
 *   - "taxi" (default): full table with UberX/Lyft comparison rows
 *   - "raccompagnement": simplified table, no UberX/Lyft comparison,
 *     badge says "Raccompagnement", sub-line says "= 2 × tarif CTQ jour"
 */
export function FareTable({ data }: { data: FareData }) {
  const tripDate = new Date(data.datetime);
  const dateLabel = Number.isNaN(tripDate.getTime())
    ? "Maintenant"
    : tripDate.toLocaleString("fr-CA", {
        dateStyle: "medium",
        timeStyle: "short",
      });

  const isRaccompagnement = data.serviceType === "raccompagnement";

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
      {/* Header — main price (navy bg) */}
      <div className="border-b border-[#152a47] bg-[#1e3a5f] px-4 py-5 text-center text-white">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#e6b422]">
          {isRaccompagnement ? "Raccompagnement" : "Prix fixe"}
        </div>
        <div className="mt-1 text-4xl font-bold text-white">
          ${data.lockedPrice}
        </div>
        <div className="mt-1 text-xs text-slate-300">
          {isRaccompagnement
            ? "= 2 × tarif CTQ jour · Comptant −3,4 %"  // CTQ in data — not rendered as JSX
            : "= Prix aligné sur UberX (pointe)"}
        </div>
        <div className="mt-2 inline-block rounded-full bg-[#e6b422] px-3 py-1 text-[11px] font-semibold text-[#1e3a5f]">
          {isRaccompagnement
            ? "Raccompagnement · Tarif jour"
            : data.isNight
              ? "Prix fixe · Nuit"
              : "Prix fixe · Jour"}
          {!isRaccompagnement && data.estPointe ? " · Heure de pointe" : ""}
        </div>
      </div>

      {/* Trip summary */}
      <div className="border-b border-slate-100 bg-white px-4 py-3">
        <div className="mb-2 text-[11px] uppercase tracking-wider text-slate-500">
          Itinéraire
        </div>
        <div className="text-sm font-medium text-slate-900">
          {data.origin}
        </div>
        <div className="my-1 text-xs text-[#e6b422]">↓</div>
        <div className="text-sm font-medium text-slate-900">
          {data.destination}
        </div>
        <div className="mt-2 text-xs text-slate-500">{dateLabel}</div>
      </div>

      {/* Details — different label for raccompagnement vs taxi */}
      <div className="space-y-1.5 border-b border-slate-100 bg-white px-4 py-3 text-sm">
        <Row label="Distance" value={`${data.distanceKm} km`} />
        <Row label="Durée estimée" value={`${data.durationMin} min`} />
        {isRaccompagnement ? (
          <>
            <Row
              label={<span>Tarif jour <CtqLink /> (un trajet)</span>}
              value={`$${data.taxiDay.toFixed(2)}`}
            />
            <Row
              label="× 2 (aller + retour chauffeur)"
              value={`$${data.lockedPrice}`}
            />
          </>
        ) : (
          <Row
            label="Prix fixe (UberX pointe)"
            value={`$${data.creditPrice}`}
          />
        )}
        <Row
          label="Frais terminal (3,4 %)"
          value={`$${data.terminalFee.toFixed(2)}`}
        />
        <Row label="Prix comptant" value={`$${data.cashPrice}`} highlight />
      </div>

      {/* Comparison — only for taxi mode (raccompagnement has no UberX/Lyft equivalent) */}
      {!isRaccompagnement && (
        <div className="bg-slate-50 px-4 py-3">
          <div className="mb-2 text-[11px] uppercase tracking-wider text-slate-500">
            À comparer
          </div>
          <div className="space-y-1.5 text-sm">
            <Row
              label={
                <span>
                  Taxi <CtqLink /> {data.isNight ? "nuit (23h–5h)" : "jour (5h–23h)"}
                </span>
              }
              value={`$${(data.isNight ? data.taxiNight : data.taxiDay).toFixed(2)}`}
            />
            <Row label="UberX" value={data.uberEstimate} />
            <Row label="Lyft" value={data.lyftEstimate} />
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
            Taxi <CtqLink /> selon l&apos;heure d&apos;embarquement (jour 5h–23h / nuit
            23h–5h). Uber/Lyft : bas = habituel, haut = demande forte.
          </p>
        </div>
      )}

      {isRaccompagnement && (
        <div className="bg-slate-50 px-4 py-3">
          <p className="text-[11px] leading-relaxed text-slate-500">
            🚗 Raccompagnement : notre chauffeur vous ramène chez vous avec
            votre propre véhicule. Une voiture de poursuite suit pour récupérer
            le chauffeur. Le tarif 2× couvre l&apos;aller-retour. Paiement
            comptant = 3,4 % de remise (frais de terminal carte).
          </p>
        </div>
      )}

      {/* CTA — gold gradient matching the site header phone button */}
      <div className="border-t border-slate-100 bg-white px-4 py-3 text-center">
        <a
          href="tel:+15142396512"
          className="inline-block rounded-full bg-gradient-to-br from-[#e6b422] to-[#d4a017] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-[#d4a31f] hover:to-[#b8914a]"
        >
          📞 Réserver maintenant · 514-239-6512
        </a>
        <p className="mt-2 text-[11px] text-slate-400">
          Tarifs <CtqLink /> officiels · Service 24/7 · besttaxilaval.ca
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: React.ReactNode;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span
        className={`font-semibold tabular-nums ${
          highlight ? "text-base text-[#1e3a5f]" : "text-slate-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
