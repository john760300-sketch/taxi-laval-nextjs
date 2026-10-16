"use client";

import { useState, useRef, useEffect } from "react";
import { FareTable, type FareData } from "@/components/FareTable";

/**
 * Taxi Fare Form — form-based calculator (like Uber's).
 *
 * Features:
 * - Address autocomplete (Mapbox Geocoding API via /api/geocode)
 * - Time picker (all hours + minutes, not just presets)
 * - Time is truly optional (empty = now)
 * - Swap button (⇅)
 * - Same /api/fare endpoint + FareTable component as the chat agent
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
      let datetime: string | null = null;
      if (heure) {
        const today = new Date();
        const dateStr = today.toISOString().split("T")[0];
        datetime = `${dateStr}T${heure}`;
      }

      const res = await fetch("/api/fare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: origin.trim(),
          destination: destination.trim(),
          datetime,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          (err as { error?: string }).error || "Erreur"
        );
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
          <AddressInput
            label={isFr ? "📍 Départ (pickup)" : "📍 Pickup"}
            placeholder={isFr ? "Commencez à taper une adresse…" : "Start typing an address…"}
            value={origin}
            onChange={setOrigin}
            isFr={isFr}
          />

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

          <AddressInput
            label={isFr ? "🏁 Destination" : "🏁 Destination"}
            placeholder={isFr ? "Commencez à taper une adresse…" : "Start typing an address…"}
            value={destination}
            onChange={setDestination}
            isFr={isFr}
          />

          {/* Time picker — all hours + minutes, truly optional */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#1e3a5f]">
              {isFr ? "🕐 Heure de départ (optionnel)" : "🕐 Departure time (optional)"}
            </label>
            <input
              type="time"
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
            />
            <p className="mt-1 text-xs text-slate-400">
              {isFr
                ? "Laissez vide pour « maintenant ». Détermine le tarif jour (5h–23h) ou nuit (23h–5h)."
                : "Leave empty for 'now'. Determines day (5am–11pm) or night (11pm–5am) rate."}
            </p>
          </div>

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

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {fareData && (
        <div className="mt-6">
          <FareTable data={fareData} />
        </div>
      )}
    </div>
  );
}

/**
 * Address input with autocomplete suggestions.
 * Calls /api/geocode as the user types (debounced 300ms).
 * Shows dropdown of suggestions from Mapbox Geocoding API.
 */
function AddressInput({
  label,
  placeholder,
  value,
  onChange,
  isFr,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  isFr: boolean;
}) {
  const [suggestions, setSuggestions] = useState<
    Array<{ place_name: string; center: [number, number] }>
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounced autocomplete — calls /api/geocode
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value || value.length < 3) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        const res = await fetch(
          `/api/geocode?q=${encodeURIComponent(value)}&limit=5`
        );
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.features || []);
          setShowSuggestions(true);
        }
      } catch {
        // silently fail — user can still type manually
      } finally {
        setLoadingSuggestions(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectSuggestion(placeName: string) {
    onChange(placeName);
    setShowSuggestions(false);
    setSuggestions([]);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <label className="mb-1.5 block text-sm font-semibold text-[#1e3a5f]">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (!showSuggestions && e.target.value.length >= 3) {
            setShowSuggestions(true);
          }
        }}
        onFocus={() => {
          if (suggestions.length > 0) setShowSuggestions(true);
        }}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
        required
        autoComplete="off"
      />

      {/* Autocomplete dropdown */}
      {showSuggestions && (suggestions.length > 0 || loadingSuggestions) && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg max-h-60 overflow-y-auto">
          {loadingSuggestions && (
            <div className="px-4 py-3 text-sm text-slate-400">
              {isFr ? "Recherche…" : "Searching…"}
            </div>
          )}
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => selectSuggestion(s.place_name)}
              className="flex w-full items-start gap-2 px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
            >
              <span className="text-[#e6b422] mt-0.5">📍</span>
              <span>{s.place_name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
