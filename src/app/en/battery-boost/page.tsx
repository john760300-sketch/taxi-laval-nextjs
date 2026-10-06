import ServicePageEn from "@/components/ServicePageEn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "TAXI CHOMEDEY | 🚖 #1 Battery Boost Service in Laval, North Shore & Laurentians – 24/7",
  description:
    "🚖 #1 Battery boost service in Laval, North Shore & Laurentians – TAXI CHOMEDEY responds fast 24/7. Dead battery? Call us now! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/en/battery-boost",
    languages: {
      fr: "https://besttaxilaval.ca/fr/survoltage-batterie",
      en: "https://besttaxilaval.ca/en/battery-boost",
    },
  },
};

export default function BatteryBoostPage() {
  return (
    <ServicePageEn
      title="Battery boost service in Laval and North Shore – 24/7 response"
      description="Our boost service uses intelligent Boost Packs that regulate current to protect the sensitive electronics of modern vehicles. Fast response in under 15 minutes. Compatible with all vehicle types, including hybrids and electrics. Unlike traditional jumper cables that can cause irreversible damage, our current-regulation technology ensures a safe start for the onboard computer and electronic components."
      features={[
        "Safe for vehicle electronics",
        "Compatible with hybrid and electric vehicles",
        "24/7 service",
        "Response at home, work or on the road",
        "Current-regulation technology",
        "Guaranteed response in under 15 minutes",
      ]}
      routes={[
        "Home roadside assistance",
        "Workplace assistance",
        "Highways 13, 15, 440, 640",
        "North Shore and Laurentians roads",
      ]}
      partnerships="Agreement with CAA-Québec, recommended by several garages in Laval and Saint-Eustache"
      priceLabel="Flat rate – Contact us for a free estimate"
      faqs={[
        "how much does a battery boost cost in Laval",
        "hybrid car battery boost",
        "dead battery service 24h Saint-Jérôme",
        "battery assistance Mont-Tremblant winter",
      ]}
    />
  );
}
