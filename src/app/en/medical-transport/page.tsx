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
        "transport for reduced mobility Laval",
        "taxi for medical appointment Saint-Jérôme",
        "adapted hospital transport",
        "senior accompaniment Laval",
      ]}
    />
  );
}
