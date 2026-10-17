import ServicePage from "@/components/ServicePage";
import { SchemaOrg } from "@/components/SchemaOrg";
import {
  localBusinessSchema,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";
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

const faqs = [
  "clés oubliées dans voiture Laval prix",
  "déverrouillage portière sans bris de vitre",
  "ouvrir voiture sans clé Saint-Jérôme",
  "serrure gelée hiver Mont-Tremblant",
];

export default function DeverrouillagePortierePage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          localBusinessSchema,
          serviceSchema({
            name: "Déverrouillage de portière (débarrage)",
            description:
              "Service de déverrouillage de portière 24/7 utilisant une technique professionnelle à air comprimé chaud — sans dommage aux vitres, tringleries ou peinture. Intervention en moins de 20 minutes. Service hivernal pour serrures gelées.",
            url: "https://besttaxilaval.ca/fr/deverrouillage-portiere",
            serviceType: "Car door unlocking / lockout service",
            areaServed: ["Laval", "Rive-Nord", "Laurentides"],
            offers: [
              {
                name: "Déverrouillage de portière (débarrage)",
                description:
                  "Intervention 24/7 à domicile, au travail, stationnements ou sur la route. Tarif varie selon difficulté, véhicule et heure.",
                priceCurrency: "CAD",
                lowPrice: "35",
                highPrice: "120",
              },
            ],
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Accueil", url: "https://besttaxilaval.ca/fr" },
            {
              name: "Déverrouillage de portière",
              url: "https://besttaxilaval.ca/fr/deverrouillage-portiere",
            },
          ]),
        ]}
      />
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
        priceLabel="Tarif Déverrouillage (Débarrage)"
        faqs={faqs}
        showAgent={true}
        welcomeMessage="Bonjour ! Je suis l'agent virtuel de Taxi Chomedey. Clés oubliées dans votre auto ? Notre service de déverrouillage (débarrage) est disponible 24/7. Où êtes-vous situé ?"
      />
    </>
  );
}
