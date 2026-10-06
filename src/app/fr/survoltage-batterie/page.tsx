import ServicePage from "@/components/ServicePage";
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

export default function SurvoltageBatteriePage() {
  return (
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
      priceLabel="Tarif unique – Contactez-nous pour un estimé gratuit"
      faqs={[
        "combien coûte un survoltage de batterie à Laval",
        "boost batterie voiture hybride",
        "service batterie morte 24h Saint-Jérôme",
        "dépannage batterie Mont-Tremblant hiver",
      ]}
    />
  );
}
