import Tag from "./tag";
import { getPostsByTag } from "@/lib/sanity/client";

// Helper function to get posts and title based on tag
async function getTagPosts(tagSlug) {
  const posts = await getPostsByTag(tagSlug);
  const title = `Posts with tag: ${tagSlug}`;
  return { title, posts };
}

// Function to generate metadata for the page
export async function generateMetadata({ params }) {
  const tagSlug = params.slug || "";
  const data = await getTagPosts(tagSlug);
  return { title: data.title };
}

// Default export function to render the Tag component
export default async function TagDefault({ params }) {
  const tagSlug = params.slug || "";
  const data = await getTagPosts(tagSlug);
  const { title, posts } = data;
  return <Tag posts={posts} title={title} />;
}
