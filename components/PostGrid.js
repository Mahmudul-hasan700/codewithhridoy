import React from "react";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { format, parseISO } from "date-fns";
import { urlForImage } from "@/lib/sanity/image";

export default function PostGrid({ data, query }) {
  const firstTenResults = data.slice(0, 10);

  return (
    <div>
      {firstTenResults.map(post => {
        const imageProps = post.mainImage
          ? urlForImage(post.mainImage)
          : null;

        return (
          <div
            key={post._id}>
            <div className="grid cursor-pointer grid-cols-[150px,1fr] gap-2 overflow-x-hidden flex-shrink-0">
              <div className="flex h-[90px] w-[150px] items-center justify-center overflow-hidden">
                {imageProps ? (
                  <Image
                    src={imageProps.src}
                    {...(post.mainImage.blurDataURL && {
                      placeholder: "blur",
                      blurDataURL: post.mainImage.blurDataURL
                    })}
                    alt={post.mainImage?.alt || "Thumbnail"}
                    className="h-auto w-full object-cover transition-all"
                    layout="responsive"
                    width={80}
                    height={80}
                  />
                ) : (
                  <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                    <PhotoIcon />
                  </span>
                )}
              </div>
              <div>
                <a
                  href={`/post/${post.slug?.current}`}
                  className={`line-clamp-2 text-ellipsis md:line-clamp-3 md:text-xl`}>
                  <span
                    className="bg-gradient-to-r from-black to-black bg-[length:0px_2px] bg-left-bottom
                  bg-no-repeat
                  transition-[background-size]
                  duration-500
                  hover:bg-[length:100%_2px]
                  group-hover:bg-[length:100%_2px]
                  dark:from-white dark:to-white">
                    {post.title}
                  </span>
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
        <div className="my-5 flex items-center justify-center mx-4">
          <a
            href={`/search?q=${query}`}
            className="w-full rounded-md bg-black py-2 text-center font-semibold text-white hover:opacity-75 dark:bg-white dark:text-black">
            View More
          </a>
        </div>
      )}
    </div>
  );
}
