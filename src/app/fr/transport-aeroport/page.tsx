import ServicePage from "@/components/ServicePage";
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
    },
  },
};

export default function TransportAeroportPage() {
  return (
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
      faqs={[
        "Combien coûte un taxi de Laval à l'aéroport YUL ?",
        "Transfert aéroport Montréal-Trudeau depuis la Rive-Nord",
        "Taxi pour un vol tôt le matin",
        "Prix fixe navette aéroport YUL",
      ]}
    />
  );
}
