import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlogArticle } from "@/components/BlogArticle";
import { getBlogPostFr, blogPostsFr } from "@/data/blog-posts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return blogPostsFr.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostFr(slug);
  if (!post) return { title: "Article non trouvé" };
  return {
    title: `${post.title} | Taxi Chomedey`,
    description: post.description,
    alternates: {
      canonical: `https://besttaxilaval.ca/fr/blog/${post.slug}`,
      languages: {
        fr: `https://besttaxilaval.ca/fr/blog/${post.slug}`,
        en: `https://besttaxilaval.ca/en/blog/${post.slug}`,
        "x-default": `https://besttaxilaval.ca/fr/blog/${post.slug}`,
      },
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostFr(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main>
        <BlogArticle post={post} lang="fr" />
      </main>
      <Footer />
    </>
  );
}
