export type City = {
  slug: string;
  nameFr: string;
  nameEn: string;
  region: "laval" | "rive-nord" | "laurentides";
};

export const cities: City[] = [
  // Laval
  { slug: "chomedey", nameFr: "Chomedey", nameEn: "Chomedey", region: "laval" },
  { slug: "fabreville", nameFr: "Fabreville", nameEn: "Fabreville", region: "laval" },
  { slug: "sainte-dorothee", nameFr: "Sainte-Dorothée", nameEn: "Sainte-Dorothée", region: "laval" },
  { slug: "vimont", nameFr: "Vimont", nameEn: "Vimont", region: "laval" },
  { slug: "laval-des-rapides", nameFr: "Laval-des-Rapides", nameEn: "Laval-des-Rapides", region: "laval" },
  { slug: "duvernay", nameFr: "Duvernay", nameEn: "Duvernay", region: "laval" },
  { slug: "pont-viau", nameFr: "Pont-Viau", nameEn: "Pont-Viau", region: "laval" },
  { slug: "saint-vincent-de-paul", nameFr: "Saint-Vincent-de-Paul", nameEn: "Saint-Vincent-de-Paul", region: "laval" },
  { slug: "auteuil", nameFr: "Auteuil", nameEn: "Auteuil", region: "laval" },
  { slug: "iles-laval", nameFr: "Îles-Laval", nameEn: "Îles-Laval", region: "laval" },
  { slug: "laval-sur-le-lac", nameFr: "Laval-sur-le-Lac", nameEn: "Laval-sur-le-Lac", region: "laval" },
  { slug: "saint-francois", nameFr: "Saint-François", nameEn: "Saint-François", region: "laval" },
  { slug: "sainte-rose", nameFr: "Sainte-Rose", nameEn: "Sainte-Rose", region: "laval" },
  { slug: "laval-ouest", nameFr: "Laval-Ouest", nameEn: "Laval-Ouest", region: "laval" },
  // Rive-Nord
  { slug: "boisbriand", nameFr: "Boisbriand", nameEn: "Boisbriand", region: "rive-nord" },
  { slug: "saint-eustache", nameFr: "Saint-Eustache", nameEn: "Saint-Eustache", region: "rive-nord" },
  { slug: "blainville", nameFr: "Blainville", nameEn: "Blainville", region: "rive-nord" },
  { slug: "sainte-therese", nameFr: "Sainte-Thérèse", nameEn: "Sainte-Thérèse", region: "rive-nord" },
  { slug: "terrebonne", nameFr: "Terrebonne", nameEn: "Terrebonne", region: "rive-nord" },
  { slug: "mascouche", nameFr: "Mascouche", nameEn: "Mascouche", region: "rive-nord" },
  { slug: "rosemere", nameFr: "Rosemère", nameEn: "Rosemère", region: "rive-nord" },
  { slug: "lorraine", nameFr: "Lorraine", nameEn: "Lorraine", region: "rive-nord" },
  { slug: "deux-montagnes", nameFr: "Deux-Montagnes", nameEn: "Deux-Montagnes", region: "rive-nord" },
  // Laurentides
  { slug: "saint-jerome", nameFr: "Saint-Jérôme", nameEn: "Saint-Jérôme", region: "laurentides" },
  { slug: "mirabel", nameFr: "Mirabel", nameEn: "Mirabel", region: "laurentides" },
  { slug: "mont-tremblant", nameFr: "Mont-Tremblant", nameEn: "Mont-Tremblant", region: "laurentides" },
  { slug: "sainte-adele", nameFr: "Sainte-Adèle", nameEn: "Sainte-Adèle", region: "laurentides" },
  { slug: "sainte-agathe-des-monts", nameFr: "Sainte-Agathe-des-Monts", nameEn: "Sainte-Agathe-des-Monts", region: "laurentides" },
  { slug: "prevost", nameFr: "Prévost", nameEn: "Prévost", region: "laurentides" },
  { slug: "saint-sauveur", nameFr: "Saint-Sauveur", nameEn: "Saint-Sauveur", region: "laurentides" },
];

export const servicesFr = [
  { slug: "deverrouillage-portiere", name: "Déverrouillage de portière", path: "deverrouillage-portiere" },
  { slug: "survoltage-batterie", name: "Survoltage batterie", path: "survoltage-batterie" },
  { slug: "transport-aeroport", name: "Transport aéroport YUL", path: "transport-aeroport" },
  { slug: "transport-local", name: "Transport local", path: "transport-local" },
  { slug: "livraison-express", name: "Livraison express", path: "livraison-express" },
  { slug: "transport-medical", name: "Transport médical", path: "transport-medical" },
  { slug: "raccompagnement", name: "Service de raccompagnement", path: "raccompagnement" },
];

export const servicesEn = [
  { slug: "door-unlocking", name: "Door unlocking", path: "door-unlocking" },
  { slug: "battery-boost", name: "Battery boost", path: "battery-boost" },
  { slug: "airport-transport", name: "Airport transport YUL", path: "airport-transport" },
  { slug: "local-transport", name: "Local transport", path: "local-transport" },
  { slug: "express-delivery", name: "Express delivery", path: "express-delivery" },
  { slug: "medical-transport", name: "Medical transport", path: "medical-transport" },
  { slug: "drive-home-service", name: "Drive-home service", path: "drive-home-service" },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}
