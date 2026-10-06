import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TAXI CHOMEDEY | 🚖 #1 Service de Taxi Laval, Rive-Nord & Laurentides 24h/24 7j/7",
  description:
    "TAXI CHOMEDEY à Laval, Rive-Nord & Laurentides – Disponible 24h/24 7j/7. Transport local, aéroport YUL, survoltage batterie, déverrouillage de portière et service de raccompagnement 24/7. Réservez maintenant ! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/fr",
    languages: {
      fr: "https://besttaxilaval.ca/fr",
      en: "https://besttaxilaval.ca/en",
    },
  },
};

const services = [
  {
    title: "Survoltage de Batterie (Boost) à Laval, Rive-Nord & Laurentides",
    description:
      "Méthode sécuritaire de pointe pour relancer une batterie morte sans aucun risque pour les modules électroniques de votre véhicule.",
    href: "/fr/survoltage-batterie",
  },
  {
    title: "Déverrouillage Professionnel à Laval, Rive-Nord & Laurentides",
    description:
      "Ouverture de portière rapide, propre et garantie sans dommage aux vitres, tringleries ou à la peinture.",
    href: "/fr/deverrouillage-portiere",
  },
  {
    title: "Livraison Express à Laval, Rive-Nord & Laurentides",
    description:
      "Cueillette et transport rapide de vos colis ou de vos commandes d'épicerie (Walmart, Maxi, Super C) partout à Laval.",
    href: "/fr/livraison-express",
  },
  {
    title: "Transport Sécuritaire à Laval, Rive-Nord & Laurentides",
    description:
      "Déplacements fluides vers les centres hospitaliers (Hôpital de la Cité-de-la-Santé), les centres d'achat et les institutions locales.",
    href: "/fr/transport-local",
  },
  {
    title: "🚗 Service de Raccompagnement à Laval, Rive-Nord & Laurentides",
    description:
      "Rentrez chez vous l'esprit tranquille après votre soirée. Notre chauffeur vous ramène de façon sécuritaire avec votre propre véhicule ou à bord de l'un de nos taxis.",
    href: "/fr/raccompagnement",
  },
];

const features = [
  {
    title: "🏆 À votre service depuis 2020 à Laval, Rive-Nord & Laurentides",
    description:
      "Établi depuis 2020, TAXI CHOMEDEY s'est positionné comme une alternative fiable de transport privé à Laval et dans la région des Laurentides grâce à une gestion rigoureuse et transparente.",
  },
  {
    title: "🚖 Disponibilité accrue à Laval, Rive-Nord & Laurentides",
    description:
      "Le réseau de chauffeurs indépendants rattachés à nos services assure un quadrillage optimal des secteurs clés pour minimiser les délais d'attente à l'embarquement, peu importe l'heure.",
  },
  {
    title: "🤝 Transparence tarifaire à Laval, Rive-Nord & Laurentides",
    description:
      "Pas de frais cachés ni de mauvaises surprises. Nos répartiteurs et nos chauffeurs appliquent des barèmes clairs et justes pour l'ensemble des services de transport et d'assistance.",
  },
  {
    title: "Service 24/7 à Laval, Rive-Nord & Laurentides",
    description:
      "Une centrale de répartition opérationnelle jour et nuit, 365 jours par année pour encadrer vos imprévus routiers ou professionnels.",
  },
  {
    title: "Experts de Quartier à Laval, Rive-Nord & Laurentides",
    description:
      "Une connaissance fine des rues secondaires et des raccourcis de Chomedey, Fabreville, Vimont et Sainte-Dorothée pour éviter les congestions récurrentes.",
  },
  {
    title: "Équipements de Pointe pour Taxi à Laval, Rive-Nord & Laurentides",
    description:
      "Utilisation d'outils professionnels calibrés pour intervenir sur les véhicules récents et haut de gamme sans causer d'anomalies de tension.",
  },
];

export default function FrenchHomePage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="relative flex min-h-[600px] items-center overflow-hidden bg-[#1e3a5f]">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
          <div className="relative z-10 mx-auto max-w-7xl px-5 py-16">
            <div className="max-w-xl text-white">
              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
                🚖 #1 TAXI CHOMEDEY | Service de Taxi & Assistance Routière 24h/24
                7j/7 à Laval, Rive-Nord & Laurentides
              </h1>
              <p className="mb-6 text-base leading-relaxed text-white/95">
                TAXI CHOMEDEY répond à vos besoins de transport local ou d&apos;aide
                d&apos;urgence sur la route. Votre chauffeur offre un service rapide et
                fiable à Laval, Boisbriand, Saint-Eustache, Blainville, Terrebonne,
                Mascouche, Repentigny, Saint-Jérôme, Mirabel, Sainte-Agathe-des-Monts,
                Mont-Tremblant et sur toute la Rive-Nord. Nous sommes disponibles
                24h/24 et 7j/7.
              </p>
              <h3 className="mb-5 text-xl font-semibold text-[#e6b422]">
                Service 24/7 - Contactez-nous maintenant!
              </h3>
              <div className="mb-6 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-white/10 px-3 py-1">
                  ✅ Fondé en 2020
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  🚖 50+ Véhicules partenaires
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  ⏱️ Intervention Express
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  🔒 Chauffeurs d&apos;expérience
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+15142396512"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5"
                >
                  📞 Appeler maintenant
                </a>
                <Link
                  href="/fr/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#e6b422] bg-white px-8 py-4 text-lg font-semibold text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">
              Nos Services de Taxi et d&apos;Urgence Routière à Laval, Rive-Nord &
              Laurentides
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group rounded-xl border-l-4 border-transparent bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#e6b422] hover:shadow-md"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1e3a5f] text-2xl text-white">
                    🚖
                  </div>
                  <h3 className="mb-3 text-center text-lg font-semibold text-[#e6b422]">
                    {service.title}
                  </h3>
                  <p className="text-center text-sm leading-relaxed text-[#4a627a]">
                    {service.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="bg-[#f9f9f8] py-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">
              Pourquoi choisir TAXI CHOMEDEY à Laval, Rive-Nord & Laurentides ?
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border-l-4 border-[#e6b422] bg-white p-7 transition hover:-translate-y-1"
                >
                  <h3 className="mb-3 text-lg font-semibold text-[#e6b422]">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4a627a]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Phone CTA */}
        <section className="bg-[#1e3a5f] py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-5 text-center md:flex-row md:text-left">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Demandez un estimé gratuit par téléphone ou par courriel!
            </h2>
            <a
              href="tel:+15142396512"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5"
            >
              📞 514-239-6512
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
