// pages/tags/[slug]/page.js

import Tag from "./tag";
import { getAllTags, getPostsByTag } from "@/lib/sanity/client";

export async function generateStaticParams() {
  return await getAllTags();
}

async function getTagPosts(tag) {
  const posts = await getPostsByTag(tag);
  const title = `Posts with tag: ${tag}`;
  return { title, posts };
}

export async function generateMetadata({ params }) {
  const data = await getTagPosts(params.slug);
  return { title: data.title };
}

export default async function TagDefault({ params }) {
  const data = await getTagPosts(params.slug);
  const { title, posts } = data;
  return <Tag posts={posts} title={title} />;
}