import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "TAXI CHOMEDEY | 🚗 Service de Raccompagnement à Laval, Rive-Nord & Laurentides – 24h/24 7j/7",
  description:
    "🚗 Service de raccompagnement 24/7 à Laval, Rive-Nord & Laurentides. Rentrez chez vous en sécurité avec votre véhicule ou en taxi. TAXI CHOMEDEY. ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/fr/raccompagnement",
    languages: {
      fr: "https://besttaxilaval.ca/fr/raccompagnement",
      en: "https://besttaxilaval.ca/en/drive-home-service",
    },
  },
};

export default function RaccompagnementPage() {
  return (
    <ServicePage
      title="🚗 Service de Raccompagnement à Laval, Rive-Nord & Laurentides"
      description="Rentrez chez vous l'esprit tranquille après votre soirée. Notre chauffeur vous ramène de façon sécuritaire avec votre propre véhicule ou à bord de l'un de nos taxis. Service discret, professionnel et disponible 24h/24, 7j/7 partout à Laval, sur la Rive-Nord et dans les Laurentides."
      features={[
        "Raccompagnement avec votre propre véhicule",
        "Option taxi classique disponible",
        "Chauffeurs discrets et professionnels",
        "Disponible 24h/24, 7j/7",
        "Service pour soirées, événements et sorties",
        "Tarifs clairs et transparents",
      ]}
      routes={[
        "Laval et tous ses quartiers",
        "Rive-Nord (Boisbriand, Saint-Eustache, Blainville…)",
        "Laurentides (Saint-Jérôme, Mirabel, Mont-Tremblant…)",
      ]}
      partnerships="Service recommandé pour les sorties et événements à Laval et sur la Rive-Nord"
      priceLabel="Tarif selon distance – Estimé gratuit"
      faqs={[
        "raccompagnement après soirée Laval",
        "chauffeur pour ramener ma voiture",
        "service designated driver Rive-Nord",
        "taxi raccompagnement 24h",
      ]}
    />
  );
}
