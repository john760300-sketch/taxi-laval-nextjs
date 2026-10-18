import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFoundContent";

/**
 * French 404 page — catches any /fr/* URL that doesn't match a route
 * (e.g. /fr/taxi-xxx-fake, /fr/old-page, /fr/services/obsolete).
 *
 * SEO: 404 pages should NOT be indexed (transient URLs). noindex, follow
 * tells Google: don't index this page, but DO follow the internal links
 * (Home / Calculator / Contact) to pass PageRank.
 */
export const metadata: Metadata = {
  title: "Page introuvable | Taxi Chomedey",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundContent lang="fr" />;
}
