import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  getComboFr,
  getAllComboSlugsFr,
  comboServicesFr,
  frToEnServiceSlug,
} from "@/data/combos";
import { cities } from "@/data/cities";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllComboSlugsFr().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const combo = getComboFr(slug);
  if (!combo) return { title: "Page non trouvée" };

  const { service, city } = combo;
  const enSlug = frToEnServiceSlug[service.slug] ?? service.slug;
  return {
    title: `TAXI CHOMEDEY | ${service.titlePartFr} à ${city.nameFr} – 24h/24 7j/7`,
    description: `${service.titlePartFr} à ${city.nameFr}. ${service.descFr} Appelez TAXI CHOMEDEY : 514-239-6512`,
    alternates: {
      canonical: `https://besttaxilaval.ca/fr/${slug}`,
      languages: {
        fr: `https://besttaxilaval.ca/fr/${slug}`,
        en: `https://besttaxilaval.ca/en/${enSlug}-${city.slug}`,
      },
    },
  };
}

export default async function ComboFrPage({ params }: Props) {
  const { slug } = await params;
  const combo = getComboFr(slug);
  if (!combo) notFound();

  const { service, city } = combo;

  return (
    <>
      <Header />
      <main>
        <section className="bg-[#1e3a5f] py-16 text-center text-white">
          <div className="mx-auto max-w-7xl px-5">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {service.titlePartFr} à {city.nameFr} – 24h/24 7j/7
            </h1>
            <p className="mb-6 text-lg text-white/90">
              TAXI CHOMEDEY – Intervention rapide à {city.nameFr}
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-4">
              <a
                href="tel:+15142396512"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5"
              >
                📞 514-239-6512
              </a>
              <a
                href="mailto:contact@besttaxilaval.ca"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white px-8 py-4 text-lg font-semibold text-[#1e3a5f] transition hover:bg-transparent hover:text-white"
              >
                ✉️ contact@besttaxilaval.ca
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm">
                ✓ Fondé en 2020
              </span>
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm">
                🚖 50+ véhicules
              </span>
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm">
                ⭐ 4.9/5 (850+ avis)
              </span>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="rounded-xl bg-[#f9f9f8] p-8">
                <h2 className="mb-5 text-2xl font-bold text-[#e6b422]">
                  {service.titlePartFr} à {city.nameFr}
                </h2>
                <p className="mb-6 leading-relaxed text-[#4a627a]">
                  {service.descFr} Service disponible 24h/24 et 7j/7 à{" "}
                  {city.nameFr} et dans toute la région de Laval, Rive-Nord et
                  Laurentides. Appelez le 514-239-6512 pour une intervention
                  rapide.
                </p>
                <h3 className="mb-3 text-lg font-semibold text-[#1e3a5f]">
                  Pourquoi nous choisir à {city.nameFr} ?
                </h3>
                <ul className="mb-6 list-disc space-y-2 pl-5 text-[#4a627a]">
                  <li>Intervention rapide 24/7</li>
                  <li>Chauffeurs d&apos;expérience</li>
                  <li>Tarifs clairs et transparents</li>
                  <li>Service local à {city.nameFr}</li>
                </ul>
                <Link
                  href={`/fr/${service.path}`}
                  className="text-sm font-medium text-[#e6b422] hover:underline"
                >
                  En savoir plus sur {service.name} →
                </Link>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                <div className="mb-4 text-2xl font-extrabold text-[#e6b422]">
                  Tarif – Appelez pour un estimé
                </div>
                <p className="mb-6 text-[#4a627a]">
                  Estimé gratuit par téléphone pour {city.nameFr}
                </p>
                <a
                  href="tel:+15142396512"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5"
                >
                  📞 514-239-6512
                </a>
                <div className="mt-10 space-y-2 border-t border-gray-100 pt-6 text-left text-sm text-[#4a627a]">
                  <p>✓ Plus de 10 ans d&apos;expérience</p>
                  <p>✓ Flotte de 50+ véhicules</p>
                  <p>✓ 4.9/5 sur plus de 850 avis</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="mb-4 text-lg font-semibold text-[#1e3a5f]">
                Autres services à {city.nameFr}
              </h3>
              <div className="flex flex-wrap gap-2">
                {comboServicesFr
                  .filter((s) => s.slug !== service.slug)
                  .map((s) => (
                    <Link
                      key={s.slug}
                      href={`/fr/${s.slug}-${city.slug}`}
                      className="rounded-full bg-[#f9f9f8] px-4 py-2 text-sm text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white"
                    >
                      {s.name} {city.nameFr}
                    </Link>
                  ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-[#1e3a5f]">
                {service.titlePartFr} dans d&apos;autres villes
              </h3>
              <div className="flex flex-wrap gap-2">
                {cities
                  .filter((c) => c.slug !== city.slug)
                  .slice(0, 12)
                  .map((c) => (
                    <Link
                      key={c.slug}
                      href={`/fr/${service.slug}-${c.slug}`}
                      className="rounded-full bg-[#f9f9f8] px-4 py-2 text-sm text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white"
                    >
                      {service.titlePartFr} {c.nameFr}
                    </Link>
                  ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href={`/fr/taxi-${city.slug}`}
                className="mr-4 inline-block rounded-full border-2 border-[#e6b422] px-6 py-3 font-medium text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white"
              >
                Taxi {city.nameFr}
              </Link>
              <Link
                href="/fr"
                className="inline-block rounded-full bg-[#e6b422] px-6 py-3 font-medium text-white transition hover:bg-[#d4a017]"
              >
                ← Accueil
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
