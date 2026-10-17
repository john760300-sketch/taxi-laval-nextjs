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
  "raccompagnement après soirée Laval",
  "chauffeur pour ramener ma voiture",
  "service designated driver Rive-Nord",
  "taxi raccompagnement 24h",
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
        welcomeMessage="Bonsoir ! Notre service de raccompagnement vous ramène chez vous en toute sécurité avec votre propre véhicule. Le prix est calculé au double du tarif CTQ jour. D'où partez-vous et quelle est votre destination ?"
      />
    </>
  );
}
