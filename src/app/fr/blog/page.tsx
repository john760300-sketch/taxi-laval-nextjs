import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { SchemaOrg } from "@/components/SchemaOrg";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import { blogPostsFr } from "@/data/blog-posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conseils & Tarifs Taxi — Blog | Taxi Chomedey",
  description:
    "Conseils taxi à Laval : combien coûte un taxi Laval → aéroport YUL, survoltage de batterie, raccompagnement après soirée. Tarifs officiels CTQ, astuces, FAQ.",
  alternates: {
    canonical: "https://besttaxilaval.ca/fr/blog",
    languages: {
      fr: "https://besttaxilaval.ca/fr/blog",
      en: "https://besttaxilaval.ca/en/blog",
        "x-default": "https://besttaxilaval.ca/fr/blog",
      },
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          localBusinessSchema,
          breadcrumbSchema([
            { name: "Accueil", url: "https://besttaxilaval.ca/fr" },
            { name: "Conseils", url: "https://besttaxilaval.ca/fr/blog" },
          ]),
        ]}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-[#1e3a5f] py-12 text-center text-white md:py-16">
          <div className="mx-auto max-w-4xl px-5">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Conseils &amp; Tarifs Taxi
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-base text-white/80 md:text-lg">
              Tout savoir sur les tarifs taxi à Laval, le survoltage de
              batterie, le raccompagnement après soirée, et plus. Articles
              basés sur les tarifs officiels CTQ 2026.
            </p>
          </div>
        </section>

        {/* Articles list */}
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-5">
            <div className="grid gap-6 md:grid-cols-2">
              {blogPostsFr.map((post) => (
                <Link
                  key={post.slug}
                  href={`/fr/blog/${post.slug}`}
                  className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition hover:border-[#e6b422] hover:shadow-md"
                >
                  <div className="mb-2 inline-block w-fit rounded-full bg-[#1e3a5f]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1e3a5f]">
                    {post.category}
                  </div>
                  <h2 className="mb-2 text-lg font-bold text-[#1e3a5f] group-hover:text-[#e6b422]">
                    {post.title}
                  </h2>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-[#4a627a]">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[#718096]">
                    <span>
                      {new Date(post.date).toLocaleDateString("fr-CA", {
                        dateStyle: "long",
                      })}
                    </span>
                    <span>{post.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-xl bg-[#1e3a5f] p-8 text-center text-white">
              <h2 className="mb-3 text-xl font-bold">
                Besoin d&apos;un prix maintenant ?
              </h2>
              <p className="mb-4 text-sm text-white/80">
                Discutez avec notre agent virtuel — réponse en 30 secondes.
              </p>
              <Link
                href="/fr/calculatrice-taxi"
                className="inline-block rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-3 font-semibold text-white transition hover:-translate-y-0.5"
              >
                Calculer mon prix →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
