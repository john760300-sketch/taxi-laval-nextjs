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
    "TAXI CHOMEDEY | 🚖 #1 Survoltage de Batterie à Laval, Rive-Nord & Laurentides – 24h/24 7j/7",
  description:
    "🚖 #1 Service de survoltage de batterie à Laval, Rive-Nord & Laurentides – TAXI CHOMEDEY intervient rapidement 24h/24 7j/7. Batterie à plat ? Appelez-nous maintenant ! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/fr/survoltage-batterie",
    languages: {
      fr: "https://besttaxilaval.ca/fr/survoltage-batterie",
      en: "https://besttaxilaval.ca/en/battery-boost",
    },
  },
};

const faqs = [
  "combien coûte un survoltage de batterie à Laval",
  "boost batterie voiture hybride",
  "service batterie morte 24h Saint-Jérôme",
  "dépannage batterie Mont-Tremblant hiver",
];

export default function SurvoltageBatteriePage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          localBusinessSchema,
          serviceSchema({
            name: "Survoltage de batterie (Boost)",
            description:
              "Service de boost de batterie 24/7 utilisant des Boost Packs intelligents qui régulent le courant pour protéger l'électronique sensible des véhicules modernes. Intervention en moins de 15 minutes, compatible avec véhicules hybrides et électriques.",
            url: "https://besttaxilaval.ca/fr/survoltage-batterie",
            serviceType: "Car battery boost / jump start service",
            areaServed: ["Laval", "Rive-Nord", "Laurentides"],
            offers: [
              {
                name: "Survoltage de batterie (boost)",
                description:
                  "Intervention 24/7 à domicile, au travail ou sur la route. Tarif varie selon véhicule, heure et lieu.",
                priceCurrency: "CAD",
                lowPrice: "35",
                highPrice: "80",
              },
            ],
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Accueil", url: "https://besttaxilaval.ca/fr" },
            {
              name: "Survoltage de batterie",
              url: "https://besttaxilaval.ca/fr/survoltage-batterie",
            },
          ]),
        ]}
      />
      <ServicePage
        title="Service de survoltage batterie à Laval et Rive-Nord – Intervention 24/7"
        description="Notre service de boost utilise des 'Boost Packs' intelligents qui régulent le courant pour protéger l'électronique sensible des véhicules modernes. Intervention rapide en moins de 15 minutes. Compatible avec tous les types de véhicules, y compris hybrides et électriques. Contrairement aux câbles traditionnels qui peuvent causer des dommages irréversibles, notre technologie de régulation de courant garantit un démarrage sécuritaire pour l'ordinateur de bord et les composantes électroniques."
        features={[
          "Sécuritaire pour l'électronique du véhicule",
          "Compatible avec véhicules hybrides et électriques",
          "Service 24h/24, 7j/7",
          "Intervention à domicile, au travail ou sur la route",
          "Technologie de régulation de courant",
          "Intervention garantie en moins de 15 minutes",
        ]}
        routes={[
          "Dépannage à domicile",
          "Dépannage au travail",
          "Sur les autoroutes 13, 15, 440, 640",
          "Routes de la Rive-Nord et Laurentides",
        ]}
        partnerships="Entente avec CAA-Québec, recommandé par plusieurs garages de Laval et Saint-Eustache"
        priceLabel="Tarif Survoltage (Boost)"
        faqs={faqs}
        showAgent={true}
      />
    </>
  );
}
