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
    "TAXI CHOMEDEY | 🚖 #1 Door Unlocking Service in Laval, North Shore & Laurentians – 24/7",
  description:
    "🚖 #1 Door unlocking service in Laval, North Shore & Laurentians – TAXI CHOMEDEY responds fast 24/7. Locked out? Call us now! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/en/door-unlocking",
    languages: {
      fr: "https://besttaxilaval.ca/fr/deverrouillage-portiere",
      en: "https://besttaxilaval.ca/en/door-unlocking",
    },
  },
};

const faqs = [
  {
    q: "Keys locked in car in Laval — what's the price?",
    a: "Door unlocking in Laval costs between $40 and $120 depending on the vehicle model and year, location, time, and weather. No broken glass — our drivers use specialized tools. 24/7 service. For an exact price, call 514-239-6512. [See also our emergency road service →](/en/emergency)",
  },
  {
    q: "Door unlocking without breaking glass — is it possible?",
    a: "Yes, we open your car without breaking the glass or damaging the door. Our drivers use specialized tools (plastic wedge, polypropylene sleeve) that unlock the door in a few minutes. Price is $40 to $120 depending on the vehicle. Call 514-239-6512 — we almost always have someone available in Laval.",
  },
  {
    q: "Open car without key in Saint-Jérôme — available?",
    a: "Yes, we serve Saint-Jérôme, Mirabel, and the entire Laurentians region for door unlocking. 24/7 service. Price $40-120 depending on vehicle. Call 514-239-6512.",
  },
  {
    q: "Frozen lock in winter in Mont-Tremblant — how to unblock it?",
    a: "In winter in Mont-Tremblant, locks can freeze. We can thaw them without damage using a heated probe or de-icing spray. The price may be slightly higher in winter or for remote areas (possible $10-20 surcharge). 24/7 service. Call 514-239-6512.",
  },
];

export default function DoorUnlockingPage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          localBusinessSchema,
          serviceSchema({
            name: "Door Unlocking (Lockout Service)",
            description:
              "24/7 door unlocking service using professional warm compressed air technique — no damage to windows, locks or paint. Response in under 20 minutes. Winter service for frozen locks.",
            url: "https://besttaxilaval.ca/en/door-unlocking",
            serviceType: "Car door unlocking / lockout service",
            areaServed: ["Laval", "North Shore", "Laurentians"],
            offers: [
              {
                name: "Door unlocking (lockout)",
                description:
                  "24/7 response at home, work, parking or on the road. Price varies by difficulty, vehicle and time.",
                priceCurrency: "CAD",
                lowPrice: "35",
                highPrice: "120",
              },
            ],
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: "https://besttaxilaval.ca/en" },
            {
              name: "Door Unlocking",
              url: "https://besttaxilaval.ca/en/door-unlocking",
            },
          ]),
        ]}
      />
      <ServicePageEn
        title="Door unlocking in Laval – No damage, 24/7"
        description="Keys locked inside your vehicle? Our professional technique uses warm compressed air to unlock your door without causing damage. Fast response in under 20 minutes, 24/7. We guarantee opening without broken glass or scratches on the paint. Specialized winter service for frozen locks."
        features={[
          "Fast response in under 20 minutes",
          "Damage-free technique for doors and windows",
          "Service for all vehicle types",
          "Available 24/7",
          "Professional equipment",
          "Winter service for frozen locks",
        ]}
        routes={[
          "Shopping centre parking lots (Carrefour Laval, Centropolis)",
          "Homes",
          "Workplaces",
          "Rest areas",
        ]}
        partnerships="Partnership with several car dealerships in Laval and the North Shore"
        priceLabel="Door Unlocking Rate"
        faqs={faqs}
        showAgent={true}
        welcomeMessage="Hello! I'm the virtual agent of Taxi Chomedey. Locked your keys in the car? Our unlocking service is available 24/7."
        serviceContext="deverrouillage"
      />
    </>
  );
}
