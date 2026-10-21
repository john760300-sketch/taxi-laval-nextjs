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
    "TAXI CHOMEDEY | 🚖 #1 Transport Aéroport YUL Laval, Rive-Nord & Laurentides – 24h/24 7j/7",
  description:
    "🚖 #1 Transport Aéroport Montréal-Trudeau YUL à Laval, Rive-Nord & Laurentides – TAXI CHOMEDEY vous amène à l'aéroport rapidement & en toute sécurité 24h/24 7j/7. Réservez maintenant ! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/fr/transport-aeroport",
    languages: {
      fr: "https://besttaxilaval.ca/fr/transport-aeroport",
      en: "https://besttaxilaval.ca/en/airport-transport",
        "x-default": "https://besttaxilaval.ca/fr/transport-aeroport",
      },
  },
};

const faqs = [
  {
    q: "Combien coûte un taxi de Laval à l'aéroport YUL ?",
    a: "Le tarif officiel CTQ pour un trajet Laval (Chomedey) → Aéroport Montréal-Trudeau (YUL) est entre 43 $ et 57 $ le jour (5h–23h), 49 $ à 65 $ la nuit (23h–5h), selon le quartier de Laval et la circulation. Le tarif = ceil(compteur CTQ jour ou nuit selon l'heure). [Calculez votre tarif exact →](/fr/calculatrice-taxi) ou réservez au 514-239-6512. [Voir notre article détaillé Laval → YUL →](/fr/blog/combien-coute-taxi-laval-aeroport-yul-2026)",
  },
  {
    q: "Transfert aéroport Montréal-Trudeau depuis la Rive-Nord — quelle zone ?",
    a: "Nous desservons toute la Rive-Nord : Boisbriand, Saint-Eustache, Blainville, Terrebonne, Mascouche, Sainte-Thérèse — ainsi que Laval et les Laurentides (Saint-Jérôme, Mirabel, Mont-Tremblant). Service de transfert aéroport YUL 24h/24, 7j/7 avec suivi de vol en direct (sans frais en cas de retard). [Calculez votre tarif depuis votre ville →](/fr/calculatrice-taxi) ou appelez le 514-239-6512.",
  },
  {
    q: "Taxi pour un vol tôt le matin — comment réserver ?",
    a: "Pour un vol tôt le matin (5h–7h), réservez la veille. On a 50+ véhicules mais les créneaux de pointe partent vite. Pour un vol en après-midi, vous pouvez appeler 30 minutes avant — on a presque toujours un chauffeur disponible dans Laval. Le tarif est le même 24h/24 (tarif jour 5h–23h, tarif nuit 23h–5h avec ~15 % de supplément). [Calculez votre tarif →](/fr/calculatrice-taxi) ou réservez au 514-239-6512.",
  },
  {
    q: "Prix fixe navette aéroport YUL — comment ça marche ?",
    a: "Notre prix fixe pour le transfert aéroport YUL = max(UberX pointe, ceil(compteur CTQ jour ou nuit)). Le client paie jamais plus cher que UberX en pointe, et on garantit un revenu minimum au chauffeur. Paiement comptant = 3,4 % de remise (frais de terminal carte enlevés). Suivi de vol en direct inclus — sans frais en cas de retard. [Calculez votre prix fixe →](/fr/calculatrice-taxi) ou appelez le 514-239-6512.",
  },
];

export default function TransportAeroportPage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          localBusinessSchema,
          serviceSchema({
            name: "Transport aéroport YUL (Montréal-Trudeau)",
            description:
              "Service complet de transport vers l'Aéroport de Montréal (YUL) avec ponctualité absolue pour tous vos vols. Suivi en direct des vols — sans frais en cas de retard. Service 24/7 partout à Laval, sur la Rive-Nord et dans les Laurentides.",
            url: "https://besttaxilaval.ca/fr/transport-aeroport",
            serviceType: "Airport taxi transport to Montréal-Trudeau (YUL)",
            areaServed: ["Laval", "Rive-Nord", "Laurentides"],
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Accueil", url: "https://besttaxilaval.ca/fr" },
            {
              name: "Transport aéroport YUL",
              url: "https://besttaxilaval.ca/fr/transport-aeroport",
            },
          ]),
        ]}
      />
      <ServicePage
        title="Transport vers l'Aéroport Montréal-Trudeau (YUL) – Service Fiable 24/7"
        subtitle="Service 24 heures sur 24 – Appelez-nous ou écrivez-nous pour un estimé gratuit"
        description="Nous offrons un service complet de transport vers l'Aéroport de Montréal (YUL), garantissant une ponctualité absolue pour tous vos vols. Nos chauffeurs professionnels suivent l'état de la circulation en temps réel afin d'éviter les embouteillages. De plus, nous suivons le statut de votre vol en direct : si votre avion a du retard, votre heure de prise en charge est automatiquement ajustée sans aucun frais supplémentaire. Service disponible 24/7 partout à Laval, sur la Rive-Nord et dans les Laurentides."
        features={[
          "Prise en charge à domicile ou au bureau 24/7",
          "Suivi en direct des vols (aucun frais en cas de retard)",
          "Véhicules récents, propres, confortables et climatisés",
          "Paiement sécurisé par carte de crédit, débit ou comptant",
          "Réservation aller-retour simplifiée",
          "Tarifs forfaitaires et transparents",
        ]}
        routes={[
          "Laval – YUL (Environ 25-35 min selon l'achalandage)",
          "Boisbriand / Blainville – YUL (Environ 30-40 min)",
          "Saint-Jérôme – YUL (Environ 50-60 min)",
          "Mont-Tremblant – YUL (Environ 1h30-1h45)",
        ]}
        partnerships="Service corporatif recommandé et validé par de nombreux complexes hôteliers de Laval et de la Rive-Nord."
        priceLabel="Tarif Forfaitaire Compétitif"
        priceNote="Contactez notre répartiteur dès maintenant pour obtenir un prix fixe et garanti pour votre trajet."
        faqs={faqs}
        showAgent={true}
        welcomeMessage="Bonjour ! Je suis l'agent virtuel de Taxi Chomedey. Vous cherchez un prix fixe et garanti pour votre trajet vers l'aéroport Montréal-Trudeau (YUL) ? Dites-moi votre adresse de départ et je calcule votre tarif avec suivi de vol inclus."
      />
    </>
  );
}
