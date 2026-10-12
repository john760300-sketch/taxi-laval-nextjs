import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "TAXI CHOMEDEY | 🚖 #1 Transport Médical & Accompagnement à Laval, Rive-Nord & Laurentides – 24h/24 7j/7",
  description:
    "🚖 #1 Service de transport médical adapté & sécuritaire à Laval, Rive-Nord & Laurentides – TAXI CHOMEDEY vous accompagne vers hôpitaux & cliniques 24h/24 7j/7. Chauffeurs attentionnés. Réservez maintenant ! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/fr/transport-medical",
    languages: {
      fr: "https://besttaxilaval.ca/fr/transport-medical",
      en: "https://besttaxilaval.ca/en/medical-transport",
    },
  },
};

export default function TransportMedicalPage() {
  return (
    <ServicePage
      title="Transport médical à Laval et Rive-Nord – Accompagnement adapté"
      description="Nous offrons un service de transport adapté pour les rendez-vous médicaux, les traitements et les visites à l'hôpital. Nos chauffeurs sont formés pour accompagner les personnes à mobilité réduite, les aînés et les patients. Nous prenons le temps nécessaire pour assurer votre confort et votre sécurité. Service de retour après intervention disponible."
      features={[
        "Transport vers l'hôpital Cité-de-la-Santé",
        "Accompagnement des aînés",
        "Véhicules confortables et accessibles",
        "Service de retour après intervention",
        "Chauffeurs formés aux besoins médicaux",
        "Transport vers cliniques et centres de dialyse",
      ]}
      routes={[
        "Laval – Cité-de-la-Santé",
        "Saint-Jérôme – Hôpital régional",
        "Transport intra-Laval",
        "Interville Rive-Nord",
      ]}
      partnerships="Entente avec Hôpital Cité-de-la-Santé, CISSS des Laurentides, CLSC Laval"
      priceLabel="Tarif préférentiel – Forfaits disponibles"
      faqs={[
        "transport pour personne à mobilité réduite Laval",
        "taxi pour rendez-vous médical Saint-Jérôme",
        "transport adapté hôpital",
        "accompagnement senior Laval",
      ]}
    />
  );
}
