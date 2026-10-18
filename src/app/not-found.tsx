import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFoundContent";

/**
 * Root-level 404 page — catches URLs that don't start with /fr or /en
 * (e.g. /xyz, /old-page-from-2010, /wp-admin.php). Defaults to French
 * since the site is primarily French and the root / redirects to /fr.
 *
 * For /fr/* 404s, see src/app/fr/not-found.tsx.
 * For /en/* 404s, see src/app/en/not-found.tsx.
 *
 * SEO: 404 pages should NOT be indexed by Google (they're transient —
 * the URL doesn't exist, so indexing would create duplicate-content
 * noise). robots: noindex, follow tells crawlers: don't index this
 * page, but DO follow the internal links on it (passing PageRank to
 * Home / Calculator / Contact).
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
