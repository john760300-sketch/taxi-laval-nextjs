import Link from "next/link";

/**
 * Branded 404 page content — displayed when a URL doesn't match any route.
 *
 * Used by:
 *   - src/app/not-found.tsx       (root 404 — catches /xyz, /old-page, etc.)
 *   - src/app/fr/not-found.tsx    (catches /fr/* 404s, French content)
 *   - src/app/en/not-found.tsx    (catches /en/* 404s, English content)
 *
 * Bilingual via the `lang` prop. Branded with site colors (navy + gold),
 * shows 3 CTAs (Home / Calculator / Contact) + phone number for fast
 * escape from the 404 to a useful page.
 *
 * For SEO: the parent not-found.tsx files set `robots: { index: false }`
 * so 404 pages don't get indexed by Google.
 */
type Lang = "fr" | "en";

const CONTENT: Record<Lang, {
  title: string;
  subtitle: string;
  message: string;
  home: string;
  calculator: string;
  contact: string;
  phoneLabel: string;
  tagline: string;
}> = {
  fr: {
    title: "Page introuvable",
    subtitle: "404 — Cette adresse n'existe pas sur notre site.",
    message:
      "La page que vous cherchez a peut-être été déplacée, renommée ou supprimée. Essayez plutôt l'une de ces options :",
    home: "Accueil",
    calculator: "Calculatrice Taxi",
    contact: "Contact",
    phoneLabel: "Ou appelez-nous :",
    tagline: "Taxi Chomedey · besttaxilaval.ca · Service 24/7",
  },
  en: {
    title: "Page not found",
    subtitle: "404 — This URL doesn't exist on our site.",
    message:
      "The page you're looking for may have moved, been renamed, or removed. Try one of these instead:",
    home: "Home",
    calculator: "Taxi Calculator",
    contact: "Contact",
    phoneLabel: "Or call us:",
    tagline: "Taxi Chomedey · besttaxilaval.ca · 24/7 service",
  },
};

const ROUTES: Record<Lang, { home: string; calculator: string; contact: string }> = {
  fr: {
    home: "/fr",
    calculator: "/fr/calculatrice-taxi",
    contact: "/fr/contact",
  },
  en: {
    home: "/en",
    calculator: "/en/taxi-calculator",
    contact: "/en/contact",
  },
};

export function NotFoundContent({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const r = ROUTES[lang];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-2xl text-center">
        {/* Big 404 with gold accent on the middle zero */}
        <div className="text-[120px] font-extrabold leading-none text-[#1e3a5f] md:text-[160px]">
          4<span className="text-[#e6b422]">0</span>4
        </div>

        <h1 className="mt-6 text-3xl font-bold text-[#1e3a5f] md:text-4xl">
          {t.title}
        </h1>
        <p className="mt-3 text-base text-slate-500">{t.subtitle}</p>

        <p className="mt-6 text-sm leading-relaxed text-[#4a627a]">
          {t.message}
        </p>

        {/* Three CTAs — Home (navy), Calculator (gold gradient), Contact (white) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={r.home}
            className="rounded-full bg-[#1e3a5f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#152a47]"
          >
            🏠 {t.home}
          </Link>
          <Link
            href={r.calculator}
            className="rounded-full bg-gradient-to-br from-[#e6b422] to-[#d4a017] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-[#d4a31f] hover:to-[#b8914a]"
          >
            🧮 {t.calculator}
          </Link>
          <Link
            href={r.contact}
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-[#1e3a5f] transition hover:bg-slate-100"
          >
            ✉️ {t.contact}
          </Link>
        </div>

        {/* Phone — always visible, large tap target on mobile */}
        <div className="mt-10 text-sm text-[#4a627a]">
          {t.phoneLabel}{" "}
          <a
            href="tel:+15142396512"
            className="font-bold text-[#1e3a5f] transition hover:underline"
          >
            514-239-6512
          </a>
        </div>

        <p className="mt-8 text-xs text-slate-400">{t.tagline}</p>
      </div>
    </main>
  );
}
