import ServicePageEn from "@/components/ServicePageEn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "TAXI CHOMEDEY | 🚖 #1 Local & Regional Transport in Laval, North Shore & Laurentians – 24/7",
  description:
    "🚖 #1 Local & regional transport service in Laval, North Shore & Laurentians – TAXI CHOMEDEY, professional & fast drivers 24/7. Book now! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/en/local-transport",
    languages: {
      fr: "https://besttaxilaval.ca/fr/transport-local",
      en: "https://besttaxilaval.ca/en/local-transport",
    },
  },
};

export default function LocalTransportPage() {
  return (
    <ServicePageEn
      title="Local transport in Laval, North Shore and Laurentians – Taxi 24/7"
      description="Our local transport service offers fast, safe trips in all neighbourhoods of Laval as well as in North Shore and Laurentians towns. Our drivers know the shortcuts perfectly to get you to your destination quickly. Avoid congestion on highways 13, 15, 440 and 640 thanks to our deep knowledge of the area."
      features={[
        "Trips to shopping centres (Carrefour Laval, Centropolis)",
        "Transport to schools, CEGEPs and universities",
        "Shuttles for local events",
        "Service for people with reduced mobility",
        "24/7 service",
        "Perfect knowledge of shortcuts",
      ]}
      routes={[
        "Laval – Boisbriand (15 min)",
        "Laval – Saint-Jérôme (35 min)",
        "Laval – Mont-Tremblant (1h15)",
        "Place Bell shuttles",
        "Centropolis events",
      ]}
      partnerships="Agreements with Carrefour Laval, Centropolis, Cité-de-la-Santé Hospital, Place Bell"
      priceLabel="Competitive rates – Free estimate by phone"
      faqs={[
        {
          q: "Taxi from Laval to Saint-Jérôme — what's the price?",
          a: "The taxi fare from Laval to Saint-Jérôme = max(UberX peak, ceil(CTQ day or night meter depending on time)). As an indication: ~$110-159 daytime, $124-182 nighttime (depending on the Laval pickup point and traffic). [Calculate your exact fare →](/en/taxi-calculator) or call 514-239-6512.",
        },
        {
          q: "Transport from Chomedey to Centropolis — how much?",
          a: "Short intra-Laval trip. Fare = ceil(CTQ meter) — generally $20-35 depending on exact distance. [Calculate your fare →](/en/taxi-calculator) or call 514-239-6512.",
        },
        {
          q: "Taxi to Cité-de-la-Santé hospital — available?",
          a: "We regularly transport to Cité-de-la-Santé Hospital in Laval. Fare depends on distance from your pickup point. [Calculate your fare →](/en/taxi-calculator) or call 514-239-6512. For adapted medical transport (reduced mobility, medical appointment), [see our medical transport service →](/en/medical-transport).",
        },
        {
          q: "Shuttle to Place Bell (Laval Rocket games) — how to book?",
          a: "We transport to Place Bell (Laval Rocket arena) for events and games. Fare depends on distance from your pickup point. [Calculate your fare →](/en/taxi-calculator) or call 514-239-6512.",
        },
      ]}
    />
  );
}
