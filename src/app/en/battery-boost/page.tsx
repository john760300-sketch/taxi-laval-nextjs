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

const faqs = [
  "how much does a battery boost cost in Laval",
  "hybrid car battery boost",
  "dead battery service 24h Saint-Jérôme",
  "battery assistance Mont-Tremblant winter",
];

export default function BatteryBoostPage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          localBusinessSchema,
          serviceSchema({
            name: "Battery Boost (Jump Start)",
            description:
              "24/7 battery boost service using intelligent Boost Packs that regulate current to protect sensitive electronics of modern vehicles. Response in under 15 minutes. Compatible with hybrids and electric vehicles.",
            url: "https://besttaxilaval.ca/en/battery-boost",
            serviceType: "Car battery boost / jump start service",
            areaServed: ["Laval", "North Shore", "Laurentians"],
            offers: [
              {
                name: "Battery boost (jump start)",
                description:
                  "24/7 response at home, work or on the road. Price varies by vehicle, time and location.",
                priceCurrency: "CAD",
                lowPrice: "35",
                highPrice: "80",
              },
            ],
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: "https://besttaxilaval.ca/en" },
            {
              name: "Battery Boost",
              url: "https://besttaxilaval.ca/en/battery-boost",
            },
          ]),
        ]}
      />
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
        priceLabel="Battery Boost Rate"
        faqs={faqs}
        showAgent={true}
        welcomeMessage="Hello! I'm the virtual agent of Taxi Chomedey. Dead battery? Our boost service costs $35 to $80 depending on your vehicle and time. What type of vehicle do you have and where are you located?"
      />
    </>
  );
}
