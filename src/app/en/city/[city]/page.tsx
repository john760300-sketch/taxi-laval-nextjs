import HeaderEn from "@/components/HeaderEn";
import FooterEn from "@/components/FooterEn";
import Link from "next/link";
import { cities, getCity, getAllCitySlugs, servicesEn } from "@/data/cities";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ city: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) return { title: "City not found" };

  return {
    title: `TAXI CHOMEDEY | Taxi ${city.nameEn} – 24/7 Service | Laval, North Shore & Laurentians`,
    description: `Taxi and roadside assistance 24/7 in ${city.nameEn}. Local transport, YUL airport, battery boost, door unlocking. Call TAXI CHOMEDEY: 514-239-6512`,
    alternates: {
      canonical: `https://besttaxilaval.ca/en/taxi-${city.slug}`,
      languages: {
        fr: `https://besttaxilaval.ca/fr/taxi-${city.slug}`,
        en: `https://besttaxilaval.ca/en/taxi-${city.slug}`,
      },
    },
  };
}

export default async function TaxiCityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();

  return (
    <>
      <HeaderEn />
      <main>
        <section className="bg-[#1e3a5f] py-16 text-center text-white">
          <div className="mx-auto max-w-7xl px-5">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Taxi {city.nameEn} – 24/7 Service
            </h1>
            <p className="mb-6 text-lg text-white/90">
              TAXI CHOMEDEY in {city.nameEn} – Local transport, airport, roadside
              assistance
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
                ✓ Founded in 2020
              </span>
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm">
                🚖 50+ vehicles
              </span>
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm">
                ⭐ 4.9/5 (850+ reviews)
              </span>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-12 max-w-3xl">
              <h2 className="mb-4 text-2xl font-bold text-[#e6b422]">
                Taxi service in {city.nameEn}
              </h2>
              <p className="leading-relaxed text-[#4a627a]">
                TAXI CHOMEDEY offers complete taxi and roadside assistance in{" "}
                {city.nameEn}. Whether you need local transport, a trip to
                Montréal-Trudeau Airport (YUL), a battery boost or door unlocking,
                our drivers respond quickly 24/7.
              </p>
            </div>

            <h2 className="mb-8 text-2xl font-bold text-[#1e3a5f]">
              Our services in {city.nameEn}
            </h2>
            <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {servicesEn.map((s) => (
                <Link
                  key={s.slug}
                  href={`/en/${s.path}`}
                  className="rounded-xl border-l-4 border-transparent bg-[#f9f9f8] p-5 transition hover:border-[#e6b422] hover:shadow-md"
                >
                  <h3 className="font-semibold text-[#e6b422]">{s.name}</h3>
                  <p className="mt-1 text-sm text-[#4a627a]">
                    Available 24/7 in {city.nameEn}
                  </p>
                </Link>
              ))}
            </div>

            <h2 className="mb-8 text-2xl font-bold text-[#1e3a5f]">
              Other cities served
            </h2>
            <div className="flex flex-wrap gap-2">
              {cities
                .filter((c) => c.slug !== city.slug)
                .slice(0, 20)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/en/taxi-${c.slug}`}
                    className="rounded-full bg-[#f9f9f8] px-4 py-2 text-sm text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white"
                  >
                    Taxi {c.nameEn}
                  </Link>
                ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/en"
                className="inline-block rounded-full bg-[#e6b422] px-6 py-3 font-medium text-white transition hover:bg-[#d4a017]"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterEn />
    </>
  );
}
