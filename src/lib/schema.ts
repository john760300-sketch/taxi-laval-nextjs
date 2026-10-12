/**
 * Schema.org definitions for Taxi Chomedey (besttaxilaval.ca)
 *
 * Centralizes all JSON-LD structured data so service pages can import
 * the schemas they need and pass them to <SchemaOrg />.
 *
 * Schema strategy:
 * - LocalBusiness: site-wide business info (preserved from live site)
 * - Service: per-service schema with Offer/PriceSpecification
 * - FAQPage: FAQ rich results
 * - BreadcrumbList: breadcrumb rich results
 * - WebSite: site-wide on homepage
 * - WebApplication: standalone agent page (eligible for "tool" rich results)
 *
 * Local search strategy:
 * - areaServed includes ALL 31 cities from src/data/cities.ts
 * - Each city is a Place object with name + url (links to /fr/taxi-[slug])
 * - Helps Google + AI search engines associate the business with each city
 * - Each city landing page (/fr/taxi-[slug]) gets crawled + indexed
 */

import { cities } from "@/data/cities";

const SITE_URL = "https://besttaxilaval.ca";
const PHONE = "+15142396512";
const EMAIL = "contact@besttaxilaval.ca";
const LOGO = "https://besttaxilaval.ca/images/logo.jpg";

/**
 * Build a Place object for each city — with name (FR) + URL to the city
 * landing page. This is the structured data that helps Google understand
 * "Taxi Chomedey serves Chomedey, Fabreville, Sainte-Rose, ..." and link
 * each to its corresponding landing page.
 *
 * 31 cities total: 14 Laval neighborhoods + 9 Rive-Nord + 8 Laurentides.
 */
const areaServedPlaces = cities.map((c) => ({
  "@type": "Place",
  name: c.nameFr,
  alternateName: c.nameEn,
  url: `${SITE_URL}/fr/taxi-${c.slug}`,
}));

/** Common LocalBusiness block — preserved from the live site's airport page. */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Taxi Chomedey",
  description:
    "Service professionnel de transport de passagers, navette vers l'Aéroport Montréal-Trudeau (YUL), survoltage de batterie, déverrouillage de portière et raccompagnement. Service disponible 24/7 à Laval, sur la Rive-Nord et dans les Laurentides.",
  image: LOGO,
  logo: LOGO,
  url: SITE_URL,
  telephone: PHONE,
  email: EMAIL,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6-255 63e Avenue",
    addressLocality: "Laval",
    addressRegion: "QC",
    postalCode: "H7V 2H4",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "45.5750",
    longitude: "-73.7300",
  },
  openingHours: "Mo-Su 00:00-23:59",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  paymentAccepted: "Cash, Credit Card, Debit Card",
  currenciesAccepted: "CAD",
  // All 31 cities served — Place objects with name + landing page URL
  // for maximum local SEO + AI search visibility
  areaServed: areaServedPlaces,
  hasMap:
    "https://www.google.com/maps/search/6-255+63e+Avenue,+Laval,+QC+H7V+2H4",
  foundingDate: "2020",
  numberOfEmployees: "50+",
  availableLanguage: ["French", "English"],
  sameAs: [
    "https://www.facebook.com/people/Taxi-Laval-Chomedey/100075684710012/",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "850",
    bestRating: "5",
    worstRating: "1",
  },
};

/** WebSite schema — site-wide, applied on homepage. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Taxi Chomedey",
  alternateName: "besttaxilaval.ca",
  url: SITE_URL,
  description:
    "Service de taxi 24/7 à Laval, Rive-Nord & Laurentides — transport aéroport YUL, survoltage batterie, déverrouillage de portière, raccompagnement.",
  publisher: {
    "@type": "LocalBusiness",
    name: "Taxi Chomedey",
    telephone: PHONE,
    email: EMAIL,
  },
  inLanguage: ["fr-CA", "en-CA"],
  // Sites serving multiple local areas — list all 31 cities
  audience: {
    "@type": "Audience",
    audienceType: "Résidents de Laval, Rive-Nord et Laurentides",
  },
};

/**
 * Build a Service schema for a specific service page.
 *
 * @example
 *   serviceSchema({
 *     name: "Transport aéroport YUL",
 *     description: "...",
 *     url: "https://besttaxilaval.ca/fr/transport-aeroport",
 *     serviceType: "Taxi transport to Montréal-Trudeau Airport",
 *     areaServed: ["Laval", "Rive-Nord", "Laurentides"],
 *   })
 */
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: Array<string | Record<string, unknown>>;
  offers?: Array<{
    name: string;
    description: string;
    priceCurrency: string;
    lowPrice?: string;
    highPrice?: string;
    price?: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType,
    provider: {
      "@type": "LocalBusiness",
      name: "Taxi Chomedey",
      telephone: PHONE,
      email: EMAIL,
      url: SITE_URL,
    },
    areaServed: (opts.areaServed ?? areaServedPlaces).map((name) =>
      typeof name === "string"
        ? { "@type": "Place", name }
        : name
    ),
    offers: opts.offers?.map((o) => ({
      "@type": "Offer",
      name: o.name,
      description: o.description,
      priceCurrency: o.priceCurrency,
      ...(o.lowPrice && o.highPrice
        ? { priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: o.priceCurrency,
            minPrice: o.lowPrice,
            maxPrice: o.highPrice,
          } }
        : { price: o.price }),
      offeredBy: {
        "@type": "LocalBusiness",
        name: "Taxi Chomedey",
        telephone: PHONE,
      },
    })),
  };
}

/**
 * Build FAQPage schema from a list of FAQ strings.
 * Generates plausible questions + answer stubs based on the FAQ labels.
 */
export function faqSchema(faqs: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((q) => ({
      "@type": "Question",
      name: q.endsWith("?") ? q : `${q}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Contactez Taxi Chomedey au ${PHONE} pour plus d'informations sur : ${q}.`,
      },
    })),
  };
}

/**
 * Build BreadcrumbList schema for navigation context.
 */
export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * WebApplication schema for the standalone AI fare agent page.
 * Eligible for "tool" rich results.
 */
export const fareAgentSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Agent Prix — Taxi Chomedey",
  url: `${SITE_URL}/fr/calculer-prix`,
  description:
    "Calculateur de tarif taxi par conversation. Obtenez un prix fixe et garanti en 30 secondes — tarif officiel CTQ, aligné sur UberX, sans surge. Discutez avec notre agent virtuel : dites-nous votre départ, destination et heure.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any (web browser)",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CAD",
    description: "Calcul de tarif gratuit, sans engagement.",
  },
  provider: {
    "@type": "LocalBusiness",
    name: "Taxi Chomedey",
    telephone: PHONE,
    email: EMAIL,
    url: SITE_URL,
  },
  featureList: [
    "Calcul de tarif taxi en temps réel (données Mapbox live traffic)",
    "Tarif officiel CTQ — jour (5h-23h) et nuit (23h-5h)",
    "Prix fixe aligné sur UberX (pointe) — sans surge",
    "Devis pour survoltage de batterie ($35-$80)",
    "Devis pour déverrouillage de portière / débarrage ($35-$120)",
    "Calcul raccompagnement (2× tarif CTQ jour)",
    "Service 24h/24, 7j/7 à Laval, Rive-Nord & Laurentides",
  ],
  // All 31 cities served — links the AI agent to each city landing page
  areaServed: areaServedPlaces,
};
