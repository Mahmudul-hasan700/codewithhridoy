import React from "react";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { format, parseISO } from "date-fns";
import { urlForImage } from "@/lib/sanity/image";

export default function PostGrid({ data, query }) {
  const firstTenResults = data.slice(0, 10);

  return (
    <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {firstTenResults.map(post => {
        const imageProps = post.mainImage
          ? urlForImage(post.mainImage)
          : null;

        return (
          <div
            key={post._id}
            className="mx-2 rounded-lg bg-transparent p-2 text-gray-800 dark:text-slate-200">
            <div className="flex grid cursor-pointer grid-cols-[150px,1fr] gap-2">
              <div className="flex h-[90px] w-[150px] items-center justify-center overflow-hidden">
                {imageProps ? (
                  <Image
                    src={imageProps.src}
                    {...(post.mainImage.blurDataURL && {
                      placeholder: "blur",
                      blurDataURL: post.mainImage.blurDataURL
                    })}
                    alt={post.mainImage?.alt || "Thumbnail"}
                    className="object-cover transition-all w-full h-auto"
                    layout="responsive"
                    width={150}
                    height={150}
                  />
                ) : (
                  <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                    <PhotoIcon />
                  </span>
                )}
              </div>
              <div className="flex-1">
                <a
                  href={`post/${post.slug?.current}`}
                  className="line-clamp-2 text-ellipsis text-lg font-semibold hover:underline md:line-clamp-3">
                  {post.title}
                </a>
                <div className="mb-2 flex items-center gap-1">
                  <a href={`/author/${post.author?.slug?.current}`}>
                    <p className="font-medium text-blue-400">
                      {post.author?.name}
                    </p>
                  </a>
                  -
                  <p className="text-[14px]">
                    <time
                      className="truncate text-sm"
                      dateTime={post?.publishedAt || post._createdAt}>
                      {format(
                        parseISO(
                          post?.publishedAt || post._createdAt
                        ),
                        "MMMM dd, yyyy"
                      )}
                    </time>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {firstTenResults.length === 10 && (
        <div className="m-4 flex justify-center">
          <a
            href={`/search?q=${query}`}
            className="w-full bg-black text-gray-200 dark:bg-white dark:text-black">
            View More
          </a>
        </div>
      )}
    </div>
  );
}
