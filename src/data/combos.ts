import { cities, type City } from "./cities";

export type ServiceDef = {
  slug: string;
  name: string;
  path: string;
  titlePartFr: string;
  titlePartEn: string;
  descFr: string;
  descEn: string;
};

/** Map French combo service slug → English combo service slug */
export const frToEnServiceSlug: Record<string, string> = {
  "deverrouillage-portieres": "door-unlocking",
  "survoltage-batterie": "battery-boost",
  "transport-aeroport": "airport-transport",
  "transport-local": "local-transport",
  "livraison-express": "express-delivery",
  "transport-medical": "medical-transport",
  raccompagnement: "drive-home-service",
};

/** Map English combo service slug → French combo service slug */
export const enToFrServiceSlug: Record<string, string> = Object.fromEntries(
  Object.entries(frToEnServiceSlug).map(([fr, en]) => [en, fr])
);

/** Map French combo slug → English page path segment */
export const frToEnPath: Record<string, string> = {
  "deverrouillage-portieres": "door-unlocking",
  "survoltage-batterie": "battery-boost",
  "transport-aeroport": "airport-transport",
  "transport-local": "local-transport",
  "livraison-express": "express-delivery",
  "transport-medical": "medical-transport",
  raccompagnement: "drive-home-service",
};

export const comboServicesFr: ServiceDef[] = [
  {
    slug: "deverrouillage-portieres",
    name: "Déverrouillage de portière",
    path: "deverrouillage-portiere",
    titlePartFr: "Déverrouillage de portière",
    titlePartEn: "Door unlocking",
    descFr:
      "Clés oubliées? Ouverture professionnelle sans dommage en moins de 20 minutes, 24h/24.",
    descEn:
      "Keys locked inside? Professional damage-free opening in under 20 minutes, 24/7.",
  },
  {
    slug: "survoltage-batterie",
    name: "Survoltage batterie",
    path: "survoltage-batterie",
    titlePartFr: "Survoltage de batterie",
    titlePartEn: "Battery boost",
    descFr:
      "Boost sécuritaire pour véhicules modernes, hybrides et électriques. Intervention en moins de 15 minutes.",
    descEn:
      "Safe boost for modern, hybrid and electric vehicles. Response in under 15 minutes.",
  },
  {
    slug: "transport-aeroport",
    name: "Transport aéroport YUL",
    path: "transport-aeroport",
    titlePartFr: "Transport aéroport YUL",
    titlePartEn: "YUL airport transport",
    descFr:
      "Transfert ponctuel vers l'aéroport Montréal-Trudeau. Suivi des vols en direct, tarifs forfaitaires.",
    descEn:
      "Punctual transfer to Montréal-Trudeau Airport. Live flight tracking, flat rates.",
  },
  {
    slug: "transport-local",
    name: "Transport local",
    path: "transport-local",
    titlePartFr: "Transport local",
    titlePartEn: "Local transport",
    descFr:
      "Courses rapides et sécuritaires. Chauffeurs qui connaissent les raccourcis.",
    descEn: "Fast, safe rides. Drivers who know the shortcuts.",
  },
  {
    slug: "livraison-express",
    name: "Livraison express",
    path: "livraison-express",
    titlePartFr: "Livraison express",
    titlePartEn: "Express delivery",
    descFr:
      "Livraison de courses, colis et médicaments en moins de 90 minutes.",
    descEn:
      "Grocery, package and medication delivery in under 90 minutes.",
  },
  {
    slug: "transport-medical",
    name: "Transport médical",
    path: "transport-medical",
    titlePartFr: "Transport médical",
    titlePartEn: "Medical transport",
    descFr:
      "Accompagnement adapté vers hôpitaux et cliniques. Chauffeurs formés.",
    descEn:
      "Adapted accompaniment to hospitals and clinics. Trained drivers.",
  },
  {
    slug: "raccompagnement",
    name: "Service de raccompagnement",
    path: "raccompagnement",
    titlePartFr: "Service de raccompagnement",
    titlePartEn: "Drive-home service",
    descFr:
      "Retour sécuritaire après votre soirée, avec votre véhicule ou en taxi.",
    descEn:
      "Safe ride home after your evening, in your vehicle or by taxi.",
  },
];

export const comboServicesEn: ServiceDef[] = comboServicesFr.map((s) => ({
  ...s,
  slug: frToEnServiceSlug[s.slug] ?? s.slug,
  path: frToEnPath[s.slug] ?? s.path,
  name: s.titlePartEn,
}));

export type Combo = {
  slug: string;
  service: ServiceDef;
  city: City;
  lang: "fr" | "en";
};

function buildCombos(services: ServiceDef[], lang: "fr" | "en"): Combo[] {
  const list: Combo[] = [];
  for (const service of services) {
    for (const city of cities) {
      list.push({
        slug: `${service.slug}-${city.slug}`,
        service,
        city,
        lang,
      });
    }
  }
  return list;
}

export const combosFr = buildCombos(comboServicesFr, "fr");
export const combosEn = buildCombos(comboServicesEn, "en");

export function getComboFr(slug: string): Combo | undefined {
  return combosFr.find((c) => c.slug === slug);
}

export function getComboEn(slug: string): Combo | undefined {
  return combosEn.find((c) => c.slug === slug);
}

export function getAllComboSlugsFr(): string[] {
  return combosFr.map((c) => c.slug);
}

export function getAllComboSlugsEn(): string[] {
  return combosEn.map((c) => c.slug);
}
