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
        "x-default": "https://besttaxilaval.ca/fr/survoltage-batterie",
      },
  },
};

const faqs = [
  {
    q: "Combien coûte un survoltage de batterie à Laval ?",
    a: "Notre service de survoltage (boost) à Laval coûte entre 35 $ et 80 $ selon le type de véhicule : berline ~35-50 $, VUS ~45-60 $, hybride ~50-65 $, électrique ~60-80 $. Le prix exact dépend aussi de l'heure et du lieu (surcharge possible de 10-20 $ pour zones éloignées ou heures de pointe). Service 24h/24, 7j/7. Pour un devis précis, appelez le 514-239-6512. [En savoir plus sur le survoltage →](/fr/blog/survoltage-batterie-laval-prix-delai-hiver)",
  },
  {
    q: "Boost batterie voiture hybride — c'est possible ?",
    a: "Oui, on peut booster une voiture hybride, mais ça demande des précautions particulières à cause du circuit haute tension. Nos chauffeurs sont formés pour les hybrides Toyota, Honda, Ford, Hyundai, etc. Le coût est généralement 50-65 $ pour un hybride. Pour un véhicule entièrement électrique (Tesla, etc.), le boost ne suffit pas toujours — appelez-nous au 514-239-6512 pour évaluer la situation. [En savoir plus →](/fr/blog/survoltage-batterie-laval-prix-delai-hiver)",
  },
  {
    q: "Service batterie morte 24h à Saint-Jérôme — disponible ?",
    a: "Oui, notre service de survoltage (boost) est disponible 24h/24, 7j/7 à Saint-Jérôme, Mirabel, et partout dans les Laurentides. Tarif 35-80 $ selon le véhicule. On a presque toujours un chauffeur disponible dans les Laurentides, même en pleine nuit ou en hiver. Appelez le 514-239-6512.",
  },
  {
    q: "Dépannage batterie Mont-Tremblant en hiver ?",
    a: "Oui, on dessert Mont-Tremblant et toute la région des Laurentides toute l'année, y compris en hiver (les pannes de batterie sont fréquentes à -20°C). Service 24h/24, 7j/7. Le tarif peut être légèrement plus élevé en hiver ou pour les zones éloignées (surcharge de 10-20 $ possible). Pour un devis précis, appelez le 514-239-6512. [En savoir plus sur le survoltage en hiver →](/fr/blog/survoltage-batterie-laval-prix-delai-hiver)",
  },
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
        welcomeMessage="Bonjour ! Je suis l'agent virtuel de Taxi Chomedey. Est-ce que votre véhicule a besoin d'un survoltage (boost) ?"
        serviceContext="survoltage"
      />
    </>
  );
}
