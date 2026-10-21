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
        "x-default": "https://besttaxilaval.ca/en/emergency",
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
        {
          q: "Emergency taxi in Laval at night — available?",
          a: "Yes, our emergency taxi service is available 24/7 in Laval, North Shore, and Laurentians. For emergency transport at night, call 514-239-6512 — we almost always have a driver available within 30 minutes. The night rate (11pm-5am) is ~15% more than day. [Calculate your fare →](/en/taxi-calculator).",
        },
        {
          q: "24h battery assistance — is it possible?",
          a: "Yes, 24/7 battery boost service. Price $35-80 depending on vehicle. [See our battery boost service →](/en/battery-boost) or call 514-239-6512.",
        },
        {
          q: "Keys locked in car — what to do?",
          a: "Yes, we unlock doors without breaking glass. Price $40-120 depending on vehicle. [See our door unlocking service →](/en/door-unlocking) or call 514-239-6512.",
        },
        {
          q: "Roadside assistance on the North Shore — which area?",
          a: "We serve the entire North Shore: Boisbriand, Saint-Eustache, Blainville, Terrebonne, Mascouche, Sainte-Thérèse. 24/7 roadside services: battery boost, door unlocking, and more. Call 514-239-6512.",
        },
      ]}
    />
  );
}
