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
        "x-default": "https://besttaxilaval.ca/fr/deverrouillage-portiere",
      },
  },
};

const faqs = [
  {
    q: "Clés oubliées dans voiture à Laval — quel prix ?",
    a: "Le déverrouillage de portière (débarrage) à Laval coûte entre 40 $ et 120 $ selon le modèle et l'année du véhicule, le lieu, l'heure et la météo. Sans bris de vitre — nos chauffeurs utilisent des outils spécialisés. Service 24h/24, 7j/7. Pour un prix exact, appelez le 514-239-6512. [Voir aussi notre service d'urgence routière →](/fr/urgence)",
  },
  {
    q: "Déverrouillage de portière sans bris de vitre — c'est possible ?",
    a: "Oui, on ouvre votre voiture sans briser la vitre ni endommager la portière. Nos chauffeurs utilisent des outils spécialisés (coin en plastique, gaine en polypropylène) qui déverrouillent la portière en quelques minutes. Le tarif est de 40 $ à 120 $ selon le véhicule. Appelez le 514-239-6512 — on a presque toujours quelqu'un disponible dans Laval.",
  },
  {
    q: "Ouvrir voiture sans clé à Saint-Jérôme — disponible ?",
    a: "Oui, on dessert Saint-Jérôme, Mirabel, et toute la région des Laurentides pour le déverrouillage de portière. Service 24h/24, 7j/7. Tarif 40-120 $ selon le véhicule. Appelez le 514-239-6512.",
  },
  {
    q: "Serrure gelée en hiver à Mont-Tremblant — comment la débloquer ?",
    a: "En hiver à Mont-Tremblant, les serrures peuvent geler. On peut les dégeler sans dommage avec un dévidoir chauffant ou un spray dégivrant. Le tarif peut être légèrement plus élevé en hiver ou pour zones éloignées (surcharge de 10-20 $ possible). Service 24h/24. Appelez le 514-239-6512.",
  },
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
        welcomeMessage="Bonjour ! Je suis l'agent virtuel de Taxi Chomedey. Clés oubliées dans votre auto ? Notre service de déverrouillage (débarrage) est disponible 24/7."
        serviceContext="deverrouillage"
      />
    </>
  );
}
