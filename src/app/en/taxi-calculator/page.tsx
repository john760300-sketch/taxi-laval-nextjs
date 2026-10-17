import type { Metadata } from "next";
import HeaderEn from "@/components/HeaderEn";
import FooterEn from "@/components/FooterEn";
import { TaxiFareForm } from "@/components/TaxiFareForm";
import { ChatAgent } from "@/components/ChatAgent";
import { SchemaOrg } from "@/components/SchemaOrg";
import {
  localBusinessSchema,
  fareAgentSchema,
  faqSchema,
  breadcrumbSchema,
  serviceSchema,
} from "@/lib/schema";
import { CtqLink } from "@/components/CtqLink";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Taxi Calculator — Calculate your ride price with Taxi, Uber and Lyft",
  description:
    "Laval taxi calculator: compare your ride price with Taxi (CTQ rate), Uber and Lyft. Fixed price aligned with UberX, no surge. 24/7 service in Laval, North Shore & Laurentians.",
  alternates: {
    canonical: "https://besttaxilaval.ca/en/taxi-calculator",
    languages: {
      fr: "https://besttaxilaval.ca/fr/calculatrice-taxi",
      en: "https://besttaxilaval.ca/en/taxi-calculator",
    },
  },
};

const SEO_FAQS = [
  {
    q: "How much does a taxi from Laval to YUL airport cost?",
    a: "Between $43 and $57 daytime (5am-11pm), $49 to $65 nighttime (11pm-5am), depending on the Laval neighborhood and traffic. Tariff = ceil(CTQ day or night meter depending on time). Cash payment = 3.4% discount.",
  },
  {
    q: "How is the taxi fare calculated?",
    a: "The fare follows the official CTQ rate: pickup ($4.10 day / $4.70 night) + levy ($1.05) + $2.05/km day ($2.35 night) or $0.77/min day ($0.89 night). Below 22.5 km/h, the meter charges time; above, distance. The fixed price = ceil(CTQ day or night meter depending on time).",
  },
  {
    q: "Can I pay cash?",
    a: "Yes. Cash payment gives you a 3.4% discount (card terminal fee removed). For example, a $60 card price becomes $58.03 in cash.",
  },
  {
    q: "Does the price change at night?",
    a: "Yes. The CTQ night rate (11pm-5am) is about 15% more expensive than day rate. Pickup goes from $4.10 to $4.70, per km from $2.05 to $2.35, per minute from $0.77 to $0.89.",
  },
  {
    q: "Is there a luggage surcharge?",
    a: "No. The CTQ rate has no luggage surcharge. Same price for 1 passenger with no luggage or 4 passengers with luggage.",
  },
  {
    q: "What area does the taxi calculator cover?",
    a: "The entire Laval region, North Shore (Boisbriand, Saint-Eustache, Blainville, Terrebonne, Mascouche, Sainte-Thérèse) and Laurentians (Saint-Jérôme, Mirabel, Mont-Tremblant). 30 cities served.",
  },
];

const PRICING_ROUTES = [
  { from: "Laval (Chomedey)", to: "YUL Airport (Dorval)", distance: "22 km", duration: "27 min", priceDay: "~$43-57", priceNight: "~$49-65" },
  { from: "Laval (Sainte-Rose)", to: "YUL Airport", distance: "27 km", duration: "32 min", priceDay: "~$51-67", priceNight: "~$58-77" },
  { from: "Laval", to: "Downtown Montreal", distance: "18 km", duration: "25 min", priceDay: "~$30-57", priceNight: "~$34-65" },
  { from: "Boisbriand", to: "YUL Airport", distance: "42 km", duration: "45 min", priceDay: "~$77-108", priceNight: "~$88-124" },
  { from: "Saint-Jérôme", to: "YUL Airport", distance: "60 km", duration: "55 min", priceDay: "~$108-159", priceNight: "~$124-182" },
  { from: "Mont-Tremblant", to: "YUL Airport", distance: "135 km", duration: "95 min", priceDay: "~$252-313", priceNight: "~$288-359" },
];

export default function CalculateFarePage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          localBusinessSchema,
          fareAgentSchema,
          serviceSchema({
            name: "Taxi Fare Calculator — Taxi Chomedey",
            description:
              "Real-time taxi fare calculator. Official regulated CTQ rate, no surge. 24/7 service in Laval, North Shore & Laurentians.",
            url: "https://besttaxilaval.ca/en/taxi-calculator",
            serviceType: "Taxi fare calculator",
            offers: [
              {
                name: "Taxi fare calculation",
                description: "Free calculation, no commitment. Official CTQ rate + UberX/Lyft comparison.",
                priceCurrency: "CAD",
                price: "0",
              },
            ],
          }),
          faqSchema(SEO_FAQS.map((f) => f.q)),
          breadcrumbSchema([
            { name: "Home", url: "https://besttaxilaval.ca/en" },
            { name: "Fare Calculator", url: "https://besttaxilaval.ca/en/taxi-calculator" },
          ]),
        ]}
      />
      <HeaderEn />
      <main>
        {/* Hero + Form */}
        <section className="bg-[#1e3a5f] py-12 text-white md:py-16">
          <div className="mx-auto max-w-4xl px-5">
            <div className="mb-8 text-center">
              <h1 className="mb-3 text-2xl font-bold leading-tight md:text-4xl">
                Taxi Calculator — Calculate your ride price with Taxi, Uber and Lyft
              </h1>
              <p className="mx-auto max-w-2xl text-sm text-white/80 md:text-base">
                Compare your ride price in real time: official Taxi CTQ rate,
                UberX and Lyft. Fixed price guaranteed, no surge. 24/7 service
                in Laval, North Shore &amp; Laurentians.
              </p>
            </div>
            <TaxiFareForm lang="en" />
          </div>
        </section>

        {/* SEO Content */}
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-5">
            <h2 className="mb-4 text-2xl font-bold text-[#1e3a5f]">
              How does our taxi calculator work?
            </h2>
            <p className="mb-4 leading-relaxed text-[#4a627a]">
              Our taxi fare calculator uses the official rate set by the
              Commission des transports du Québec (<CtqLink />). The calculation takes
              into account the actual route distance (via Mapbox, real-time
              traffic data), estimated duration, and departure time to
              determine the day rate (5am–11pm) or night rate (11pm–5am).
            </p>
            <p className="mb-4 leading-relaxed text-[#4a627a]">
              Our fixed price follows the official regulated <CtqLink /> rate. The
              formula: <strong>fixed price = ceil(CTQ day or night meter depending on time)</strong>.
              You pay the rate regulated by the Commission des transports du
              Québec, never any surge. Cash payment gives you a{" "}
              <strong>3.4% discount</strong> (card terminal fee removed).
            </p>

            {/* Pricing table */}
            <h2 className="mb-4 mt-10 text-2xl font-bold text-[#1e3a5f]">
              Taxi Fares Laval — Montréal (2026)
            </h2>
            <p className="mb-4 text-sm text-[#4a627a]">
              Indicative prices. The exact fare depends on the pickup
              neighborhood, traffic, and time. Use the calculator above for an
              exact price.
            </p>
            <div className="mb-8 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-[#1e3a5f] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Route</th>
                    <th className="px-4 py-3 text-left font-semibold">Distance</th>
                    <th className="px-4 py-3 text-left font-semibold">Duration</th>
                    <th className="px-4 py-3 text-right font-semibold">Day Price</th>
                    <th className="px-4 py-3 text-right font-semibold">Night Price</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_ROUTES.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f9f9f8]"}>
                      <td className="px-4 py-2.5 font-medium text-[#1e3a5f]">
                        {r.from} → {r.to}
                      </td>
                      <td className="px-4 py-2.5 text-[#4a627a]">{r.distance}</td>
                      <td className="px-4 py-2.5 text-[#4a627a]">{r.duration}</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-[#1e3a5f]">{r.priceDay}</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-slate-500">{r.priceNight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Why use our calculator */}
            <h2 className="mb-4 text-2xl font-bold text-[#1e3a5f]">
              Why use our taxi calculator?
            </h2>
            <div className="mb-8 grid gap-3 sm:grid-cols-2">
              {[
                { icon: "✓", text: "Fixed price guaranteed — no surprises" },
                { icon: "✓", text: "No surge — never inflated rates" },
                { icon: "✓", text: "Official CTQ rate (Commission des transports du Québec)" },
                { icon: "✓", text: "Aligned with UberX (peak)" },
                { icon: "✓", text: "Cash discount 3.4%" },
                { icon: "✓", text: "24/7 service in Laval, North Shore & Laurentians" },
                { icon: "✓", text: "Real-time traffic data (Mapbox)" },
                { icon: "✓", text: "UberX / Lyft comparison included" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-[#f9f9f8] px-4 py-2.5 text-sm text-[#4a627a]">
                  <span className="font-bold text-[#e6b422]">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <h2 className="mb-4 text-2xl font-bold text-[#1e3a5f]">
              Frequently Asked Questions
            </h2>
            <div className="mb-8 space-y-3">
              {SEO_FAQS.map((faq, i) => (
                <details key={i} className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-start justify-between gap-3 text-sm font-semibold text-[#1e3a5f]">
                      <span>{faq.q}</span>
                      <span className="text-[#e6b422] transition group-open:rotate-45">+</span>
                    </div>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-[#4a627a]">{faq.a}</p>
                </details>
              ))}
            </div>

            {/* Internal links */}
            <div className="rounded-xl bg-[#f9f9f8] p-6">
              <h3 className="mb-3 text-sm font-bold text-[#1e3a5f]">
                Learn more
              </h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/en/blog/combien-coute-taxi-laval-aeroport-yul-2026" className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white">
                  📝 How much is a taxi Laval → YUL?
                </Link>
                <Link href="/en/airport-transport" className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white">
                  ✈️ Airport transport YUL
                </Link>
                <Link href="/en/battery-boost" className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white">
                  🔋 Battery boost ($35-$80)
                </Link>
                <Link href="/en/door-unlocking" className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white">
                  🔑 Door unlocking ($35-$120)
                </Link>
                <Link href="/en/drive-home-service" className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white">
                  🚗 Drive-home service
                </Link>
                <Link href="/en/blog" className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white">
                  📖 All articles
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Chat agent (secondary option) */}
        <section className="bg-slate-50 py-12 md:py-16">
          <div className="mx-auto max-w-2xl px-5">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-2xl font-bold text-[#1e3a5f]">
                Prefer to chat with an agent?
              </h2>
              <p className="text-sm text-[#4a627a]">
                Chat with our virtual agent for a personalized quote — it can
                also calculate fares for battery boost, door unlocking, and
                drive-home service.
              </p>
            </div>
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
                <a href="tel:+15142396512" className="text-xs font-semibold text-[#e6b422] hover:underline">
                  514-239-6512
                </a>
              </div>
              <ChatAgent />
            </div>
          </div>
        </section>
      </main>
      <FooterEn />
    </>
  );
}
