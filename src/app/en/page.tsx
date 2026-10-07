import HeaderEn from "@/components/HeaderEn";
import FooterEn from "@/components/FooterEn";
import Link from "next/link";
import { cities } from "@/data/cities";
import { enHome as h } from "@/data/home-en";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: h.title,
  description: h.description,
  alternates: {
    canonical: "https://besttaxilaval.ca/en",
    languages: { fr: "https://besttaxilaval.ca/fr", en: "https://besttaxilaval.ca/en" },
  },
};

const territory = [
  { name: "Chomedey", emoji: "🚖", slug: "chomedey" },
  { name: "Laval-des-Rapides", emoji: "🏙️", slug: "laval-des-rapides" },
  { name: "Sainte-Dorothée", emoji: "🌳", slug: "sainte-dorothee" },
  { name: "Duvernay", emoji: "🏡", slug: "duvernay" },
  { name: "Pont-Viau", emoji: "🌉", slug: "pont-viau" },
  { name: "Saint-Vincent-de-Paul", emoji: "⛪", slug: "saint-vincent-de-paul" },
  { name: "Saint-François", emoji: "🏞️", slug: "saint-francois" },
  { name: "Sainte-Rose", emoji: "🏘️", slug: "sainte-rose" },
  { name: "Fabreville", emoji: "🌲", slug: "fabreville" },
  { name: "Vimont", emoji: "🏥", slug: "vimont" },
  { name: "Laval-Ouest", emoji: "🌾", slug: "laval-ouest" },
  { name: "Laval-sur-le-Lac", emoji: "💧", slug: "laval-sur-le-lac" },
  { name: "Îles-Laval", emoji: "🏝️", slug: "iles-laval" },
  { name: "Auteuil", emoji: "🏠", slug: "auteuil" },
  { name: "Boisbriand", emoji: "🛍️", slug: "boisbriand" },
  { name: "Sainte-Thérèse", emoji: "📚", slug: "sainte-therese" },
  { name: "Saint-Eustache", emoji: "🏛️", slug: "saint-eustache" },
];

export default function EnglishHomePage() {
  return (
    <>
      <HeaderEn />
      <main>
        <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#1e3a5f]">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
          <div className="relative z-10 mx-auto max-w-7xl px-5 py-16">
            <div className="max-w-2xl text-white">
              <h1 className="mb-5 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{h.h1}</h1>
              <p className="mb-6 text-base leading-relaxed text-white/95">{h.hero}</p>
              <h3 className="mb-4 text-xl font-semibold text-[#e6b422]">{h.contactTitle}</h3>
              <div className="mb-6 flex flex-wrap gap-3 text-sm">
                {h.badges.map((b) => (
                  <span key={b} className="rounded-full bg-white/10 px-3 py-1">{b}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+15142396512" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-4 text-lg font-semibold text-white">📞 Call now</a>
                <Link href="/en/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-[#e6b422] bg-white px-8 py-4 text-lg font-semibold text-[#1e3a5f]">Contact</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">{h.servicesH2}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {h.services.map((s) => (
                <Link key={s.href} href={s.href} className="rounded-xl border-l-4 border-transparent bg-white p-6 shadow-sm transition hover:border-[#e6b422] hover:shadow-md">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1e3a5f] text-2xl text-white">🚖</div>
                  <h3 className="mb-3 text-center text-lg font-semibold text-[#e6b422]">{s.title}</h3>
                  <p className="text-center text-sm text-[#4a627a]">{s.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f9f9f8] py-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">{h.expertiseH2}</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {h.expertise.map((x) => (
                <div key={x.title} className="rounded-xl bg-white p-7 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-[#e6b422]">{x.title}</h3>
                  <p className="text-sm text-[#4a627a]">{x.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">{h.guideH2}</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {h.guide.map((x) => (
                <div key={x.title}>
                  <h3 className="mb-3 text-lg font-semibold text-[#e6b422]">{x.title}</h3>
                  <p className="text-sm text-[#4a627a]">{x.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f9f9f8] py-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">{h.destH2}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {h.destinations.map((d) => (
                <div key={d.title} className="rounded-xl border-l-4 border-[#e6b422] bg-white p-6">
                  <div className="mb-2 text-3xl">{d.emoji}</div>
                  <h3 className="mb-2 text-lg font-semibold text-[#1e3a5f]">{d.title}</h3>
                  <p className="text-sm text-[#4a627a]">{d.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">{h.safetyH2}</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {h.safety.map((x) => (
                <div key={x.title} className="rounded-xl bg-[#f9f9f8] p-6">
                  <h3 className="mb-3 text-lg font-semibold text-[#e6b422]">{x.title}</h3>
                  <p className="text-sm text-[#4a627a]">{x.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f9f9f8] py-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">{h.socialH2}</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {h.social.map((x) => (
                <div key={x.title}>
                  <h3 className="mb-3 text-lg font-semibold text-[#e6b422]">{x.title}</h3>
                  <p className="text-sm text-[#4a627a]">{x.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">{h.whyH2}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {h.why.map((x) => (
                <div key={x.title} className="rounded-xl border-l-4 border-[#e6b422] bg-[#f9f9f8] p-7">
                  <h3 className="mb-3 text-lg font-semibold text-[#e6b422]">{x.title}</h3>
                  <p className="text-sm text-[#4a627a]">{x.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f9f9f8] py-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">{h.territoryH2}</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {territory.map((t) => (
                <Link key={t.slug} href={`/en/taxi-${t.slug}`} className="flex flex-col items-center rounded-xl bg-white p-5 text-center shadow-sm hover:shadow-md">
                  <span className="mb-2 text-3xl">{t.emoji}</span>
                  <span className="text-sm font-semibold text-[#1e3a5f]">{t.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {cities.map((c) => (
                <Link key={c.slug} href={`/en/taxi-${c.slug}`} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#1e3a5f] hover:bg-[#e6b422] hover:text-white">
                  Taxi {c.nameEn}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="mb-4 text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">{h.testimonialsH2}</h2>
            <p className="mb-12 text-center text-[#4a627a]">{h.testimonialsSub}</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {h.testimonials.map((t) => (
                <div key={t.name} className="rounded-xl border border-gray-100 bg-[#f9f9f8] p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a5f] text-sm font-bold text-white">{t.initials}</div>
                    <div>
                      <div className="font-semibold text-[#1e3a5f]">{t.name}</div>
                      <div className="text-xs text-[#4a627a]">{t.date}</div>
                    </div>
                  </div>
                  <div className="mb-2 text-[#e6b422]">★★★★★</div>
                  <p className="text-sm text-[#4a627a]">{t.text}</p>
                  {t.reply && (
                    <p className="mt-3 border-t border-gray-200 pt-3 text-xs italic text-[#4a627a]">
                      <strong>Owner&apos;s reply:</strong> {t.reply}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1e3a5f] py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-5 text-center md:flex-row md:text-left">
            <h2 className="text-3xl font-bold text-white md:text-4xl">{h.cta}</h2>
            <a href="tel:+15142396512" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-4 text-lg font-semibold text-white">📞 514-239-6512</a>
          </div>
        </section>
      </main>
      <FooterEn />
    </>
  );
}
