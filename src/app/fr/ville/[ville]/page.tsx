import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { cities, getCity, getAllCitySlugs, servicesFr } from "@/data/cities";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ ville: string }>;
};

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ ville: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params;
  const city = getCity(ville);
  if (!city) return { title: "Ville non trouvée" };

  return {
    title: `TAXI CHOMEDEY | Taxi ${city.nameFr} – Service 24h/24 7j/7 | Laval, Rive-Nord & Laurentides`,
    description: `Service de taxi et assistance routière 24/7 à ${city.nameFr}. Transport local, aéroport YUL, survoltage batterie, déverrouillage de portière. Appelez TAXI CHOMEDEY : 514-239-6512`,
    alternates: {
      canonical: `https://besttaxilaval.ca/fr/taxi-${city.slug}`,
      languages: {
        fr: `https://besttaxilaval.ca/fr/taxi-${city.slug}`,
        en: `https://besttaxilaval.ca/en/taxi-${city.slug}`,
      },
    },
  };
}

export default async function TaxiVillePage({ params }: Props) {
  const { ville } = await params;
  const city = getCity(ville);
  if (!city) notFound();

  return (
    <>
      <Header />
      <main>
        <section className="bg-[#1e3a5f] py-16 text-center text-white">
          <div className="mx-auto max-w-7xl px-5">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Taxi {city.nameFr} – Service 24h/24 7j/7
            </h1>
            <p className="mb-6 text-lg text-white/90">
              TAXI CHOMEDEY à {city.nameFr} – Transport local, aéroport, assistance
              routière
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-4">
              <a
                href="tel:+15142396512"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5"
              >
                📞 514-239-6512
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
            <div className="mb-12 max-w-3xl">
              <h2 className="mb-4 text-2xl font-bold text-[#e6b422]">
                Service de taxi à {city.nameFr}
              </h2>
              <p className="leading-relaxed text-[#4a627a]">
                TAXI CHOMEDEY offre un service de taxi et d&apos;assistance routière
                complet à {city.nameFr}. Que vous ayez besoin d&apos;un transport local,
                d&apos;un trajet vers l&apos;aéroport Montréal-Trudeau (YUL), d&apos;un survoltage
                de batterie ou d&apos;un déverrouillage de portière, nos chauffeurs
                interviennent rapidement 24h/24 et 7j/7.
              </p>
            </div>

            <h2 className="mb-8 text-2xl font-bold text-[#1e3a5f]">
              Nos services à {city.nameFr}
            </h2>
            <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {servicesFr.map((s) => (
                <Link
                  key={s.slug}
                  href={`/fr/${s.path}`}
                  className="rounded-xl border-l-4 border-transparent bg-[#f9f9f8] p-5 transition hover:border-[#e6b422] hover:shadow-md"
                >
                  <h3 className="font-semibold text-[#e6b422]">{s.name}</h3>
                  <p className="mt-1 text-sm text-[#4a627a]">
                    Disponible 24/7 à {city.nameFr}
                  </p>
                </Link>
              ))}
            </div>

            <h2 className="mb-8 text-2xl font-bold text-[#1e3a5f]">
              Autres villes desservies
            </h2>
            <div className="flex flex-wrap gap-2">
              {cities
                .filter((c) => c.slug !== city.slug)
                .slice(0, 20)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/fr/taxi-${c.slug}`}
                    className="rounded-full bg-[#f9f9f8] px-4 py-2 text-sm text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white"
                  >
                    Taxi {c.nameFr}
                  </Link>
                ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/fr"
                className="inline-block rounded-full bg-[#e6b422] px-6 py-3 font-medium text-white transition hover:bg-[#d4a017]"
              >
                ← Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
