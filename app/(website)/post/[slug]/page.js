// post/[slug]/page.js

import PostPage from "./default";
import { getAllPostsSlugs, getPostBySlug, getTopCategories, getCommentsByPostId } from "@/lib/sanity/client";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return { 
    title: post.title,
    metaTitle: post.seo.metaTitle,
    metaDescription: post.seo.metaDescription,
    metaKeywords: post.seo.metaKeywords,
    canonicalUrl: post.seo.canonicalUrl,
    ogImage: post.mainImage?.src,
    noIndex: post.seo.noIndex,
    noFollow: post.seo.noFollow
  };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);
  const categories = await getTopCategories();
  const comments = await getCommentsByPostId(post._id);

  return <PostPage post={post} categories={categories} comments={comments} />; 
}

export const revalidate = 60;