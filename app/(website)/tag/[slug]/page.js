// app/tag/[tag]/page.js
import { getPostsByTag, getAllTags } from "@/lib/sanity/client";
import PostList from "@/components/postlist";

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: tag.slug.current,
  }));
}

export async function generateMetadata({ params }) {
  const { tag } = params;
  const tagData = await getAllTags().then((tags) =>
    tags.find((t) => t.slug.current === tag)
  );

  return {
    title: `Posts tagged with "${tagData?.name}"`,
  };
}

export default async function TagPage({ params }) {
  const { tag } = params;
  const tagData = await getAllTags().then((tags) =>
    tags.find((t) => t.slug.current === tag)
  );

  if (!tagData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Tag not found
        </h1>
        <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
          The requested tag does not exist.
        </p>
      </div>
    );
  }

  const posts = await getPostsByTag(tagData.slug.current);

  return (
    <div className="mt-5 md:mt-14">
      <div className="mx-auto max-w-screen-xl px-5">
        <h1 className="mb-8 text-3xl font-semibold text-gray-900 dark:text-white">
          Posts tagged with "{tagData.name}"
        </h1>
        <PostList posts={posts} />
      </div>
    </div>
  );
}