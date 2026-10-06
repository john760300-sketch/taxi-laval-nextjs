import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "TAXI CHOMEDEY | 🚖 #1 Déverrouillage de Portière à Laval, Rive-Nord & Laurentides – 24h/24 7j/7",
  description:
    "🚖 #1 Service de déverrouillage de portière à Laval, Rive-Nord & Laurentides – TAXI CHOMEDEY intervient rapidement 24h/24 7j/7. Portière verrouillée ? Appelez-nous maintenant ! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/fr/deverrouillage-portiere",
    languages: {
      fr: "https://besttaxilaval.ca/fr/deverrouillage-portiere",
      en: "https://besttaxilaval.ca/en/door-unlocking",
    },
  },
};

export default function DeverrouillagePortierePage() {
  return (
    <ServicePage
      title="Déverrouillage de portière à Laval – Sans dommage, 24/7"
      description="Clés oubliées à l'intérieur de votre véhicule? Notre technique professionnelle utilise de l'air comprimé chaud pour déverrouiller votre portière sans causer de dommages. Intervention rapide en moins de 20 minutes, 24h/24, 7j/7. Nous garantissons une ouverture sans bris de vitre et sans égratignure sur la peinture. Service hivernal spécialisé pour serrures gelées."
      features={[
        "Intervention rapide en moins de 20 minutes",
        "Technique sans dommage aux portières et vitres",
        "Service pour tous types de véhicules",
        "Disponible 24h/24, 7j/7",
        "Équipement professionnel",
        "Service hivernal pour serrures gelées",
      ]}
      routes={[
        "Stationnements de centres commerciaux (Carrefour Laval, Centropolis)",
        "Domiciles",
        "Lieux de travail",
        "Aires de repos",
      ]}
      partnerships="Partenariat avec plusieurs concessionnaires automobiles de Laval et la Rive-Nord"
      priceLabel="Tarif fixe – Appelez pour un estimé"
      faqs={[
        "clés oubliées dans voiture Laval prix",
        "déverrouillage portière sans bris de vitre",
        "ouvrir voiture sans clé Saint-Jérôme",
        "serrure gelée hiver Mont-Tremblant",
      ]}
    />
  );
}
