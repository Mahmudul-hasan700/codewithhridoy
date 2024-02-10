import HomePage from "./home";
import { getAllPosts, getPaginatedPosts } from "@/lib/sanity/client";

const POSTS_PER_PAGE = 6;

export default async function IndexPage() {
  const posts = await getAllPosts();
  return <HomePage posts={posts} />;
}

// export const revalidate = 60;
