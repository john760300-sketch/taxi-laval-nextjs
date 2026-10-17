import ServicePageEn from "@/components/ServicePageEn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "TAXI CHOMEDEY | 🚖 #1 Medical Transport & Accompaniment in Laval, North Shore & Laurentians – 24/7",
  description:
    "🚖 #1 Adapted & safe medical transport service in Laval, North Shore & Laurentians – TAXI CHOMEDEY accompanies you to hospitals & clinics 24/7. Caring drivers. Book now! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/en/medical-transport",
    languages: {
      fr: "https://besttaxilaval.ca/fr/transport-medical",
      en: "https://besttaxilaval.ca/en/medical-transport",
    },
  },
};

export default function MedicalTransportPage() {
  return (
    <ServicePageEn
      title="Medical transport in Laval and North Shore – Adapted accompaniment"
      description="We offer an adapted transport service for medical appointments, treatments and hospital visits. Our drivers are trained to accompany people with reduced mobility, seniors and patients. We take the time needed to ensure your comfort and safety. Return service after treatment available."
      features={[
        "Transport to Cité-de-la-Santé hospital",
        "Senior accompaniment",
        "Comfortable and accessible vehicles",
        "Return service after treatment",
        "Drivers trained for medical needs",
        "Transport to clinics and dialysis centres",
      ]}
      routes={[
        "Laval – Cité-de-la-Santé",
        "Saint-Jérôme – Regional hospital",
        "Intra-Laval transport",
        "Intercity North Shore",
      ]}
      partnerships="Agreements with Cité-de-la-Santé Hospital, CISSS des Laurentides, CLSC Laval"
      priceLabel="Preferential rate – Packages available"
      faqs={[
        {
          q: "Transport for reduced mobility in Laval — available?",
          a: "Yes, we transport people with reduced mobility in adapted vehicles. Preferential rate with packages available for regular medical appointments (dialysis, chemo, etc.). Call 514-239-6512 for a custom quote. [Calculate the base fare →](/en/taxi-calculator).",
        },
        {
          q: "Taxi for medical appointment in Saint-Jérôme — how to book?",
          a: "We serve hospitals and clinics in Saint-Jérôme, Mirabel, and the entire North Shore. Punctual 24/7 service. Preferential rate for medical appointments — packages available for regular appointments. Call 514-239-6512. [Calculate your fare →](/en/taxi-calculator).",
        },
        {
          q: "Adapted hospital transport — which area?",
          a: "We transport to all hospitals in the region: Cité-de-la-Santé (Laval), Saint-Jérôme Hospital, etc. Vehicles adapted for wheelchairs and people with reduced mobility. Preferential rate with packages. Call 514-239-6512.",
        },
        {
          q: "Senior accompaniment in Laval — is it possible?",
          a: "We accompany seniors to their medical appointments, errands, or personal outings. Our drivers are patient, discreet, and can help getting in/out of the vehicle. Packages available for regular appointments. Call 514-239-6512. [Calculate the base fare →](/en/taxi-calculator).",
        },
      ]}
    />
  );
}
