import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "TAXI CHOMEDEY | 🚖 #1 Livraison Express à Laval, Rive-Nord & Laurentides – 24h/24 7j/7",
  description:
    "🚖 #1 Service de livraison express à Laval, Rive-Nord & Laurentides – TAXI CHOMEDEY livre rapidement 24h/24 7j/7. Colis, documents, objets urgents ? Appelez-nous maintenant ! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/fr/livraison-express",
    languages: {
      fr: "https://besttaxilaval.ca/fr/livraison-express",
      en: "https://besttaxilaval.ca/en/express-delivery",
    },
  },
};

export default function LivraisonExpressPage() {
  return (
    <ServicePage
      title="Livraison express à Laval – Courses, colis, médicaments"
      description="Besoin de faire livrer un colis urgent ou des courses? Nous offrons un service de livraison rapide et fiable dans tout Laval, la Rive-Nord et les Laurentides. Livraison d'épiceries, de médicaments, de colis et de documents. Plus rapide que les services de livraison traditionnels – nous livrons vos courses en moins de 90 minutes."
      features={[
        "Livraison d'épiceries (Walmart, Maxi, Super C)",
        "Transport de colis et documents",
        "Livraison de médicaments en urgence",
        "Suivi en temps réel disponible",
        "Service express 24/7",
        "Livraison en moins de 90 minutes",
      ]}
      routes={[
        "Livraison locale Laval",
        "Livraison interville Rive-Nord",
        "Transport de documents vers Montréal",
      ]}
      partnerships="Partenariat avec Walmart Laval, Maxi, Super C, pharmacies Jean-Coutu et Familiprix"
      priceLabel="Prix selon distance – Estimé gratuit"
      faqs={[
        "faire livrer mes courses Walmart Laval",
        "livraison médicaments en urgence Saint-Eustache",
        "coursier pour colis Terrebonne",
        "transport de documents urgent",
      ]}
    />
  );
}
