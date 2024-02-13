// post/[slug]/default.js
"use client";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Sidebar from "@/components/sidebar";
import ShareButton from "@/components/ShareButton";
import CommentForm from "@/components/CommentForm";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import Breadcrumb from '@/components/Breadcrumb';


export default function Post(props) {
  const { loading, post, categories, comments } = props;

  const router = useRouter();
  const currentUrl =
    typeof window !== "undefined" ? window.location.href : null;

  const renderedComments = () => {
    if (comments && comments.length > 0) {
      const approvedComments = comments.filter(
        comment => comment.approved
      );

      if (approvedComments.length > 0) {
        return (
          <div className="mx-auto grid grid-cols-1 gap-4">
            {approvedComments.map(comment => (
              <div
                key={comment._id}
                className="flex items-center gap-3 border border-t border-gray-300 py-3 dark:border-gray-600">
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <Avatar
                    icon={<AvatarIcon />}
                    classNames={{
                      base: "bg-gray-100 dark:bg-gray-700 w-full h-full object-cover",
                      icon: "text-black/80 dark:text-slate-300"
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    <p className="tracing-wide text-lg font-bold text-gray-800 dark:text-gray-400">
                      {comment.name}
                    </p>
                    {"-"}
                    <p className="text-sm text-gray-500">
                      Created:{" "}
                      {format(
                        parseISO(comment._createdAt),
                        "MMMM dd, yyyy h:mm a"
                      )}
                    </p>
                  </div>
                  <p className="text-gray-800 dark:text-gray-400">
                    {comment.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <p className="text-center dark:text-gray-300">
            No approved comments available yet
          </p>
        );
      }
    } else {
      return (
        <p className="text-center dark:text-gray-300">
          No comments available yet
        </p>
      );
    }
  };

  const slug = post?.slug;

  if (!loading && !slug) {
    notFound();
  }
  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;

  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;

  return (
    <>
      <div className="mt-5 md:mt-14">
        <Breadcrumb />
        <div className="mx-auto flex max-w-screen-xl flex-col gap-5 px-5 md:flex-row">
          <article className="flex-1 md:w-3/5">
            <h1 className="mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
              {post.title}
            </h1>

            <div className="mt-3 flex space-x-3 text-gray-500 ">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 flex-shrink-0">
                  {AuthorimageProps && (
                    <Link
                      href={`/author/${post.author.slug.current}`}>
                      <Image
                        src={AuthorimageProps.src}
                        alt={post?.author?.name}
                        className="rounded-full object-cover"
                        fill
                        sizes="40px"
                      />
                    </Link>
                  )}
                </div>
                <div>
                  <p className="text-gray-800 dark:text-gray-400">
                    <Link
                      href={`/author/${post.author.slug.current}`}>
                      {post.author.name}
                    </Link>
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <time
                      className="text-gray-500 dark:text-gray-400"
                      dateTime={post?.publishedAt || post._createdAt}>
                      {format(
                        parseISO(
                          post?.publishedAt || post._createdAt
                        ),
                        "MMMM dd, yyyy"
                      )}
                    </time>
                    <span>
                      · {post.estReadingTime || "5"} min read
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-0 mx-auto mt-4 aspect-video max-w-screen-md overflow-hidden rounded-md md:mx-auto lg:rounded-lg">
              {imageProps && (
                <Image
                  src={imageProps.src}
                  alt={post.mainImage?.alt || "Thumbnail"}
                  loading="eager"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              )}
            </div>

            <div className="prose prose-lg mx-auto my-3 text-base dark:prose-invert prose-a:text-blue-500 md:text-xl">
              {post.body && <PortableText value={post.body} />}
            </div>

            <div className="mb-7 mt-7 flex justify-center">
              <Link
                href="/"
                className="flex items-center rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 md:text-lg ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                View all posts
              </Link>
            </div>

            <div className="my-5 flex w-full flex-wrap items-center justify-center gap-[10px]">
              <ShareButton title={post.title} url={currentUrl} />
            </div>
            <div className="hidden md:block">
              <div className="mx-4 my-5">
                <h2 className="text-center text-xl font-semibold">
                  Comments
                </h2>
                {renderedComments()}
              </div>
              <div className="mx-4">
                <CommentForm postId={post._id} />
              </div>
            </div>
          </article>
          <aside className="sticky top-0 self-start md:w-2/5">
            {" "}
            <Sidebar
              categories={categories}
              related={post.related.filter(
                item => item.slug.current !== slug
              )}
            />
          </aside>
        </div>
        <div className="md:hidden">
          <div className="mx-4 my-5">
            <h2 className="text-center text-xl font-semibold">
              Comments
            </h2>
            {renderedComments()}
          </div>
          <div className="mx-4">
            <CommentForm postId={post._id} />
          </div>
        </div>
      </div>
    </>
  );
}
