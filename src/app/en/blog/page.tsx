import HeaderEn from "@/components/HeaderEn";
import FooterEn from "@/components/FooterEn";
import Link from "next/link";
import { SchemaOrg } from "@/components/SchemaOrg";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import { blogPostsEn } from "@/data/blog-posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taxi Tips & Fares — Blog | Taxi Chomedey",
  description:
    "Laval taxi tips: how much is a taxi Laval → YUL airport, battery boost, drive-home service after a night out. Official CTQ rates, tips, FAQ.",
  alternates: {
    canonical: "https://besttaxilaval.ca/en/blog",
    languages: {
      fr: "https://besttaxilaval.ca/fr/blog",
      en: "https://besttaxilaval.ca/en/blog",
    },
  },
};

export default function BlogIndexPageEn() {
  return (
    <>
      <SchemaOrg
        schemas={[
          localBusinessSchema,
          breadcrumbSchema([
            { name: "Home", url: "https://besttaxilaval.ca/en" },
            { name: "Tips", url: "https://besttaxilaval.ca/en/blog" },
          ]),
        ]}
      />
      <HeaderEn />
      <main>
        {/* Hero */}
        <section className="bg-[#1e3a5f] py-12 text-center text-white md:py-16">
          <div className="mx-auto max-w-4xl px-5">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Taxi Tips &amp; Fares
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-base text-white/80 md:text-lg">
              Everything about Laval taxi fares, battery boost, drive-home
              service after a night out, and more. Articles based on official
              CTQ 2026 rates.
            </p>
          </div>
        </section>

        {/* Articles list */}
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-5">
            <div className="grid gap-6 md:grid-cols-2">
              {blogPostsEn.map((post) => (
                <Link
                  key={post.slug}
                  href={`/en/blog/${post.slug}`}
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
                      {new Date(post.date).toLocaleDateString("en-CA", {
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
              <h2 className="mb-3 text-xl font-bold">Need a price now?</h2>
              <p className="mb-4 text-sm text-white/80">
                Chat with our virtual agent — response in 30 seconds.
              </p>
              <Link
                href="/en/taxi-calculator"
                className="inline-block rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-3 font-semibold text-white transition hover:-translate-y-0.5"
              >
                Calculate my fare →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterEn />
    </>
  );
}
