// post/[slug]/page.js

import PostPage from "./default";
import { getAllPostsSlugs, getPostBySlug, getTopCategories, getCommentsByPostId } from "@/lib/sanity/client";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  const seo = post?.seo || {};
  return {
    title: post?.title,
    metaTitle: seo.metaTitle || "",
    metaDescription: seo.metaDescription || "",
    metaKeywords: seo.metaKeywords || [],
    canonicalUrl: seo.canonicalUrl || "",
    noIndex: seo.noIndex || false,
    noFollow: seo.noFollow || false,
    ogTitle: seo.ogTitle || "",
    ogDescription: seo.ogDescription || "",
    ogImage: seo?.ogImage?.src || null
  };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);
  const categories = await getTopCategories();
  const comments = await getCommentsByPostId(post._id);

  return <PostPage post={post} categories={categories} comments={comments} />;
}

export const revalidate = 60;