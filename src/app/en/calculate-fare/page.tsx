import type { Metadata } from "next";
import HeaderEn from "@/components/HeaderEn";
import FooterEn from "@/components/FooterEn";
import { ChatAgent } from "@/components/ChatAgent";
import { SchemaOrg } from "@/components/SchemaOrg";
import {
  localBusinessSchema,
  fareAgentSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Taxi Fare Calculator — Fixed & Guaranteed Price | Taxi Chomedey",
  description:
    "Get a fixed, guaranteed taxi fare by chat. Official CTQ rate, aligned with UberX, no surge. 24/7 service in Laval, North Shore & Laurentides.",
  alternates: {
    canonical: "https://besttaxilaval.ca/en/calculate-fare",
    languages: {
      fr: "https://besttaxilaval.ca/fr/calculer-prix",
      en: "https://besttaxilaval.ca/en/calculate-fare",
    },
  },
};

const TRUST_ITEMS = [
  { label: "Official CTQ rates" },
  { label: "24/7 service" },
  { label: "4.9/5 ⭐ · 850+ reviews" },
  { label: "No surge pricing" },
];

const AGENT_FAQS = [
  "How much does a taxi from Laval to YUL airport cost?",
  "How are taxi fares calculated in Laval?",
  "Can I pay my taxi in cash?",
  "What is the service area of Taxi Chomedey?",
  "Is taxi service available at night?",
];

// System prompt is in French; the agent always replies in French Québec.
// For full EN support, we'd add a parallel English system prompt in v2.
// For now, English visitors get the same French chat (common in Montréal).

export default function CalculateFarePage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          localBusinessSchema,
          fareAgentSchema,
          faqSchema(AGENT_FAQS),
          breadcrumbSchema([
            { name: "Home", url: "https://besttaxilaval.ca/en" },
            {
              name: "Calculate Fare",
              url: "https://besttaxilaval.ca/en/calculate-fare",
            },
          ]),
        ]}
      />
      <HeaderEn />
      <main className="flex min-h-[calc(100vh-160px)] flex-col bg-slate-50 py-8 md:py-12">
        <div className="mx-auto max-w-2xl px-5">
          {/* Hero */}
          <div className="mb-6 text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#1e3a5f]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1e3a5f]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e6b422]" />
              Price Agent · Taxi Chomedey
            </span>
            <h1 className="mb-2 text-2xl font-bold leading-tight text-[#1e3a5f] md:text-3xl">
              Get a fixed, guaranteed fare in 30 seconds
            </h1>
            <p className="mx-auto max-w-lg text-sm text-slate-600 md:text-base">
              Chat with our virtual agent. Tell us your pickup, destination
              and time — get an official CTQ fare, aligned with UberX, no
              surge.
            </p>
          </div>

          {/* Chat container */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between bg-[#1e3a5f] px-4 py-3 text-white">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#e6b422]" />
                  Price Agent · Taxi Chomedey
                </div>
                <div className="mt-0.5 text-[11px] text-slate-300">
                  Fixed &amp; guaranteed · Aligned with UberX
                </div>
              </div>
              <a
                href="tel:+15142396512"
                className="text-xs font-semibold text-[#e6b422] hover:underline"
              >
                514-239-6512
              </a>
            </div>
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
      <FooterEn />
    </>
  );
}
