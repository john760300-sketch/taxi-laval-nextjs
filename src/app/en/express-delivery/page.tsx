import ServicePageEn from "@/components/ServicePageEn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "TAXI CHOMEDEY | 🚖 #1 Express Delivery in Laval, North Shore & Laurentians – 24/7",
  description:
    "🚖 #1 Express delivery service in Laval, North Shore & Laurentians – TAXI CHOMEDEY delivers fast 24/7. Packages, documents, urgent items? Call us now! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/en/express-delivery",
    languages: {
      fr: "https://besttaxilaval.ca/fr/livraison-express",
      en: "https://besttaxilaval.ca/en/express-delivery",
    },
  },
};

export default function ExpressDeliveryPage() {
  return (
    <ServicePageEn
      title="Express delivery in Laval – Groceries, packages, medication"
      description="Need an urgent package or groceries delivered? We offer a fast, reliable delivery service throughout Laval, the North Shore and the Laurentians. Grocery, medication, package and document delivery. Faster than traditional delivery services – we deliver your groceries in under 90 minutes."
      features={[
        "Grocery delivery (Walmart, Maxi, Super C)",
        "Package and document transport",
        "Urgent medication delivery",
        "Real-time tracking available",
        "Express 24/7 service",
        "Delivery in under 90 minutes",
      ]}
      routes={[
        "Local delivery Laval",
        "Intercity North Shore delivery",
        "Document transport to Montréal",
      ]}
      partnerships="Partnership with Walmart Laval, Maxi, Super C, Jean-Coutu and Familiprix pharmacies"
      priceLabel="Price by distance – Free estimate"
      faqs={[
        "deliver my Walmart groceries Laval",
        "urgent medication delivery Saint-Eustache",
        "courier for packages Terrebonne",
        "urgent document transport",
      ]}
    />
  );
}
