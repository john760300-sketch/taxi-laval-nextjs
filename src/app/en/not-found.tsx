import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFoundContent";

/**
 * English 404 page — catches any /en/* URL that doesn't match a route
 * (e.g. /en/taxi-xxx-fake, /en/old-page, /en/services/obsolete).
 *
 * SEO: 404 pages should NOT be indexed (transient URLs). noindex, follow
 * tells Google: don't index this page, but DO follow the internal links
 * (Home / Calculator / Contact) to pass PageRank.
 */
export const metadata: Metadata = {
  title: "Page not found | Taxi Chomedey",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundContent lang="en" />;
}
