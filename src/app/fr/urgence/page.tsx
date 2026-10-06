import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "TAXI CHOMEDEY | 🚨 Service d'Urgence & Assistance Routière 24/7 à Laval, Rive-Nord & Laurentides",
  description:
    "🚨 Urgence taxi et assistance routière 24/7 à Laval, Rive-Nord & Laurentides. Survoltage, déverrouillage, transport d'urgence. Appelez TAXI CHOMEDEY maintenant ! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/fr/urgence",
    languages: {
      fr: "https://besttaxilaval.ca/fr/urgence",
      en: "https://besttaxilaval.ca/en/emergency",
    },
  },
};

export default function UrgencePage() {
  return (
    <ServicePage
      title="🚨 Service d'Urgence & Assistance Routière 24/7"
      description="Besoin d'une intervention rapide ? TAXI CHOMEDEY est disponible 24h/24 et 7j/7 pour toutes vos urgences : batterie à plat, clés enfermées, transport urgent ou dépannage. Nos équipes interviennent rapidement partout à Laval, sur la Rive-Nord et dans les Laurentides."
      features={[
        "Intervention express 24/7",
        "Survoltage de batterie sécuritaire",
        "Déverrouillage de portière sans dommage",
        "Transport d'urgence",
        "Disponible jours fériés et nuits",
        "Chauffeurs expérimentés et équipés",
      ]}
      routes={[
        "Laval et tous ses secteurs",
        "Rive-Nord complète",
        "Laurentides et environs",
        "Autoroutes 13, 15, 440, 640",
      ]}
      partnerships="Partenaire d'assistance routière pour particuliers et entreprises de la région"
      priceLabel="Tarif d'urgence – Appelez maintenant"
      priceNote="Notre répartiteur vous donne un estimé immédiat"
      faqs={[
        "urgence taxi Laval nuit",
        "dépannage batterie 24h",
        "clés enfermées dans voiture",
        "assistance routière Rive-Nord",
      ]}
    />
  );
}
