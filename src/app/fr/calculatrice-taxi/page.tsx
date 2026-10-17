import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TaxiFareForm } from "@/components/TaxiFareForm";
import { ChatAgent } from "@/components/ChatAgent";
import { SchemaOrg } from "@/components/SchemaOrg";
import {
  localBusinessSchema,
  fareAgentSchema,
  faqSchema,
  breadcrumbSchema,
  serviceSchema,
} from "@/lib/schema";
import { CtqLink } from "@/components/CtqLink";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Calculatrice Taxi — Calculez le prix de votre course avec Taxi, Uber et Lyft",
  description:
    "Calculatrice taxi Laval : comparez le prix de votre course avec Taxi (tarif CTQ), Uber et Lyft. Prix fixe aligné sur UberX, sans surge. Service 24/7 à Laval, Rive-Nord & Laurentides.",
  alternates: {
    canonical: "https://besttaxilaval.ca/fr/calculatrice-taxi",
    languages: {
      fr: "https://besttaxilaval.ca/fr/calculatrice-taxi",
      en: "https://besttaxilaval.ca/en/taxi-calculator",
    },
  },
};

const SEO_FAQS = [
  {
    q: "Combien coûte un taxi de Laval à l'aéroport YUL ?",
    a: "Entre 47 $ et 65 $ le jour (5h–23h), 49 $ à 65 $ la nuit (23h–5h), selon le quartier de Laval et la circulation. Le prix fixe = max(UberX pointe, compteur CTQ). Paiement comptant = 3,4 % de remise.",
  },
  {
    q: "Comment est calculé le tarif taxi ?",
    a: "Le tarif suit le barème officiel CTQ : prise en charge (4,10 $ jour / 4,70 $ nuit) + redevance (1,05 $) + 2,05 $/km jour (2,35 $ nuit) ou 0,77 $/min (0,89 $ nuit). Sous 22,5 km/h, le compteur charge le temps ; au-dessus, la distance. Notre prix fixe = max(UberX pointe, compteur CTQ).",
  },
  {
    q: "Puis-je payer comptant ?",
    a: "Oui. Le paiement comptant vous donne 3,4 % de remise (frais de terminal carte enlevés). Par exemple, un prix fixe de 60 $ carte devient 58,03 $ comptant.",
  },
  {
    q: "Le prix change-t-il la nuit ?",
    a: "Oui. Le tarif CTQ nuit (23h–5h) est environ 15 % plus cher que le tarif jour. La prise en charge passe de 4,10 $ à 4,70 $, le km de 2,05 $ à 2,35 $, la minute de 0,77 $ à 0,89 $.",
  },
  {
    q: "Y a-t-il un supplément pour les bagages ?",
    a: "Non. Le tarif CTQ ne prévoit aucun supplément bagage. Le prix est le même pour 1 passager sans valise ou 4 passagers avec valises.",
  },
  {
    q: "Quelle zone dessert la calculatrice taxi ?",
    a: "Toute la région de Laval, la Rive-Nord (Boisbriand, Saint-Eustache, Blainville, Terrebonne, Mascouche, Sainte-Thérèse) et les Laurentides (Saint-Jérôme, Mirabel, Mont-Tremblant). 30 villes desservies.",
  },
];

const PRICING_ROUTES = [
  { from: "Laval (Chomedey)", to: "Aéroport YUL (Dorval)", distance: "22 km", duration: "27 min", priceDay: "~$47-65", priceNight: "~$49-65" },
  { from: "Laval (Sainte-Rose)", to: "Aéroport YUL", distance: "27 km", duration: "32 min", priceDay: "~$55-75", priceNight: "~$58-77" },
  { from: "Laval", to: "Centre-ville Montréal", distance: "18 km", duration: "25 min", priceDay: "~$36-65", priceNight: "~$36-65" },
  { from: "Boisbriand", to: "Aéroport YUL", distance: "42 km", duration: "45 min", priceDay: "~$81-114", priceNight: "~$88-124" },
  { from: "Saint-Jérôme", to: "Aéroport YUL", distance: "60 km", duration: "55 min", priceDay: "~$110-162", priceNight: "~$124-182" },
  { from: "Mont-Tremblant", to: "Aéroport YUL", distance: "135 km", duration: "95 min", priceDay: "~$252-313", priceNight: "~$288-359" },
];

export default function CalculerPrixPage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          localBusinessSchema,
          fareAgentSchema,
          serviceSchema({
            name: "Calculatrice de tarif taxi — Taxi Chomedey",
            description:
              "Calculateur de tarif taxi en temps réel. Tarif officiel CTQ, prix fixe aligné sur UberX, sans surge. Service 24/7 à Laval, Rive-Nord & Laurentides.",
            url: "https://besttaxilaval.ca/fr/calculatrice-taxi",
            serviceType: "Taxi fare calculator",
            offers: [
              {
                name: "Calcul de tarif taxi",
                description: "Calcul gratuit, sans engagement. Tarif CTQ officiel + comparaison UberX/Lyft.",
                priceCurrency: "CAD",
                price: "0",
              },
            ],
          }),
          faqSchema(SEO_FAQS.map((f) => f.q)),
          breadcrumbSchema([
            { name: "Accueil", url: "https://besttaxilaval.ca/fr" },
            { name: "Calculatrice taxi", url: "https://besttaxilaval.ca/fr/calculatrice-taxi" },
          ]),
        ]}
      />
      <Header />
      <main>
        {/* Hero + Form */}
        <section className="bg-[#1e3a5f] py-12 text-white md:py-16">
          <div className="mx-auto max-w-4xl px-5">
            <div className="mb-8 text-center">
              <h1 className="mb-3 text-2xl font-bold leading-tight md:text-4xl">
                Calculatrice Taxi — Calculez le prix de votre course avec Taxi, Uber et Lyft
              </h1>
              <p className="mx-auto max-w-2xl text-sm text-white/80 md:text-base">
                Comparez le prix de votre course en temps réel : tarif Taxi
                officiel CTQ, UberX et Lyft. Prix fixe garanti, sans surge.
                Service 24/7 à Laval, Rive-Nord &amp; Laurentides.
              </p>
            </div>

            {/* Form */}
            <TaxiFareForm lang="fr" />
          </div>
        </section>

        {/* SEO Content */}
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-5">
            <h2 className="mb-4 text-2xl font-bold text-[#1e3a5f]">
              Comment fonctionne notre calculatrice taxi ?
            </h2>
            <p className="mb-4 leading-relaxed text-[#4a627a]">
              Notre calculatrice de tarif taxi utilise le barème officiel de la
              Commission des transports du Québec (<CtqLink />). Le calcul prend en
              compte la distance réelle du trajet (via Mapbox, données de
              circulation en temps réel), la durée estimée, et l&apos;heure de
              départ pour déterminer le tarif jour (5h–23h) ou nuit (23h–5h).
            </p>
            <p className="mb-4 leading-relaxed text-[#4a627a]">
              Notre prix fixe est aligné sur UberX (tarif de pointe). La
              formule : <strong>prix fixe = max(UberX pointe, compteur <CtqLink />)</strong>.
              Vous ne payez jamais plus cher qu&apos;UberX en heure de pointe, et
              nous garantissons un revenu minimum au chauffeur. Le paiement
              comptant vous donne <strong>3,4 % de remise</strong> (frais de
              terminal carte enlevés).
            </p>

            {/* Pricing table */}
            <h2 className="mb-4 mt-10 text-2xl font-bold text-[#1e3a5f]">
              Tarifs taxi Laval — Montréal (2026)
            </h2>
            <p className="mb-4 text-sm text-[#4a627a]">
              Prix indicatifs. Le tarif exact dépend du quartier de départ,
              de la circulation et de l&apos;heure. Utilisez la calculatrice
              ci-dessus pour un prix exact.
            </p>
            <div className="mb-8 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-[#1e3a5f] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Trajet</th>
                    <th className="px-4 py-3 text-left font-semibold">Distance</th>
                    <th className="px-4 py-3 text-left font-semibold">Durée</th>
                    <th className="px-4 py-3 text-right font-semibold">Prix jour</th>
                    <th className="px-4 py-3 text-right font-semibold">Prix nuit</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_ROUTES.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f9f9f8]"}>
                      <td className="px-4 py-2.5 font-medium text-[#1e3a5f]">
                        {r.from} → {r.to}
                      </td>
                      <td className="px-4 py-2.5 text-[#4a627a]">{r.distance}</td>
                      <td className="px-4 py-2.5 text-[#4a627a]">{r.duration}</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-[#1e3a5f]">{r.priceDay}</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-slate-500">{r.priceNight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Why use our calculator */}
            <h2 className="mb-4 text-2xl font-bold text-[#1e3a5f]">
              Pourquoi utiliser notre calculatrice taxi ?
            </h2>
            <div className="mb-8 grid gap-3 sm:grid-cols-2">
              {[
                { icon: "✓", text: "Prix fixe garanti — pas de surprise" },
                { icon: "✓", text: "Sans surge — jamais de tarifs gonflés" },
                { icon: "✓", text: "Tarif officiel CTQ (Commission des transports du Québec)" },
                { icon: "✓", text: "Aligné sur UberX (pointe)" },
                { icon: "✓", text: "Remise comptant 3,4 %" },
                { icon: "✓", text: "Service 24/7 à Laval, Rive-Nord & Laurentides" },
                { icon: "✓", text: "Données de circulation en temps réel (Mapbox)" },
                { icon: "✓", text: "Comparaison UberX / Lyft incluse" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-[#f9f9f8] px-4 py-2.5 text-sm text-[#4a627a]">
                  <span className="font-bold text-[#e6b422]">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <h2 className="mb-4 text-2xl font-bold text-[#1e3a5f]">
              Questions fréquentes
            </h2>
            <div className="mb-8 space-y-3">
              {SEO_FAQS.map((faq, i) => (
                <details key={i} className="group rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-start justify-between gap-3 text-sm font-semibold text-[#1e3a5f]">
                      <span>{faq.q}</span>
                      <span className="text-[#e6b422] transition group-open:rotate-45">+</span>
                    </div>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-[#4a627a]">{faq.a}</p>
                </details>
              ))}
            </div>

            {/* Internal links */}
            <div className="rounded-xl bg-[#f9f9f8] p-6">
              <h3 className="mb-3 text-sm font-bold text-[#1e3a5f]">
                En savoir plus
              </h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/fr/blog/combien-coute-taxi-laval-aeroport-yul-2026" className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white">
                  📝 Combien coûte un taxi Laval → YUL ?
                </Link>
                <Link href="/fr/transport-aeroport" className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white">
                  ✈️ Transport aéroport YUL
                </Link>
                <Link href="/fr/survoltage-batterie" className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white">
                  🔋 Survoltage batterie ($35-$80)
                </Link>
                <Link href="/fr/deverrouillage-portiere" className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white">
                  🔑 Déverrouillage portière ($35-$120)
                </Link>
                <Link href="/fr/raccompagnement" className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white">
                  🚗 Raccompagnement
                </Link>
                <Link href="/fr/blog" className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white">
                  📖 Tous nos articles
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Chat agent (secondary option) */}
        <section className="bg-slate-50 py-12 md:py-16">
          <div className="mx-auto max-w-2xl px-5">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-2xl font-bold text-[#1e3a5f]">
                Préférez parler à un agent ?
              </h2>
              <p className="text-sm text-[#4a627a]">
                Discutez avec notre agent virtuel pour un devis personnalisé —
                il peut aussi calculer un tarif pour le survoltage, le
                déverrouillage et le raccompagnement.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center justify-between bg-[#1e3a5f] px-4 py-3 text-white">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#e6b422]" />
                    Agent Prix · Taxi Chomedey
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-300">
                    Prix fixe &amp; garanti · Aligné sur UberX
                  </div>
                </div>
                <a href="tel:+15142396512" className="text-xs font-semibold text-[#e6b422] hover:underline">
                  514-239-6512
                </a>
              </div>
              <ChatAgent />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
