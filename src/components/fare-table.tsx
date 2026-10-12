"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
};

export function FareTable({ data }: { data: FareData }) {
  const tripDate = new Date(data.datetime);
  const dateLabel = Number.isNaN(tripDate.getTime())
    ? "Maintenant"
    : tripDate.toLocaleString("fr-CA", {
        dateStyle: "medium",
        timeStyle: "short",
      });

  return (
    <Card className="border-slate-200 shadow-md overflow-hidden">
      <CardContent className="p-0">
        {/* Header — main price (navy bg, gold price) */}
        <div className="text-center px-4 py-5 bg-[#1e3a5f] text-white border-b border-[#152a47]">
          <div className="text-[11px] text-[#e6b422] font-semibold uppercase tracking-wider">
            Prix fixe
          </div>
          <div className="text-4xl font-bold text-white mt-1">
            ${data.lockedPrice}
          </div>
          <div className="text-xs text-slate-300 mt-1">
            = Prix aligné sur UberX (pointe)
          </div>
          <div className="inline-block mt-2 bg-[#e6b422] text-[#1e3a5f] text-[11px] font-semibold px-3 py-1 rounded-full">
            {data.isNight ? "Prix fixe · Nuit" : "Prix fixe · Jour"}
            {data.estPointe ? " · Heure de pointe" : ""}
          </div>
        </div>

        {/* Trip summary */}
        <div className="px-4 py-3 border-b border-slate-100 bg-white">
          <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">
            Itinéraire
          </div>
          <div className="text-sm text-slate-900 font-medium">
            {data.origin}
          </div>
          <div className="text-xs text-[#e6b422] my-1">↓</div>
          <div className="text-sm text-slate-900 font-medium">
            {data.destination}
          </div>
          <div className="text-xs text-slate-500 mt-2">{dateLabel}</div>
        </div>

        {/* Details */}
        <div className="px-4 py-3 space-y-1.5 text-sm border-b border-slate-100 bg-white">
          <Row label="Distance" value={`${data.distanceKm} km`} />
          <Row label="Durée estimée" value={`${data.durationMin} min`} />
          <Row label="Prix fixe (UberX pointe)" value={`$${data.creditPrice}`} />
          <Row
            label="Frais terminal (3,4 %)"
            value={`$${data.terminalFee.toFixed(2)}`}
          />
          <Row
            label="Prix comptant"
            value={`$${data.cashPrice}`}
            highlight
          />
        </div>

        {/* Comparison */}
        <div className="px-4 py-3 bg-slate-50">
          <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">
            À comparer
          </div>
          <div className="space-y-1.5 text-sm">
            <Row
              label={
                data.isNight ? "Taxi CTQ nuit (23h–5h)" : "Taxi CTQ jour (5h–23h)"
              }
              value={`$${(data.isNight ? data.taxiNight : data.taxiDay).toFixed(2)}`}
            />
            <Row label="UberX" value={data.uberEstimate} />
            <Row label="Lyft" value={data.lyftEstimate} />
          </div>
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Taxi CTQ selon l&apos;heure d&apos;embarquement (jour 5h–23h / nuit
            23h–5h). Uber/Lyft : bas = habituel, haut = demande forte.
          </p>
        </div>

        {/* CTA — gold-to-red gradient matching the site header phone button */}
        <div className="px-4 py-3 text-center border-t border-slate-100 bg-white">
          <a
            href="tel:+15142396512"
            className="inline-block bg-gradient-to-br from-[#e6b422] to-[#dc2626] hover:from-[#d4a31f] hover:to-[#b91c1c] text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all shadow-sm"
          >
            📞 Réserver maintenant · 514-239-6512
          </a>
          <p className="text-[11px] text-slate-400 mt-2">
            Tarifs CTQ officiels · Service 24/7 · besttaxilaval.ca
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-500">{label}</span>
      <span
        className={`font-semibold tabular-nums ${
          highlight ? "text-[#1e3a5f] text-base" : "text-slate-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
