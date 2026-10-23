export type City = {
  slug: string;
  nameFr: string;
  nameEn: string;
  region: "laval" | "rive-nord" | "laurentides";
  /** Official municipal website URL — used for Place.url in schema.org
   *  and rendered as external link on city pages (target="_blank"
   *  rel="noopener noreferrer"). */
  officialUrl: string;
};

// Laval neighborhoods (14) — all served by the City of Laval's official site
const LAVAL_OFFICIAL = "https://www.laval.ca/";

export const cities: City[] = [
  // Laval (neighborhoods within the City of Laval)
  { slug: "chomedey", nameFr: "Chomedey", nameEn: "Chomedey", region: "laval", officialUrl: LAVAL_OFFICIAL },
  { slug: "fabreville", nameFr: "Fabreville", nameEn: "Fabreville", region: "laval", officialUrl: LAVAL_OFFICIAL },
  { slug: "sainte-dorothee", nameFr: "Sainte-Dorothée", nameEn: "Sainte-Dorothée", region: "laval", officialUrl: LAVAL_OFFICIAL },
  { slug: "vimont", nameFr: "Vimont", nameEn: "Vimont", region: "laval", officialUrl: LAVAL_OFFICIAL },
  { slug: "laval-des-rapides", nameFr: "Laval-des-Rapides", nameEn: "Laval-des-Rapides", region: "laval", officialUrl: LAVAL_OFFICIAL },
  { slug: "duvernay", nameFr: "Duvernay", nameEn: "Duvernay", region: "laval", officialUrl: LAVAL_OFFICIAL },
  { slug: "pont-viau", nameFr: "Pont-Viau", nameEn: "Pont-Viau", region: "laval", officialUrl: LAVAL_OFFICIAL },
  { slug: "saint-vincent-de-paul", nameFr: "Saint-Vincent-de-Paul", nameEn: "Saint-Vincent-de-Paul", region: "laval", officialUrl: LAVAL_OFFICIAL },
  { slug: "auteuil", nameFr: "Auteuil", nameEn: "Auteuil", region: "laval", officialUrl: LAVAL_OFFICIAL },
  { slug: "iles-laval", nameFr: "Îles-Laval", nameEn: "Îles-Laval", region: "laval", officialUrl: LAVAL_OFFICIAL },
  { slug: "laval-sur-le-lac", nameFr: "Laval-sur-le-Lac", nameEn: "Laval-sur-le-Lac", region: "laval", officialUrl: LAVAL_OFFICIAL },
  { slug: "saint-francois", nameFr: "Saint-François", nameEn: "Saint-François", region: "laval", officialUrl: LAVAL_OFFICIAL },
  { slug: "sainte-rose", nameFr: "Sainte-Rose", nameEn: "Sainte-Rose", region: "laval", officialUrl: LAVAL_OFFICIAL },
  { slug: "laval-ouest", nameFr: "Laval-Ouest", nameEn: "Laval-Ouest", region: "laval", officialUrl: LAVAL_OFFICIAL },
  // Rive-Nord
  { slug: "boisbriand", nameFr: "Boisbriand", nameEn: "Boisbriand", region: "rive-nord", officialUrl: "https://ville.boisbriand.qc.ca/" },
  { slug: "saint-eustache", nameFr: "Saint-Eustache", nameEn: "Saint-Eustache", region: "rive-nord", officialUrl: "https://ville.saint-eustache.qc.ca/" },
  { slug: "blainville", nameFr: "Blainville", nameEn: "Blainville", region: "rive-nord", officialUrl: "https://blainville.ca/" },
  { slug: "sainte-therese", nameFr: "Sainte-Thérèse", nameEn: "Sainte-Thérèse", region: "rive-nord", officialUrl: "https://www.sainte-therese.ca/" },
  { slug: "terrebonne", nameFr: "Terrebonne", nameEn: "Terrebonne", region: "rive-nord", officialUrl: "https://ville.terrebonne.qc.ca/" },
  { slug: "mascouche", nameFr: "Mascouche", nameEn: "Mascouche", region: "rive-nord", officialUrl: "https://ville.mascouche.qc.ca/" },
  { slug: "rosemere", nameFr: "Rosemère", nameEn: "Rosemère", region: "rive-nord", officialUrl: "https://ville.rosemere.qc.ca/" },
  { slug: "lorraine", nameFr: "Lorraine", nameEn: "Lorraine", region: "rive-nord", officialUrl: "https://www.lorraine.ca/" },
  { slug: "deux-montagnes", nameFr: "Deux-Montagnes", nameEn: "Deux-Montagnes", region: "rive-nord", officialUrl: "https://ville.deux-montagnes.qc.ca/" },
  { slug: "sainte-marthe-sur-le-lac", nameFr: "Sainte-Marthe-sur-le-Lac", nameEn: "Sainte-Marthe-sur-le-Lac", region: "rive-nord", officialUrl: "https://ville.sainte-marthe-sur-le-lac.qc.ca/" },
  { slug: "saint-placide", nameFr: "Saint-Placide", nameEn: "Saint-Placide", region: "rive-nord", officialUrl: "https://www.quebec.ca/gouvernement/ministeres-organismes/affaires-municipales" },
  { slug: "oka", nameFr: "Oka", nameEn: "Oka", region: "rive-nord", officialUrl: "https://www.quebec.ca/gouvernement/ministeres-organismes/affaires-municipales" },
  { slug: "pointe-calumet", nameFr: "Pointe-Calumet", nameEn: "Pointe-Calumet", region: "rive-nord", officialUrl: "https://www.quebec.ca/gouvernement/ministeres-organismes/affaires-municipales" },
  { slug: "saint-joseph-du-lac", nameFr: "Saint-Joseph-du-Lac", nameEn: "Saint-Joseph-du-Lac", region: "rive-nord", officialUrl: "https://www.quebec.ca/gouvernement/ministeres-organismes/affaires-municipales" },
  { slug: "rawdon", nameFr: "Rawdon", nameEn: "Rawdon", region: "rive-nord", officialUrl: "https://www.quebec.ca/gouvernement/ministeres-organismes/affaires-municipales" },
  { slug: "saint-lin-laurentides", nameFr: "Saint-Lin-Laurentides", nameEn: "Saint-Lin-Laurentides", region: "rive-nord", officialUrl: "https://www.quebec.ca/gouvernement/ministeres-organismes/affaires-municipales" },
  { slug: "lachute", nameFr: "Lachute", nameEn: "Lachute", region: "rive-nord", officialUrl: "https://ville.lachute.qc.ca/" },
  { slug: "bois-des-filion", nameFr: "Bois-des-Filion", nameEn: "Bois-des-Filion", region: "rive-nord", officialUrl: "https://ville.bois-des-filion.qc.ca/" },
  { slug: "lachenaie", nameFr: "Lachenaie", nameEn: "Lachenaie", region: "rive-nord", officialUrl: "https://ville.terrebonne.qc.ca/" },
  { slug: "charlemagne", nameFr: "Charlemagne", nameEn: "Charlemagne", region: "rive-nord", officialUrl: "https://ville.charlemagne.qc.ca/" },
  // Laurentides
  { slug: "saint-jerome", nameFr: "Saint-Jérôme", nameEn: "Saint-Jérôme", region: "laurentides", officialUrl: "https://ville.saint-jerome.qc.ca/" },
  { slug: "mirabel", nameFr: "Mirabel", nameEn: "Mirabel", region: "laurentides", officialUrl: "https://www.mirabel.ca/" },
  { slug: "mont-tremblant", nameFr: "Mont-Tremblant", nameEn: "Mont-Tremblant", region: "laurentides", officialUrl: "https://vdmt.ca/" },
  { slug: "sainte-adele", nameFr: "Sainte-Adèle", nameEn: "Sainte-Adèle", region: "laurentides", officialUrl: "https://ville.sainte-adele.qc.ca/" },
  { slug: "sainte-agathe-des-monts", nameFr: "Sainte-Agathe-des-Monts", nameEn: "Sainte-Agathe-des-Monts", region: "laurentides", officialUrl: "https://ville.sainte-agathe-des-monts.qc.ca/" },
  { slug: "prevost", nameFr: "Prévost", nameEn: "Prévost", region: "laurentides", officialUrl: "https://www.ville.prevost.qc.ca/" },
  { slug: "saint-sauveur", nameFr: "Saint-Sauveur", nameEn: "Saint-Sauveur", region: "laurentides", officialUrl: "https://ville.saint-sauveur.qc.ca/" },
  { slug: "sainte-anne-des-plaines", nameFr: "Sainte-Anne-des-Plaines", nameEn: "Sainte-Anne-des-Plaines", region: "laurentides", officialUrl: "https://www.quebec.ca/gouvernement/ministeres-organismes/affaires-municipales" },
  { slug: "saint-hippolyte", nameFr: "Saint-Hippolyte", nameEn: "Saint-Hippolyte", region: "laurentides", officialUrl: "https://www.quebec.ca/gouvernement/ministeres-organismes/affaires-municipales" },
  { slug: "val-david", nameFr: "Val-David", nameEn: "Val-David", region: "laurentides", officialUrl: "https://www.quebec.ca/gouvernement/ministeres-organismes/affaires-municipales" },
  { slug: "val-morin", nameFr: "Val-Morin", nameEn: "Val-Morin", region: "laurentides", officialUrl: "https://www.val-morin.ca/" },
  { slug: "sainte-marguerite-du-lac-masson", nameFr: "Sainte-Marguerite-du-Lac-Masson", nameEn: "Sainte-Marguerite-du-Lac-Masson", region: "laurentides", officialUrl: "https://www.quebec.ca/gouvernement/ministeres-organismes/affaires-municipales" },
  { slug: "saint-canut", nameFr: "Saint-Canut", nameEn: "Saint-Canut", region: "laurentides", officialUrl: "https://www.quebec.ca/gouvernement/ministeres-organismes/affaires-municipales" },
  { slug: "repentigny", nameFr: "Repentigny", nameEn: "Repentigny", region: "rive-nord", officialUrl: "https://ville.repentigny.qc.ca/" },
  { slug: "sainte-sophie", nameFr: "Sainte-Sophie", nameEn: "Sainte-Sophie", region: "laurentides", officialUrl: "https://www.quebec.ca/gouvernement/ministeres-organismes/affaires-municipales" },
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
