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
        "taxi from Laval to Saint-Jérôme price",
        "transport from Chomedey to Centropolis",
        "taxi to Cité-de-la-Santé hospital",
        "shuttle to Place Bell",
      ]}
    />
  );
}
