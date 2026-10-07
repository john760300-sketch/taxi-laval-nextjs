import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,

  async rewrites() {
    return [
      // City pages: /fr/taxi-chomedey → /fr/ville/chomedey
      { source: "/fr/taxi-:ville", destination: "/fr/ville/:ville" },
      { source: "/en/taxi-:city", destination: "/en/city/:city" },

      // Service + city combo pages (FR)
      {
        source: "/fr/deverrouillage-portieres-:city",
        destination: "/fr/sc/deverrouillage-portieres-:city",
      },
      {
        source: "/fr/survoltage-batterie-:city",
        destination: "/fr/sc/survoltage-batterie-:city",
      },
      {
        source: "/fr/transport-aeroport-:city",
        destination: "/fr/sc/transport-aeroport-:city",
      },
      {
        source: "/fr/transport-local-:city",
        destination: "/fr/sc/transport-local-:city",
      },
      {
        source: "/fr/livraison-express-:city",
        destination: "/fr/sc/livraison-express-:city",
      },
      {
        source: "/fr/transport-medical-:city",
        destination: "/fr/sc/transport-medical-:city",
      },
      {
        source: "/fr/raccompagnement-:city",
        destination: "/fr/sc/raccompagnement-:city",
      },

      // Service + city combo pages (EN)
      {
        source: "/en/door-unlocking-:city",
        destination: "/en/sc/door-unlocking-:city",
      },
      {
        source: "/en/battery-boost-:city",
        destination: "/en/sc/battery-boost-:city",
      },
      {
        source: "/en/airport-transport-:city",
        destination: "/en/sc/airport-transport-:city",
      },
      {
        source: "/en/local-transport-:city",
        destination: "/en/sc/local-transport-:city",
      },
      {
        source: "/en/express-delivery-:city",
        destination: "/en/sc/express-delivery-:city",
      },
      {
        source: "/en/medical-transport-:city",
        destination: "/en/sc/medical-transport-:city",
      },
      {
        source: "/en/drive-home-service-:city",
        destination: "/en/sc/drive-home-service-:city",
      },
    ];
  },

  async redirects() {
    return [
      // ---- Root / old taxi base ----
      { source: "/taxi", destination: "/fr", permanent: true },
      { source: "/taxi/", destination: "/fr", permanent: true },
      { source: "/taxi/en", destination: "/en", permanent: true },
      { source: "/taxi/en/", destination: "/en", permanent: true },

      // ---- French services ----
      { source: "/taxi/deverrouillage-portiere", destination: "/fr/deverrouillage-portiere", permanent: true },
      { source: "/taxi/deverrouillage-portiere/", destination: "/fr/deverrouillage-portiere", permanent: true },
      { source: "/taxi/survoltage-batterie", destination: "/fr/survoltage-batterie", permanent: true },
      { source: "/taxi/survoltage-batterie/", destination: "/fr/survoltage-batterie", permanent: true },
      { source: "/taxi/transport-aeroport", destination: "/fr/transport-aeroport", permanent: true },
      { source: "/taxi/transport-aeroport/", destination: "/fr/transport-aeroport", permanent: true },
      { source: "/taxi/transport-local", destination: "/fr/transport-local", permanent: true },
      { source: "/taxi/transport-local/", destination: "/fr/transport-local", permanent: true },
      { source: "/taxi/livraison-express", destination: "/fr/livraison-express", permanent: true },
      { source: "/taxi/livraison-express/", destination: "/fr/livraison-express", permanent: true },
      { source: "/taxi/transport-medical", destination: "/fr/transport-medical", permanent: true },
      { source: "/taxi/transport-medical/", destination: "/fr/transport-medical", permanent: true },
      { source: "/taxi/raccompagnement", destination: "/fr/raccompagnement", permanent: true },
      { source: "/taxi/raccompagnement/", destination: "/fr/raccompagnement", permanent: true },
      { source: "/taxi/urgence", destination: "/fr/urgence", permanent: true },
      { source: "/taxi/urgence/", destination: "/fr/urgence", permanent: true },
      { source: "/taxi/contact", destination: "/fr/contact", permanent: true },
      { source: "/taxi/contact/", destination: "/fr/contact", permanent: true },

      // ---- English services ----
      { source: "/taxi/en/door-unlocking", destination: "/en/door-unlocking", permanent: true },
      { source: "/taxi/en/door-unlocking/", destination: "/en/door-unlocking", permanent: true },
      { source: "/taxi/en/battery-boost", destination: "/en/battery-boost", permanent: true },
      { source: "/taxi/en/battery-boost/", destination: "/en/battery-boost", permanent: true },
      { source: "/taxi/en/airport-transport", destination: "/en/airport-transport", permanent: true },
      { source: "/taxi/en/airport-transport/", destination: "/en/airport-transport", permanent: true },
      { source: "/taxi/en/local-transport", destination: "/en/local-transport", permanent: true },
      { source: "/taxi/en/local-transport/", destination: "/en/local-transport", permanent: true },
      { source: "/taxi/en/express-delivery", destination: "/en/express-delivery", permanent: true },
      { source: "/taxi/en/express-delivery/", destination: "/en/express-delivery", permanent: true },
      { source: "/taxi/en/medical-transport", destination: "/en/medical-transport", permanent: true },
      { source: "/taxi/en/medical-transport/", destination: "/en/medical-transport", permanent: true },
      { source: "/taxi/en/contact", destination: "/en/contact", permanent: true },
      { source: "/taxi/en/contact/", destination: "/en/contact", permanent: true },
      { source: "/taxi/en/drive-home-service", destination: "/en/drive-home-service", permanent: true },
      { source: "/taxi/en/drive-home-service/", destination: "/en/drive-home-service", permanent: true },
      { source: "/taxi/en/emergency", destination: "/en/emergency", permanent: true },
      { source: "/taxi/en/emergency/", destination: "/en/emergency", permanent: true },

      // ---- Old city pages ----
      { source: "/taxi/ville/:slug", destination: "/fr/taxi-:slug", permanent: true },
      { source: "/taxi/ville/:slug/", destination: "/fr/taxi-:slug", permanent: true },
    ];
  },
};

export default nextConfig;
