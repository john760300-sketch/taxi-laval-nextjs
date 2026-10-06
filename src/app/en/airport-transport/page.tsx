import ServicePageEn from "@/components/ServicePageEn";
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
    },
  },
};

export default function AirportTransportPage() {
  return (
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
      faqs={[
        "How much does a taxi from Laval to YUL airport cost?",
        "Airport transfer Montréal-Trudeau from the North Shore",
        "Taxi for an early morning flight",
        "Fixed-price YUL airport shuttle",
      ]}
    />
  );
}
