import ServicePageEn from "@/components/ServicePageEn";
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

export default function DoorUnlockingPage() {
  return (
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
      priceLabel="Fixed rate – Call for an estimate"
      faqs={[
        "keys locked in car Laval price",
        "door unlocking without breaking glass",
        "open car without key Saint-Jérôme",
        "frozen lock winter Mont-Tremblant",
      ]}
    />
  );
}
