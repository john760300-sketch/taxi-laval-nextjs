import ServicePageEn from "@/components/ServicePageEn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "TAXI CHOMEDEY | 🚗 Drive-Home Service in Laval, North Shore & Laurentians – 24/7",
  description:
    "🚗 Drive-home service 24/7 in Laval, North Shore & Laurentians. Get home safely with your vehicle or by taxi. TAXI CHOMEDEY. ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/en/drive-home-service",
    languages: {
      fr: "https://besttaxilaval.ca/fr/raccompagnement",
      en: "https://besttaxilaval.ca/en/drive-home-service",
    },
  },
};

export default function DriveHomeServicePage() {
  return (
    <ServicePageEn
      title="🚗 Drive-Home Service in Laval, North Shore & Laurentians"
      description="Get home with peace of mind after your evening. Our driver takes you back safely in your own vehicle or in one of our taxis. Discreet, professional service available 24/7 throughout Laval, the North Shore and the Laurentians."
      features={[
        "Drive-home with your own vehicle",
        "Classic taxi option available",
        "Discreet and professional drivers",
        "Available 24/7",
        "Service for evenings, events and nights out",
        "Clear, transparent rates",
      ]}
      routes={[
        "Laval and all its neighbourhoods",
        "North Shore (Boisbriand, Saint-Eustache, Blainville…)",
        "Laurentians (Saint-Jérôme, Mirabel, Mont-Tremblant…)",
      ]}
      partnerships="Service recommended for nights out and events in Laval and on the North Shore"
      priceLabel="Rate by distance – Free estimate"
      faqs={[
        "drive home after night out Laval",
        "driver to bring my car home",
        "designated driver North Shore",
        "24h drive-home taxi",
      ]}
    />
  );
}
