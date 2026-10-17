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

const faqs = [
  {
    q: "Raccompagnement après soirée à Laval — comment ça marche ?",
    a: "Notre chauffeur désigné vous ramène chez vous en toute sécurité dans votre propre véhicule après votre soirée à Laval. Une voiture de poursuite suit pour récupérer le chauffeur une fois que vous êtes arrivé. Disponible 24h/24, 7j/7. Le tarif = 2 × ceil(compteur CTQ jour ou nuit selon l'heure de départ). Réservez au 514-239-6512.",
  },
  {
    q: "J'ai besoin d'un chauffeur pour ramener ma voiture — c'est possible ?",
    a: "Oui, c'est exactement notre service de raccompagnement. Vous avez consommé et ne pouvez pas conduire ? Notre chauffeur prend le volant de votre véhicule et vous ramène chez vous en sécurité. Le tarif = 2 × ceil(compteur CTQ) — le double d'un taxi classique car le chauffeur doit revenir avec la voiture de poursuite. Pour réserver : 514-239-6512.",
  },
  {
    q: "Service de designated driver (chauffeur désigné) sur la Rive-Nord ?",
    a: "Oui, nous desservons toute la Rive-Nord : Boisbriand, Saint-Eustache, Blainville, Terrebonne, Mascouche, Sainte-Thérèse — ainsi que Laval et les Laurentides. Service de raccompagnement 24h/24, 7j/7. Le tarif = 2 × tarif CTQ selon la distance et l'heure (jour ou nuit). Réservez au 514-239-6512.",
  },
  {
    q: "Taxi raccompagnement disponible 24h — même la nuit ?",
    a: "Oui, notre service de raccompagnement est disponible 24h/24, 7j/7 — y compris les nuits de semaine et de fin de semaine. Les trajets entre 23h et 5h utilisent le tarif CTQ nuit (environ 15 % plus cher que le jour). Le tarif = 2 × ceil(compteur CTQ jour ou nuit selon l'heure de départ). Réservez au 514-239-6512.",
  },
];

export default function RaccompagnementPage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          localBusinessSchema,
          serviceSchema({
            name: "Service de raccompagnement (chauffeur désigné)",
            description:
              "Service de raccompagnement 24/7 : notre chauffeur vous ramène chez vous avec votre propre véhicule, et une voiture de poursuite suit pour récupérer le chauffeur. Tarif = 2 × le tarif CTQ jour (couvre l'aller-retour). Paiement comptant = 3,4 % de remise (frais de terminal carte).",
            url: "https://besttaxilaval.ca/fr/raccompagnement",
            serviceType: "Designated driver / drive-home service",
            areaServed: ["Laval", "Rive-Nord", "Laurentides"],
            offers: [
              {
                name: "Raccompagnement (2× tarif CTQ jour)",
                description:
                  "Notre chauffeur vous ramène chez vous dans votre propre véhicule. Tarif = 2 × ceil(compteur CTQ jour). Couvre l'aller + le retour du chauffeur (voiture de poursuite).",
                priceCurrency: "CAD",
                // Variable price — distance-based. Schema.org doesn't have a clean
                // "formula" type, so we describe it instead of using lowPrice/highPrice.
                // Google may still show this as an Offer in some rich results.
              },
            ],
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Accueil", url: "https://besttaxilaval.ca/fr" },
            {
              name: "Raccompagnement",
              url: "https://besttaxilaval.ca/fr/raccompagnement",
            },
          ]),
        ]}
      />
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
        priceLabel="Tarif Raccompagnement"
        faqs={faqs}
        showAgent={true}
        welcomeMessage="Bonjour ! Je suis l'agent virtuel de Taxi Chomedey. Notre service de raccompagnement vous ramène chez vous en toute sécurité avec votre propre véhicule. D'où partez-vous ?"
      serviceContext="raccompagnement"
      />
    </>
  );
}
