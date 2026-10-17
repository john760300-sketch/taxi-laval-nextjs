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
        {
          q: "Faire livrer mes courses Walmart à Laval — c'est possible ?",
          a: "Oui, on livre vos courses Walmart, Maxi, Super C, IGA, etc. à Laval. Le tarif est basé sur la distance entre le magasin et votre domicile. [Calculez votre tarif de livraison →](/fr/calculatrice-taxi) ou appelez le 514-239-6512.",
        },
        {
          q: "Livraison de médicaments en urgence à Saint-Eustache — disponible ?",
          a: "Oui, on livre en urgence les médicaments depuis la pharmacie vers votre domicile à Saint-Eustache et partout en Rive-Nord. Service 24h/24. Tarif selon la distance. [Calculez votre tarif →](/fr/calculatrice-taxi) ou appelez le 514-239-6512.",
        },
        {
          q: "Coursier pour colis à Terrebonne — quel délai ?",
          a: "Oui, on agit comme coursier pour colis urgent à Terrebonne, Mascouche, et partout en Rive-Nord. Service de livraison express 24h/24. Tarif selon la distance. [Calculez votre tarif →](/fr/calculatrice-taxi) ou appelez le 514-239-6512.",
        },
        {
          q: "Transport de documents urgent — comment ça marche ?",
          a: "On transporte les documents urgents (contrats, bordereaux, plis scellés) à Laval, Rive-Nord, et Laurentides. Livraison express directe — pas d'escale. Tarif selon la distance. [Calculez votre tarif →](/fr/calculatrice-taxi) ou appelez le 514-239-6512.",
        },
      ]}
    />
  );
}
