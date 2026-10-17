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
        {
          q: "Taxi de Laval à Saint-Jérôme — quel prix ?",
          a: "Le tarif taxi de Laval à Saint-Jérôme = max(UberX pointe, ceil(compteur CTQ jour ou nuit selon l'heure)). À titre indicatif : ~110-159 $ le jour, 124-182 $ la nuit (selon le point de départ à Laval et la circulation). [Calculez votre tarif exact →](/fr/calculatrice-taxi) ou appelez le 514-239-6512.",
        },
        {
          q: "Transport de Chomedey à Centropolis — combien ça coûte ?",
          a: "Trajet court intra-Laval. Le tarif = ceil(compteur CTQ) — généralement 20-35 $ selon la distance exacte. [Calculez votre tarif →](/fr/calculatrice-taxi) ou appelez le 514-239-6512.",
        },
        {
          q: "Taxi pour l'hôpital Cité-de-la-Santé — disponible ?",
          a: "On transporte régulièrement vers l'Hôpital de la Cité-de-la-Santé à Laval. Tarif selon la distance depuis votre point de départ. [Calculez votre tarif →](/fr/calculatrice-taxi) ou appelez le 514-239-6512. Pour un transport médical adapté (personne à mobilité réduite, rendez-vous médical), [voir notre service de transport médical →](/fr/transport-medical).",
        },
        {
          q: "Navette pour Place Bell (matchs Laval Rocket) — comment réserver ?",
          a: "On transporte vers Place Bell (aréna des Laval Rocket) pour les événements et matchs. Tarif selon la distance depuis votre point de départ. [Calculez votre tarif →](/fr/calculatrice-taxi) ou appelez le 514-239-6512.",
        },
      ]}
    />
  );
}
