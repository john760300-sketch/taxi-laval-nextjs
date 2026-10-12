import HeaderEn from "@/components/HeaderEn";
import FooterEn from "@/components/FooterEn";
import Link from "next/link";
import {
  getComboEn,
  getAllComboSlugsEn,
  comboServicesEn,
  enToFrServiceSlug,
} from "@/data/combos";
import { cities } from "@/data/cities";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllComboSlugsEn().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const combo = getComboEn(slug);
  if (!combo) return { title: "Page not found" };

  const { service, city } = combo;
  const frSlug = enToFrServiceSlug[service.slug] ?? service.slug;
  return {
    title: `TAXI CHOMEDEY | ${service.titlePartEn} in ${city.nameEn} – 24/7`,
    description: `${service.titlePartEn} in ${city.nameEn}. ${service.descEn} Call TAXI CHOMEDEY: 514-239-6512`,
    alternates: {
      canonical: `https://besttaxilaval.ca/en/${slug}`,
      languages: {
        fr: `https://besttaxilaval.ca/fr/${frSlug}-${city.slug}`,
        en: `https://besttaxilaval.ca/en/${slug}`,
      },
    },
  };
}

export default async function ComboEnPage({ params }: Props) {
  const { slug } = await params;
  const combo = getComboEn(slug);
  if (!combo) notFound();

  const { service, city } = combo;

  return (
    <>
      <HeaderEn />
      <main>
        <section className="bg-[#1e3a5f] py-16 text-center text-white">
          <div className="mx-auto max-w-7xl px-5">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {service.titlePartEn} in {city.nameEn} – 24/7
            </h1>
            <p className="mb-6 text-lg text-white/90">
              TAXI CHOMEDEY – Fast response in {city.nameEn}
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
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="rounded-xl bg-[#f9f9f8] p-8">
                <h2 className="mb-5 text-2xl font-bold text-[#e6b422]">
                  {service.titlePartEn} in {city.nameEn}
                </h2>
                <p className="mb-6 leading-relaxed text-[#4a627a]">
                  {service.descEn} Available 24/7 in {city.nameEn} and throughout
                  Laval, the North Shore and the Laurentians. Call 514-239-6512
                  for a fast response.
                </p>
                <h3 className="mb-3 text-lg font-semibold text-[#1e3a5f]">
                  Why choose us in {city.nameEn}?
                </h3>
                <ul className="mb-6 list-disc space-y-2 pl-5 text-[#4a627a]">
                  <li>Fast 24/7 response</li>
                  <li>Experienced drivers</li>
                  <li>Clear, transparent rates</li>
                  <li>Local service in {city.nameEn}</li>
                </ul>
                <Link
                  href={`/en/${service.path}`}
                  className="text-sm font-medium text-[#e6b422] hover:underline"
                >
                  Learn more about {service.name} →
                </Link>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                <div className="mb-4 text-2xl font-extrabold text-[#e6b422]">
                  Rate – Call for an estimate
                </div>
                <p className="mb-6 text-[#4a627a]">
                  Free estimate by phone for {city.nameEn}
                </p>
                <a
                  href="tel:+15142396512"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5"
                >
                  📞 514-239-6512
                </a>
                <div className="mt-10 space-y-2 border-t border-gray-100 pt-6 text-left text-sm text-[#4a627a]">
                  <p>✓ Over 10 years of experience</p>
                  <p>✓ Fleet of 50+ vehicles</p>
                  <p>✓ 4.9/5 from 850+ reviews</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="mb-4 text-lg font-semibold text-[#1e3a5f]">
                Other services in {city.nameEn}
              </h3>
              <div className="flex flex-wrap gap-2">
                {comboServicesEn
                  .filter((s) => s.slug !== service.slug)
                  .map((s) => (
                    <Link
                      key={s.slug}
                      href={`/en/${s.slug}-${city.slug}`}
                      className="rounded-full bg-[#f9f9f8] px-4 py-2 text-sm text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white"
                    >
                      {s.name} {city.nameEn}
                    </Link>
                  ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-[#1e3a5f]">
                {service.titlePartEn} in other cities
              </h3>
              <div className="flex flex-wrap gap-2">
                {cities
                  .filter((c) => c.slug !== city.slug)
                  .slice(0, 12)
                  .map((c) => (
                    <Link
                      key={c.slug}
                      href={`/en/${service.slug}-${c.slug}`}
                      className="rounded-full bg-[#f9f9f8] px-4 py-2 text-sm text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white"
                    >
                      {service.titlePartEn} {c.nameEn}
                    </Link>
                  ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href={`/en/taxi-${city.slug}`}
                className="mr-4 inline-block rounded-full border-2 border-[#e6b422] px-6 py-3 font-medium text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white"
              >
                Taxi {city.nameEn}
              </Link>
              <Link
                href="/en"
                className="inline-block rounded-full bg-[#e6b422] px-6 py-3 font-medium text-white transition hover:bg-[#d4a017]"
              >
                ← Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterEn />
    </>
  );
}
