import Link from "next/link";
import { SchemaOrg } from "@/components/SchemaOrg";
import {
  localBusinessSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import type { BlogPost, BlogSection } from "@/data/blog-posts";

/**
 * Reusable layout for a blog article — Header + content + Footer + schema.org.
 *
 * Server component (no interactivity needed — `<details>` is native HTML).
 *
 * Schema:
 * - Article (BlogPosting) — for rich results
 * - FAQPage — from the article's faqs[]
 * - BreadcrumbList — Home > Blog > Article
 * - LocalBusiness — site-wide (so Google associates the article with your business)
 */
export function BlogArticle({
  post,
  lang = "fr",
}: {
  post: BlogPost;
  lang?: "fr" | "en";
}) {
  const baseUrl = "https://besttaxilaval.ca";
  const blogPath = lang === "fr" ? "/fr/blog" : "/en/blog";
  const articleUrl = `${baseUrl}${blogPath}/${post.slug}`;
  const homeLabel = lang === "fr" ? "Accueil" : "Home";
  const blogLabel = lang === "fr" ? "Conseils" : "Tips";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Taxi Chomedey",
      logo: {
        "@type": "ImageObject",
        url: "https://besttaxilaval.ca/images/logo.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    image: "https://besttaxilaval.ca/images/logo.jpg",
  };

  return (
    <>
      <SchemaOrg
        schemas={[
          articleSchema,
          localBusinessSchema,
          faqSchema(post.faqs.map((f) => f.q)),
          breadcrumbSchema([
            { name: homeLabel, url: `${baseUrl}${lang === "fr" ? "/fr" : "/en"}` },
            { name: blogLabel, url: `${baseUrl}${blogPath}` },
            { name: post.title, url: articleUrl },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="bg-[#1e3a5f] py-12 text-white md:py-16">
        <div className="mx-auto max-w-3xl px-5">
          <div className="mb-3 flex items-center gap-2 text-sm text-white/70">
            <Link href={blogPath} className="hover:text-[#e6b422]">
              {blogLabel}
            </Link>
            <span>›</span>
            <span className="text-[#e6b422]">{post.category}</span>
          </div>
          <h1 className="mb-4 text-2xl font-bold leading-tight md:text-4xl">
            {post.title}
          </h1>
          <p className="mb-4 text-base text-white/80 md:text-lg">
            {post.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/60">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(
                lang === "fr" ? "fr-CA" : "en-CA",
                { dateStyle: "long" }
              )}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-12 md:py-16">
        <article className="mx-auto max-w-3xl px-5">
          <div className="space-y-6">
            {post.body.map((section, i) => (
              <SectionRenderer key={i} section={section} />
            ))}
          </div>

          {/* FAQ */}
          {post.faqs.length > 0 && (
            <div className="mt-12 rounded-xl bg-[#f9f9f8] p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-[#1e3a5f]">
                {lang === "fr" ? "Questions fréquentes" : "Frequently asked"}
              </h2>
              <div className="space-y-4">
                {post.faqs.map((faq, i) => (
                  <details key={i} className="group">
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-start justify-between gap-3 border-b border-gray-200 pb-3 text-base font-semibold text-[#1e3a5f] transition hover:text-[#e6b422]">
                        <span>{faq.q}</span>
                        <span className="text-[#e6b422] transition group-open:rotate-45">
                          +
                        </span>
                      </div>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-[#4a627a]">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Related services */}
          {post.relatedServices.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-4 text-xl font-bold text-[#1e3a5f]">
                {lang === "fr" ? "Services liés" : "Related services"}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {post.relatedServices.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition hover:border-[#e6b422] hover:bg-[#f9f9f8]"
                  >
                    <span className="font-medium text-[#1e3a5f]">{s.title}</span>
                    <span className="text-[#e6b422]">→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 rounded-xl bg-[#1e3a5f] p-8 text-center text-white">
            <h2 className="mb-3 text-xl font-bold">
              {lang === "fr"
                ? "Besoin d'un prix maintenant ?"
                : "Need a price now?"}
            </h2>
            <p className="mb-4 text-sm text-white/80">
              {lang === "fr"
                ? "Discutez avec notre agent virtuel — réponse en 30 secondes."
                : "Chat with our virtual agent — response in 30 seconds."}
            </p>
            <Link
              href={lang === "fr" ? "/fr/calculatrice-taxi" : "/en/taxi-calculator"}
              className="inline-block rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-3 font-semibold text-white transition hover:-translate-y-0.5"
            >
              {lang === "fr"
                ? "Calculer mon prix →"
                : "Calculate my fare →"}
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}

function SectionRenderer({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "p":
      return <p className="text-base leading-relaxed text-[#1a202c]">{section.text}</p>;
    case "h2":
      return <h2 className="mt-8 text-2xl font-bold text-[#1e3a5f]">{section.text}</h2>;
    case "ul":
      return (
        <ul className="space-y-2 pl-5">
          {section.items.map((item, i) => (
            <li key={i} className="text-base text-[#1a202c] list-disc marker:text-[#e6b422]">
              {item}
            </li>
          ))}
        </ul>
      );
    case "callout": {
      const colors = {
        info: "border-[#1e3a5f] bg-[#1e3a5f]/5",
        tip: "border-[#38a169] bg-[#38a169]/5",
        warning: "border-[#e53e3e] bg-[#e53e3e]/5",
      };
      return (
        <div className={`rounded-lg border-l-4 p-4 md:p-5 ${colors[section.variant]}`}>
          {section.title && (
            <div className="mb-1 font-semibold text-[#1e3a5f]">
              {section.title}
            </div>
          )}
          <p className="text-sm leading-relaxed text-[#1a202c]">{section.text}</p>
        </div>
      );
    }
    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-[#1e3a5f] text-white">
              <tr>
                {section.headers.map((h, i) => (
                  <th key={i} className="px-4 py-2 text-left font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f9f9f8]"}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-4 py-2 ${
                        j === 0 ? "font-medium text-[#1e3a5f]" : "text-[#1a202c]"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "example":
      return (
        <div className="rounded-lg border border-gray-200 bg-[#f9f9f8] p-5 md:p-6">
          <div className="mb-3 font-semibold text-[#1e3a5f]">{section.title}</div>
          <div className="space-y-2">
            {section.rows.map((row, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 border-b border-gray-200 pb-2 sm:flex-row sm:justify-between sm:gap-4"
              >
                <span className="text-sm text-[#4a627a]">{row.label}</span>
                <span className="text-sm font-semibold text-[#1a202c] sm:text-right">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    case "cta":
      return (
        <div className="rounded-lg border-2 border-[#e6b422] bg-white p-5 text-center">
          <p className="mb-3 text-base font-medium text-[#1e3a5f]">
            {section.text}
          </p>
          <Link
            href={section.href}
            className="inline-block rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            {section.label}
          </Link>
        </div>
      );
  }
}
