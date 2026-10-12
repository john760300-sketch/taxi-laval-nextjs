import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChatAgent } from "@/components/ChatAgent";
import { SchemaOrg } from "@/components/SchemaOrg";
import {
  localBusinessSchema,
  fareAgentSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title:
    "Calculateur de Tarif Taxi — Prix fixe & garanti | Taxi Chomedey",
  description:
    "Calculez votre tarif taxi fixe et garanti par conversation. Tarif CTQ officiel, aligné sur UberX, sans surge. Service 24/7 à Laval, Rive-Nord & Laurentides.",
  alternates: {
    canonical: "https://besttaxilaval.ca/fr/calculer-prix",
    languages: {
      fr: "https://besttaxilaval.ca/fr/calculer-prix",
      en: "https://besttaxilaval.ca/en/calculate-fare",
    },
  },
};

const TRUST_ITEMS = [
  { label: "Tarifs CTQ officiels" },
  { label: "Service 24h/24 · 7j/7" },
  { label: "4.9/5 ⭐ · 850+ avis" },
  { label: "Sans surge" },
];

const AGENT_FAQS = [
  "Combien coûte un taxi de Laval à l'aéroport YUL ?",
  "Comment sont calculés les prix des taxis à Laval ?",
  "Puis-je payer mon taxi en argent comptant ?",
  "Quelle est la zone de service de Taxi Chomedey ?",
  "Le service de taxi est-il disponible la nuit ?",
];

export default function CalculerPrixPage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          localBusinessSchema,
          fareAgentSchema,
          faqSchema(AGENT_FAQS),
          breadcrumbSchema([
            { name: "Accueil", url: "https://besttaxilaval.ca/fr" },
            {
              name: "Calculer mon prix",
              url: "https://besttaxilaval.ca/fr/calculer-prix",
            },
          ]),
        ]}
      />
      <Header />
      <main className="flex min-h-[calc(100vh-160px)] flex-col bg-slate-50 py-8 md:py-12">
        <div className="mx-auto max-w-2xl px-5">
          {/* Hero */}
          <div className="mb-6 text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#1e3a5f]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1e3a5f]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e6b422]" />
              Agent Prix · Taxi Chomedey
            </span>
            <h1 className="mb-2 text-2xl font-bold leading-tight text-[#1e3a5f] md:text-3xl">
              Obtenez un prix fixe et garanti en 30 secondes
            </h1>
            <p className="mx-auto max-w-lg text-sm text-slate-600 md:text-base">
              Discutez avec notre agent virtuel. Dites-nous votre départ,
              votre destination et l&apos;heure — vous obtenez un tarif
              officiel CTQ, aligné sur UberX, sans surge.
            </p>
          </div>

          {/* Chat container */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            {/* Mini-header */}
            <div className="flex items-center justify-between bg-[#1e3a5f] px-4 py-3 text-white">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#e6b422]" />
                  Agent Prix · Taxi Chomedey
                </div>
                <div className="mt-0.5 text-[11px] text-slate-300">
                  Prix fixe &amp; garanti · Aligné sur UberX
                </div>
              </div>
              <a
                href="tel:+15142396512"
                className="text-xs font-semibold text-[#e6b422] hover:underline"
              >
                514-239-6512
              </a>
            </div>
            {/* Full-height chat */}
            <ChatAgent />
          </div>

          {/* Trust strip */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-600">
            {TRUST_ITEMS.map((t) => (
              <span key={t.label} className="flex items-center gap-1.5">
                <span className="font-bold text-[#e6b422]">✓</span>
                <span className="font-medium">{t.label}</span>
              </span>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
