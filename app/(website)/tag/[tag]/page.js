// pages/tags/[slug]/page.js

import Tag from "./tag";
import { getPostsByTag } from "@/lib/sanity/client";

async function getTagPosts(tagSlug) {
  const posts = await getPostsByTag(tagSlug);
  const title = `Posts with tag: ${tagSlug}`;
  return { title, posts };
}

export async function generateMetadata({ params }) {
  const tagSlug = params.slug || ""; // Ensure tagSlug is defined
  const data = await getTagPosts(tagSlug);
  return { title: data.title };
}

export default async function TagDefault({ params }) {
  const tagSlug = params.slug || ""; // Ensure tagSlug is defined
  const data = await getTagPosts(tagSlug);
  const { title, posts } = data;
  return <Tag posts={posts} title={title} />;
}
