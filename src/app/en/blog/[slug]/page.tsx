import HeaderEn from "@/components/HeaderEn";
import FooterEn from "@/components/FooterEn";
import { BlogArticle } from "@/components/BlogArticle";
import { getBlogPostEn, blogPostsEn } from "@/data/blog-posts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return blogPostsEn.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostEn(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: `${post.title} | Taxi Chomedey`,
    description: post.description,
    alternates: {
      canonical: `https://besttaxilaval.ca/en/blog/${post.slug}`,
      languages: {
        fr: `https://besttaxilaval.ca/fr/blog/${post.slug}`,
        en: `https://besttaxilaval.ca/en/blog/${post.slug}`,
        "x-default": `https://besttaxilaval.ca/fr/blog/${post.slug}`,
      },
    },
  };
}

export default async function BlogArticlePageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostEn(slug);
  if (!post) notFound();

  return (
    <>
      <HeaderEn />
      <main>
        <BlogArticle post={post} lang="en" />
      </main>
      <FooterEn />
    </>
  );
}
