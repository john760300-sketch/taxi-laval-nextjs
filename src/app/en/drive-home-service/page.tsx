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
  {
    q: "Drive home after a night out in Laval — how does it work?",
    a: "Our designated driver takes you home safely in your own vehicle after your night out in Laval. A chase car follows to pick up the driver once you've arrived. Available 24/7. Price = 2 × ceil(CTQ day or night meter depending on departure time). [Calculate your fare →](/en/taxi-calculator) or call 514-239-6512. [Learn more about drive-home service →](/en/blog/taxi-raccompagnement-apres-soiree-ce-quil-faut-savoir)",
  },
  {
    q: "Driver to bring my car home — is that possible?",
    a: "Yes, that's exactly our drive-home service. Had a few drinks and can't drive? Our driver takes the wheel of your vehicle and brings you home safely. Price = 2 × ceil(CTQ meter) — double a regular taxi because the driver has to come back with the chase car. [See price examples →](/en/taxi-calculator) or call 514-239-6512.",
  },
  {
    q: "Designated driver on the North Shore — available?",
    a: "Yes, we serve the entire North Shore: Boisbriand, Saint-Eustache, Blainville, Terrebonne, Mascouche, Sainte-Thérèse — as well as Laval and the Laurentians. 24/7 drive-home service. Price = 2 × CTQ fare based on distance and time (day or night). [Calculate your fare →](/en/taxi-calculator) or call 514-239-6512.",
  },
  {
    q: "24h drive-home taxi — even at night?",
    a: "Yes, our drive-home service is available 24/7 — including weekday and weekend nights. Trips between 11pm and 5am use the CTQ night rate (~15% more than day). Price = 2 × ceil(CTQ day or night meter depending on departure time). [Calculate your drive-home fare →](/en/taxi-calculator) or call 514-239-6512. [Learn more →](/en/blog/taxi-raccompagnement-apres-soiree-ce-quil-faut-savoir)",
  },
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
        welcomeMessage="Hello! I'm the virtual agent of Taxi Chomedey. Our drive-home service gets you home safely in your own vehicle. Where are you starting from?"
        serviceContext="raccompagnement"
      />
    </>
  );
}
