import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.mapbox.com https://api.cloudflare.com",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      { source: "/fr/taxi-:ville", destination: "/fr/ville/:ville" },
      { source: "/en/taxi-:city", destination: "/en/city/:city" },
      { source: "/fr/deverrouillage-portieres-:city", destination: "/fr/sc/deverrouillage-portieres-:city" },
      { source: "/fr/survoltage-batterie-:city", destination: "/fr/sc/survoltage-batterie-:city" },
      { source: "/fr/transport-aeroport-:city", destination: "/fr/sc/transport-aeroport-:city" },
      { source: "/fr/transport-local-:city", destination: "/fr/sc/transport-local-:city" },
      { source: "/fr/livraison-express-:city", destination: "/fr/sc/livraison-express-:city" },
      { source: "/fr/transport-medical-:city", destination: "/fr/sc/transport-medical-:city" },
      { source: "/fr/raccompagnement-:city", destination: "/fr/sc/raccompagnement-:city" },
      { source: "/en/door-unlocking-:city", destination: "/en/sc/door-unlocking-:city" },
      { source: "/en/battery-boost-:city", destination: "/en/sc/battery-boost-:city" },
      { source: "/en/airport-transport-:city", destination: "/en/sc/airport-transport-:city" },
      { source: "/en/local-transport-:city", destination: "/en/sc/local-transport-:city" },
      { source: "/en/express-delivery-:city", destination: "/en/sc/express-delivery-:city" },
      { source: "/en/medical-transport-:city", destination: "/en/sc/medical-transport-:city" },
      { source: "/en/drive-home-service-:city", destination: "/en/sc/drive-home-service-:city" },
    ];
  },

  async redirects() {
    return [
      { source: "/", destination: "/fr", permanent: true },
      // Old calculator URLs → new SEO-friendly URLs
      { source: "/fr/calculer-prix", destination: "/fr/calculatrice-taxi", permanent: true },
      { source: "/fr/calculer-prix/:path*", destination: "/fr/calculatrice-taxi/:path*", permanent: true },
      // Legacy URL rename: /fr/taxi-calculatrice → /fr/calculatrice-taxi (2026-10)
      { source: "/fr/taxi-calculatrice", destination: "/fr/calculatrice-taxi", permanent: true },
      { source: "/fr/taxi-calculatrice/:path*", destination: "/fr/calculatrice-taxi/:path*", permanent: true },
      { source: "/en/calculate-fare", destination: "/en/taxi-calculator", permanent: true },
      { source: "/en/calculate-fare/:path*", destination: "/en/taxi-calculator/:path*", permanent: true },
      { source: "/taxi", destination: "/fr", permanent: true },
      { source: "/taxi/", destination: "/fr", permanent: true },
      { source: "/taxi/en", destination: "/en", permanent: true },
      { source: "/taxi/en/", destination: "/en", permanent: true },

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
      { source: "/taxi/sitemap", destination: "/sitemap.xml", permanent: true },
      { source: "/taxi/sitemap/", destination: "/sitemap.xml", permanent: true },
      { source: "/taxi/en/sitemap", destination: "/sitemap.xml", permanent: true },
      { source: "/taxi/en/sitemap/", destination: "/sitemap.xml", permanent: true },

      { source: "/transport-local", destination: "/fr/transport-local", permanent: true },
      { source: "/transport-local/", destination: "/fr/transport-local", permanent: true },
      { source: "/taxi-local", destination: "/fr/transport-local", permanent: true },
      { source: "/taxi-local/", destination: "/fr/transport-local", permanent: true },
      { source: "/transport-aeroport", destination: "/fr/transport-aeroport", permanent: true },
      { source: "/transport-aeroport/", destination: "/fr/transport-aeroport", permanent: true },
      { source: "/aeroport-taxi", destination: "/fr/transport-aeroport", permanent: true },
      { source: "/aeroport-taxi/", destination: "/fr/transport-aeroport", permanent: true },
      { source: "/survoltage-batterie", destination: "/fr/survoltage-batterie", permanent: true },
      { source: "/survoltage-batterie/", destination: "/fr/survoltage-batterie", permanent: true },
      { source: "/boost-batterie", destination: "/fr/survoltage-batterie", permanent: true },
      { source: "/boost-batterie/", destination: "/fr/survoltage-batterie", permanent: true },
      { source: "/deverrouillage-portiere", destination: "/fr/deverrouillage-portiere", permanent: true },
      { source: "/deverrouillage-portiere/", destination: "/fr/deverrouillage-portiere", permanent: true },
      { source: "/livraison-express", destination: "/fr/livraison-express", permanent: true },
      { source: "/livraison-express/", destination: "/fr/livraison-express", permanent: true },
      { source: "/transport-medical", destination: "/fr/transport-medical", permanent: true },
      { source: "/transport-medical/", destination: "/fr/transport-medical", permanent: true },
      { source: "/raccompagnement", destination: "/fr/raccompagnement", permanent: true },
      { source: "/raccompagnement/", destination: "/fr/raccompagnement", permanent: true },
      { source: "/urgence-taxi", destination: "/fr/urgence", permanent: true },
      { source: "/urgence-taxi/", destination: "/fr/urgence", permanent: true },

      // French service+city root → /fr/...
      { source: "/transport-local-:city", destination: "/fr/transport-local-:city", permanent: true },
      { source: "/taxi-local-:city", destination: "/fr/transport-local-:city", permanent: true },
      { source: "/transport-aeroport-:city", destination: "/fr/transport-aeroport-:city", permanent: true },
      { source: "/survoltage-batterie-:city", destination: "/fr/survoltage-batterie-:city", permanent: true },
      { source: "/boost-batterie-:city", destination: "/fr/survoltage-batterie-:city", permanent: true },
      { source: "/deverrouillage-portiere-:city", destination: "/fr/deverrouillage-portieres-:city", permanent: true },
      { source: "/deverrouillage-portieres-:city", destination: "/fr/deverrouillage-portieres-:city", permanent: true },
      { source: "/livraison-express-:city", destination: "/fr/livraison-express-:city", permanent: true },
      { source: "/transport-medical-:city", destination: "/fr/transport-medical-:city", permanent: true },
      { source: "/raccompagnement-:city", destination: "/fr/raccompagnement-:city", permanent: true },

      { source: "/taxi/ville/:slug", destination: "/fr/taxi-:slug", permanent: true },
      { source: "/taxi/ville/:slug/", destination: "/fr/taxi-:slug", permanent: true },
      { source: "/taxi-:ville", destination: "/fr/taxi-:ville", permanent: true },

      // Old static site .html extensions → strip .html (301)
      { source: "/fr/taxi-:slug.html", destination: "/fr/taxi-:slug", permanent: true },
      { source: "/en/taxi-:slug.html", destination: "/en/taxi-:slug", permanent: true },
      // Old .html on service pages too
      { source: "/fr/:slug.html", destination: "/fr/:slug", permanent: true },
      { source: "/en/:slug.html", destination: "/en/:slug", permanent: true },

      // "st-" abbreviation → "saint-" (e.g. /fr/taxi-st-vincent-de-paul → /fr/taxi-saint-vincent-de-paul)
      { source: "/fr/taxi-st-:slug", destination: "/fr/taxi-saint-:slug", permanent: true },
      { source: "/en/taxi-st-:slug", destination: "/en/taxi-saint-:slug", permanent: true },

      // Typo fix: "saint-sophie" (masculine) → "sainte-sophie" (feminine, correct name)
      { source: "/fr/taxi-saint-sophie", destination: "/fr/taxi-sainte-sophie", permanent: true },
      { source: "/en/taxi-saint-sophie", destination: "/en/taxi-sainte-sophie", permanent: true },

      // Old sitemap URL with .xml extension
      { source: "/taxi/sitemap.xml", destination: "/sitemap.xml", permanent: true },

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

      // English service+city root → /en/...
      { source: "/door-unlocking-:city", destination: "/en/door-unlocking-:city", permanent: true },
      { source: "/battery-boost-:city", destination: "/en/battery-boost-:city", permanent: true },
      { source: "/airport-transport-:city", destination: "/en/airport-transport-:city", permanent: true },
      { source: "/local-transport-:city", destination: "/en/local-transport-:city", permanent: true },
      { source: "/express-delivery-:city", destination: "/en/express-delivery-:city", permanent: true },
      { source: "/medical-transport-:city", destination: "/en/medical-transport-:city", permanent: true },
      { source: "/drive-home-service-:city", destination: "/en/drive-home-service-:city", permanent: true },

      { source: "/taxi/en/city/:slug", destination: "/en/taxi-:slug", permanent: true },
      { source: "/taxi/en/city/:slug/", destination: "/en/taxi-:slug", permanent: true },
    ];
  },
};

export default nextConfig;
