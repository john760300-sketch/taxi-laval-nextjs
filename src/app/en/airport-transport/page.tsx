import ServicePageEn from "@/components/ServicePageEn";
import { SchemaOrg } from "@/components/SchemaOrg";
import {
  localBusinessSchema,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "TAXI CHOMEDEY | 🚖 #1 YUL Airport Transport from Laval, North Shore & Laurentians – 24/7",
  description:
    "🚖 #1 Montréal-Trudeau YUL airport transport from Laval, North Shore & Laurentians – TAXI CHOMEDEY gets you to the airport fast & safely 24/7. Book now! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/en/airport-transport",
    languages: {
      fr: "https://besttaxilaval.ca/fr/transport-aeroport",
      en: "https://besttaxilaval.ca/en/airport-transport",
        "x-default": "https://besttaxilaval.ca/en/airport-transport",
      },
  },
};

const faqs = [
  {
    q: "How much does a taxi from Laval to YUL airport cost?",
    a: "The official CTQ fare for a Laval (Chomedey) → Montréal-Trudeau Airport (YUL) trip is between $43 and $57 daytime (5am-11pm), $49 to $65 nighttime (11pm-5am), depending on the Laval neighborhood and traffic. Fare = ceil(CTQ day or night meter depending on time). [Calculate your exact fare →](/en/taxi-calculator) or call 514-239-6512. [See our detailed Laval → YUL article →](/en/blog/combien-coute-taxi-laval-aeroport-yul-2026)",
  },
  {
    q: "Airport transfer Montréal-Trudeau from the North Shore — which area?",
    a: "We serve the entire North Shore: Boisbriand, Saint-Eustache, Blainville, Terrebonne, Mascouche, Sainte-Thérèse — as well as Laval and the Laurentians (Saint-Jérôme, Mirabel, Mont-Tremblant). 24/7 YUL airport transfer service with live flight tracking (no fees for delays). [Calculate your fare from your city →](/en/taxi-calculator) or call 514-239-6512.",
  },
  {
    q: "Taxi for an early morning flight — how to book?",
    a: "For an early morning flight (5am-7am), book the night before. We have 50+ vehicles but peak slots fill fast. For an afternoon flight, you can call 30 minutes ahead — we almost always have a driver available in Laval. The fare is the same 24/7 (day rate 5am-11pm, night rate 11pm-5am with ~15% surcharge). [Calculate your fare →](/en/taxi-calculator) or call 514-239-6512.",
  },
  {
    q: "Fixed-price YUL airport shuttle — how does it work?",
    a: "Our fixed price for YUL airport transfer = max(UberX peak, ceil(CTQ day or night meter)). The customer never pays more than UberX peak, and we guarantee a minimum income for the driver. Cash payment = 3.4% discount (card terminal fee removed). Live flight tracking included — no fees for delays. [Calculate your fixed price →](/en/taxi-calculator) or call 514-239-6512.",
  },
];

export default function AirportTransportPage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          localBusinessSchema,
          serviceSchema({
            name: "YUL Airport Transport (Montréal-Trudeau)",
            description:
              "Complete transport service to Montréal Airport (YUL) with absolute punctuality for all flights. Live flight tracking — no extra charge for delays. 24/7 service throughout Laval, North Shore and Laurentians.",
            url: "https://besttaxilaval.ca/en/airport-transport",
            serviceType: "Airport taxi transport to Montréal-Trudeau (YUL)",
            areaServed: ["Laval", "North Shore", "Laurentians"],
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: "https://besttaxilaval.ca/en" },
            {
              name: "Airport Transport (YUL)",
              url: "https://besttaxilaval.ca/en/airport-transport",
            },
          ]),
        ]}
      />
      <ServicePageEn
        title="Transport to Montréal-Trudeau Airport (YUL) – Reliable 24/7 Service"
        subtitle="24-hour service – Call or email us for a free estimate"
        description="We offer a complete transport service to Montréal Airport (YUL), guaranteeing absolute punctuality for all your flights. Our professional drivers monitor traffic in real time to avoid congestion. We also track your flight status live: if your plane is delayed, your pickup time is automatically adjusted at no extra charge. Service available 24/7 throughout Laval, the North Shore and the Laurentians."
        features={[
          "Pickup at home or office 24/7",
          "Live flight tracking (no fees for delays)",
          "Recent, clean, comfortable and air-conditioned vehicles",
          "Secure payment by credit card, debit or cash",
          "Simplified round-trip booking",
          "Transparent flat rates",
        ]}
        routes={[
          "Laval – YUL (Approx. 25-35 min depending on traffic)",
          "Boisbriand / Blainville – YUL (Approx. 30-40 min)",
          "Saint-Jérôme – YUL (Approx. 50-60 min)",
          "Mont-Tremblant – YUL (Approx. 1h30-1h45)",
        ]}
        partnerships="Corporate service recommended and validated by many hotel complexes in Laval and the North Shore."
        priceLabel="Competitive Flat Rate"
        priceNote="Contact our dispatcher now for a fixed, guaranteed price for your trip."
        faqs={faqs}
        showAgent={true}
        welcomeMessage="Hello! I'm the virtual agent of Taxi Chomedey. Looking for a fixed, guaranteed fare to Montréal-Trudeau Airport (YUL)? Tell me your pickup address and I'll calculate your fare with free flight tracking."
      />
    </>
  );
}
