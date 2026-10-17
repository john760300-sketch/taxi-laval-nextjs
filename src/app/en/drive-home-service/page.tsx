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

const faqs = [
  "drive home after night out Laval",
  "driver to bring my car home",
  "designated driver North Shore",
  "24h drive-home taxi",
];

export default function DriveHomeServicePage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          localBusinessSchema,
          serviceSchema({
            name: "Drive-Home Service (Designated Driver)",
            description:
              "24/7 drive-home service: our driver takes you home in your own vehicle, with a chase car following to pick up the driver. Pricing = 2 × CTQ day rate (covers round trip). Cash payment = 3.4% discount (card terminal fee).",
            url: "https://besttaxilaval.ca/en/drive-home-service",
            serviceType: "Designated driver / drive-home service",
            areaServed: ["Laval", "North Shore", "Laurentians"],
            offers: [
              {
                name: "Drive-home service (2× CTQ day rate)",
                description:
                  "Our driver takes you home in your own vehicle. Price = 2 × ceil(CTQ day meter). Covers outbound + return trip for the driver (chase car).",
                priceCurrency: "CAD",
              },
            ],
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: "https://besttaxilaval.ca/en" },
            {
              name: "Drive-Home Service",
              url: "https://besttaxilaval.ca/en/drive-home-service",
            },
          ]),
        ]}
      />
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
        priceLabel="Drive-Home Rate"
        faqs={faqs}
        showAgent={true}
        welcomeMessage="Hello! I'm the virtual agent of Taxi Chomedey. Our drive-home service gets you home safely in your own vehicle. The price is calculated at double the CTQ day rate. Where are you starting from and what is your destination?"
      />
    </>
  );
}
