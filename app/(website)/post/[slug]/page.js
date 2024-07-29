import PostPage from "./default";
import {
  getAllPostsSlugs,
  getPostBySlug,
  getTopCategories,
  getCommentsByPostId
} from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { notFound } from "next/navigation";
export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);

  // Generate a brief excerpt from the post body
  const excerpt = post?.body
    ? post.body
        .find(block => block._type === "block")
        ?.children.find(child => child._type === "span")
        ?.text?.slice(0, 155) + "..."
    : "";

  // Generate keywords from post tags
  const keywords = post?.tags ? post.tags.join(", ") : "";

  // Get the URL for the main image
  const ogImage = post?.mainImage
    ? urlForImage(post.mainImage)
    : null;

  const title = post?.title;
  const description = post?.excerpt || excerpt;

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      images: ogImage
        ? [
            {
              url: ogImage.src,
              width: ogImage.width,
              height: ogImage.height,
              alt: post?.mainImage?.alt || title
            }
          ]
        : []
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ogImage ? [ogImage.src] : []
    }
  };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);
  const categories = await getTopCategories();
  const comments = await getCommentsByPostId(post?._id);

  if (!post) {
    notFound();
  }

  return (
    <PostPage
      post={post}
      categories={categories}
      comments={comments}
    />
  );
}

export const revalidate = 60;
