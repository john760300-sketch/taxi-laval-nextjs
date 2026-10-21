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
        "x-default": "https://besttaxilaval.ca/fr/transport-medical",
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
        {
          q: "Transport pour personne à mobilité réduite à Laval — disponible ?",
          a: "Oui, on transporte les personnes à mobilité réduite dans des véhicules adaptés. Tarif préférentiel avec forfaits disponibles pour rendez-vous médicaux réguliers (dialyse, chimio, etc.). Appelez le 514-239-6512 pour un devis personnalisé. [Calculez le tarif de base →](/fr/calculatrice-taxi).",
        },
        {
          q: "Taxi pour rendez-vous médical à Saint-Jérôme — comment réserver ?",
          a: "On dessert les hôpitaux et cliniques de Saint-Jérôme, Mirabel, et toute la Rive-Nord. Service ponctuel 24/7. Tarif préférentiel pour rendez-vous médicaux — forfaits disponibles pour rendez-vous réguliers. Appelez le 514-239-6512. [Calculez votre tarif →](/fr/calculatrice-taxi).",
        },
        {
          q: "Transport adapté vers l'hôpital — quelle zone ?",
          a: "On transporte vers tous les hôpitaux de la région : Cité-de-la-Santé (Laval), Hôpital de Saint-Jérôme, etc. Véhicules adaptés pour fauteuils roulants et personnes à mobilité réduite. Tarif préférentiel avec forfaits. Appelez le 514-239-6512.",
        },
        {
          q: "Accompagnement senior à Laval — c'est possible ?",
          a: "On accompagne les personnes âgées vers leurs rendez-vous médicaux, courses, ou sorties personnelles. Nos chauffeurs sont patients, discrets, et peuvent aider à monter/descendre du véhicule. Forfaits disponibles pour rendez-vous réguliers. Appelez le 514-239-6512. [Calculez le tarif de base →](/fr/calculatrice-taxi).",
        },
      ]}
    />
  );
}
