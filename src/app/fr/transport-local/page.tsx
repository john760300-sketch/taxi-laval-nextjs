import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "TAXI CHOMEDEY | 🚖 #1 Service de Transport Local & Régional à Laval, Rive-Nord & Laurentides – 24h/24 7j/7",
  description:
    "🚖 #1 Service de transport local & régional à Laval, Rive-Nord & Laurentides – TAXI CHOMEDEY, chauffeurs professionnels & rapides 24h/24 7j/7. Réservez maintenant ! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/fr/transport-local",
    languages: {
      fr: "https://besttaxilaval.ca/fr/transport-local",
      en: "https://besttaxilaval.ca/en/local-transport",
    },
  },
};

export default function TransportLocalPage() {
  return (
    <ServicePage
      title="Transport local à Laval, Rive-Nord et Laurentides – Taxi 24/7"
      description="Notre service de transport local vous offre des trajets rapides et sécuritaires dans tous les quartiers de Laval, ainsi que dans les villes de la Rive-Nord et Laurentides. Nos chauffeurs connaissent parfaitement les raccourcis pour vous faire arriver à destination rapidement. Évitez les bouchons sur les autoroutes 13, 15, 440 et 640 grâce à notre connaissance approfondie du terrain."
      features={[
        "Courses vers les centres commerciaux (Carrefour Laval, Centropolis)",
        "Transport vers les écoles, CEGEP et universités",
        "Navettes pour les événements locaux",
        "Service pour personnes à mobilité réduite",
        "Service 24h/24, 7j/7",
        "Connaissance parfaite des raccourcis",
      ]}
      routes={[
        "Laval – Boisbriand (15 min)",
        "Laval – Saint-Jérôme (35 min)",
        "Laval – Mont-Tremblant (1h15)",
        "Navettes Place Bell",
        "Événements au Centropolis",
      ]}
      partnerships="Entente avec Carrefour Laval, Centropolis, Hôpital Cité-de-la-Santé, Place Bell"
      priceLabel="Tarifs compétitifs – Estimé gratuit par téléphone"
      faqs={[
        "taxi de Laval à Saint-Jérôme prix",
        "transport de Chomedey à Centropolis",
        "taxi pour hôpital Cité-de-la-Santé",
        "navette pour Place Bell",
      ]}
    />
  );
}
