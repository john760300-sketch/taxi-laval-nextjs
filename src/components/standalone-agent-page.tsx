"use client";

import { ChatAgent } from "@/components/chat-agent";

/**
 * Standalone agent page — what would live at `agent.besttaxilaval.ca`.
 * Full-page chat experience (no airport page chrome).
 *
 * Use cases:
 *   - Direct link in ads / SMS / Google Business Profile
 *   - When embedded on airport page via iframe, this is what loads with ?embed=1
 */

const TRUST_ITEMS = [
  { label: "Tarifs CTQ officiels" },
  { label: "Service 24h/24 · 7j/7" },
  { label: "4.9/5 ⭐ · 850+ avis" },
  { label: "Sans surge" },
];

export function StandaloneAgentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* === Header === */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="bg-[#1e3a5f] px-2.5 py-1.5 rounded font-bold text-[#e6b422] text-sm tracking-wider">
              TAXI
            </div>
            <span className="text-[#1e3a5f] font-semibold text-sm">
              CHOMEDEY
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="tel:+15142396512"
              className="bg-gradient-to-br from-[#e6b422] to-[#dc2626] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5"
            >
              📞 514-239-6512
            </a>
            <div className="flex gap-1 text-[11px]">
              <span className="bg-[#1e3a5f] text-white px-1.5 py-0.5 rounded">
                FR
              </span>
              <span className="text-[#1e3a5f] px-1.5 py-0.5">EN</span>
            </div>
          </div>
        </div>
      </header>

      {/* === Hero + Agent === */}
      <section className="flex-1 py-8 md:py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Hero — short, conversion-focused */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#1e3a5f]/10 text-[#1e3a5f] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              <span className="w-1.5 h-1.5 bg-[#e6b422] rounded-full animate-pulse" />
              Agent Prix · Taxi Chomedey
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-2 leading-tight">
              Obtenez un prix fixe et garanti en 30 secondes
            </h1>
            <p className="text-sm md:text-base text-slate-600 max-w-lg mx-auto">
              Discutez avec notre agent virtuel. Dites-nous votre départ,
              votre destination et l&apos;heure — vous obtenez un tarif
              officiel CTQ, aligné sur UberX, sans surge.
            </p>
          </div>

          {/* Chat container — the hero of the page */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
            {/* Mini-header for the agent */}
            <div className="bg-[#1e3a5f] text-white px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#e6b422] rounded-full animate-pulse"></span>
                  Agent Prix · Taxi Chomedey
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Prix fixe &amp; garanti · Aligné sur UberX
                </div>
              </div>
              <a
                href="tel:+15142396512"
                className="text-[#e6b422] text-xs font-semibold hover:underline"
              >
                514-239-6512
              </a>
            </div>
            {/* Full-height chat (no compact mode) */}
            <ChatAgent />
          </div>

          {/* Trust strip below chat */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-600">
            {TRUST_ITEMS.map((t) => (
              <span key={t.label} className="flex items-center gap-1.5">
                <span className="text-[#e6b422] font-bold">✓</span>
                <span className="font-medium">{t.label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* === Footer === */}
      <footer className="bg-white border-t border-slate-200 py-5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="bg-[#1e3a5f] px-2 py-1 rounded font-bold text-[#e6b422] text-xs tracking-wider">
              TAXI
            </div>
            <span className="text-[#1e3a5f] font-semibold text-xs">
              CHOMEDEY
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mb-1">
            #1 Service de taxi à Laval, Rive-Nord &amp; Laurentides · 24h/24
            7j/7
          </p>
          <p className="text-[11px] text-slate-400">
            © 2026 Taxi Chomedey (NEQ: 2276874064) ·{" "}
            <a
              href="https://besttaxilaval.ca"
              className="text-[#1e3a5f] font-medium hover:underline"
            >
              besttaxilaval.ca
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
