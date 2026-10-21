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
        "x-default": "https://besttaxilaval.ca/en/battery-boost",
      },
  },
};

const faqs = [
  {
    q: "How much does a battery boost cost in Laval?",
    a: "Our battery boost service in Laval costs between $35 and $80 depending on vehicle type: sedan ~$35-50, SUV ~$45-60, hybrid ~$50-65, EV ~$60-80. The exact price also depends on time and location (possible surcharge of $10-20 for remote areas or peak hours). 24/7 service. For an exact quote, call 514-239-6512. [Learn more about battery boost →](/en/blog/survoltage-batterie-laval-prix-delai-hiver)",
  },
  {
    q: "Hybrid car battery boost — is it possible?",
    a: "Yes, we can boost a hybrid car, but it requires special precautions due to the high-voltage circuit. Our drivers are trained for Toyota, Honda, Ford, Hyundai hybrids. Cost is usually $50-65 for a hybrid. For a fully electric vehicle (Tesla, etc.), a boost isn't always enough — call us at 514-239-6512 to assess the situation. [Learn more →](/en/blog/survoltage-batterie-laval-prix-delai-hiver)",
  },
  {
    q: "Dead battery service 24h in Saint-Jérôme — available?",
    a: "Yes, our battery boost service is available 24/7 in Saint-Jérôme, Mirabel, and throughout the Laurentians. Price $35-80 depending on vehicle. We almost always have a driver available in the Laurentians, even in the middle of the night or in winter. Call 514-239-6512.",
  },
  {
    q: "Battery assistance in Mont-Tremblant during winter?",
    a: "Yes, we serve Mont-Tremblant and the entire Laurentians region year-round, including winter (dead batteries are common at -20°C). 24/7 service. The price may be slightly higher in winter or for remote areas (possible $10-20 surcharge). For an exact quote, call 514-239-6512. [Learn more about winter battery boost →](/en/blog/survoltage-batterie-laval-prix-delai-hiver)",
  },
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
        welcomeMessage="Hello! I'm the virtual agent of Taxi Chomedey. Does your vehicle need a battery boost?"
        serviceContext="survoltage"
      />
    </>
  );
}
