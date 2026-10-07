import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { getAllComboSlugsFr, getAllComboSlugsEn } from "@/data/combos";

const BASE = "https://besttaxilaval.ca";

const frServices = [
  "deverrouillage-portiere",
  "survoltage-batterie",
  "transport-aeroport",
  "transport-local",
  "livraison-express",
  "transport-medical",
  "raccompagnement",
  "urgence",
  "contact",
];

const enServices = [
  "door-unlocking",
  "battery-boost",
  "airport-transport",
  "local-transport",
  "express-delivery",
  "medical-transport",
  "drive-home-service",
  "emergency",
  "contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/fr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const s of frServices) {
    entries.push({
      url: `${BASE}/fr/${s}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const s of enServices) {
    entries.push({
      url: `${BASE}/en/${s}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const city of cities) {
    entries.push({
      url: `${BASE}/fr/taxi-${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
    entries.push({
      url: `${BASE}/en/taxi-${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const slug of getAllComboSlugsFr()) {
    entries.push({
      url: `${BASE}/fr/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const slug of getAllComboSlugsEn()) {
    entries.push({
      url: `${BASE}/en/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
