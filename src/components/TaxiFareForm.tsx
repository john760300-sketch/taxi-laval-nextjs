"use client";

import { useState } from "react";
import { FareTable, type FareData } from "@/components/FareTable";

/**
 * Taxi Fare Form — form-based calculator (like Uber's).
 * Uses the same /api/fare endpoint as the chat agent.
 * No LLM needed — direct Mapbox routing + CTQ calculation.
 *
 * Time-only input (heure seulement) — no date picker.
 * Defaults to "now" if no time selected.
 */
export function TaxiFareForm({ lang = "fr" }: { lang?: "fr" | "en" }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [heure, setHeure] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fareData, setFareData] = useState<FareData | null>(null);

  const isFr = lang === "fr";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) return;

    setLoading(true);
    setError("");
    setFareData(null);

    try {
      // Build datetime from today's date + selected time (or now)
      let datetime: string | null = null;
      if (heure) {
        const today = new Date();
        const dateStr = today.toISOString().split("T")[0]; // YYYY-MM-DD
        datetime = `${dateStr}T${heure}`;
      }

      const res = await fetch("/api/fare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin: origin.trim(), destination: destination.trim(), datetime }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur");
      }

      const data = (await res.json()) as FareData;
      setFareData(data);
    } catch {
      setError(
        isFr
          ? "Impossible de calculer l'itinéraire. Vérifiez les adresses (ex. ajoutez « Laval, QC »)."
          : "Could not calculate route. Check the addresses (e.g. add 'Laval, QC')."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSwap() {
    const tmp = origin;
    setOrigin(destination);
    setDestination(tmp);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg"
      >
        <div className="space-y-4">
          {/* Origin */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#1e3a5f]">
              {isFr ? "📍 Départ (pickup)" : "📍 Pickup"}
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder={isFr ? "Ex. Chomedey, Laval, QC" : "e.g. Chomedey, Laval, QC"}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
              required
              autoComplete="off"
            />
          </div>

          {/* Swap button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSwap}
              className="rounded-full bg-slate-100 p-2 text-[#1e3a5f] transition hover:bg-slate-200"
              title={isFr ? "Inverser" : "Swap"}
            >
              ⇅
            </button>
          </div>

          {/* Destination */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#1e3a5f]">
              {isFr ? "🏁 Destination" : "🏁 Destination"}
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={isFr ? "Ex. Aéroport YUL, Dorval, QC" : "e.g. YUL Airport, Dorval, QC"}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
              required
              autoComplete="off"
            />
          </div>

          {/* Heure seulement (time only, no date) */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#1e3a5f]">
              {isFr ? "🕐 Heure de départ (optionnel)" : "🕐 Departure time (optional)"}
            </label>
            <select
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
            >
              <option value="">{isFr ? "Maintenant" : "Now"}</option>
              <option value="06:00">06:00 {isFr ? "(matin)" : "(morning)"}</option>
              <option value="08:00">08:00 {isFr ? "(heure de pointe)" : "(rush hour)"}</option>
              <option value="10:00">10:00</option>
              <option value="12:00">12:00 {isFr ? "(midi)" : "(noon)"}</option>
              <option value="14:00">14:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00 {isFr ? "(heure de pointe)" : "(rush hour)"}</option>
              <option value="18:00">18:00</option>
              <option value="20:00">20:00</option>
              <option value="22:00">22:00</option>
              <option value="23:00">23:00 {isFr ? "(nuit)" : "(night)"}</option>
              <option value="01:00">01:00 {isFr ? "(nuit)" : "(night)"}</option>
              <option value="03:00">03:00 {isFr ? "(nuit)" : "(night)"}</option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !origin.trim() || !destination.trim()}
            className="w-full rounded-lg bg-[#1e3a5f] py-3.5 text-sm font-semibold text-white transition hover:bg-[#152a47] disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading
              ? isFr
                ? "Calcul en cours…"
                : "Calculating…"
              : isFr
                ? "Calculer mon tarif →"
                : "Calculate my fare →"}
          </button>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Results */}
      {fareData && (
        <div className="mt-6">
          <FareTable data={fareData} />
        </div>
      )}
    </div>
  );
}
