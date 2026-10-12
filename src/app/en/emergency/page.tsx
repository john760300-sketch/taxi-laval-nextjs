import ServicePageEn from "@/components/ServicePageEn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "TAXI CHOMEDEY | 🚨 Emergency & Roadside Assistance 24/7 in Laval, North Shore & Laurentians",
  description:
    "🚨 Emergency taxi and roadside assistance 24/7 in Laval, North Shore & Laurentians. Battery boost, door unlocking, urgent transport. Call TAXI CHOMEDEY now! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/en/emergency",
    languages: {
      fr: "https://besttaxilaval.ca/fr/urgence",
      en: "https://besttaxilaval.ca/en/emergency",
    },
  },
};

export default function EmergencyPage() {
  return (
    <ServicePageEn
      title="🚨 Emergency & Roadside Assistance 24/7"
      description="Need a fast response? TAXI CHOMEDEY is available 24/7 for all your emergencies: dead battery, locked keys, urgent transport or roadside assistance. Our teams respond quickly throughout Laval, the North Shore and the Laurentians."
      features={[
        "Express response 24/7",
        "Safe battery boost",
        "Damage-free door unlocking",
        "Urgent transport",
        "Available on holidays and nights",
        "Experienced, equipped drivers",
      ]}
      routes={[
        "Laval and all its sectors",
        "Full North Shore",
        "Laurentians and surroundings",
        "Highways 13, 15, 440, 640",
      ]}
      partnerships="Roadside assistance partner for individuals and businesses in the region"
      priceLabel="Emergency rate – Call now"
      priceNote="Our dispatcher gives you an immediate estimate"
      faqs={[
        "emergency taxi Laval night",
        "24h battery assistance",
        "keys locked in car",
        "roadside assistance North Shore",
      ]}
    />
  );
}
