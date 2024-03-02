import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryLabel from "./blog/category";

export default function PostAlt({ post }) {
  const imageProps = post?.mainImage
    ? urlForImage(post.mainImage)
    : null;
  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;
  return (
    <div className="mx-auto md:mx-4 rounded-lg bg-transparent p-2 text-gray-800 dark:text-slate-200 md:shadow-md">
      <div className="grid cursor-pointer grid-cols-[150px,1fr] gap-2 md:flex md:flex-col md:p-3">
        <div className="relative flex h-[80px] w-[150px] items-center justify-center overflow-hidden rounded-md bg-slate-100 dark:bg-gray-800 md:block md:h-[220px] md:w-full">
          <Link href={`/post/${post.slug?.current}`}>
            {imageProps ? (
              <Image
                src={imageProps.src}
                {...(post.mainImage.blurDataURL && {
                  placeholder: "blur",
                  blurDataURL: post.mainImage.blurDataURL
                })}
                alt={post.mainImage?.alt || "Thumbnail"}
                className="object-cover transition-all duration-300 hover:scale-105"
                width={150}
                height={150}
                layout="responsive"
              />
            ) : (
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                <PhotoIcon />
              </span>
            )}
          </Link>
        </div>

        <div className="hidden md:block">
          <CategoryLabel
            categories={post.categories}
          />
        </div>
        <div className="flex-1">
          <Link
            href={`/post/${post.slug.current}`}
            className="line-clamp-2 text-lg md:text-xl font-semibold">
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
          </Link>
          <div className="mb-2 flex items-center gap-1">
            <Link href={`/author/${post.author?.slug?.current}`}>
              <p className="font-medium text-blue-400">
                {post.author?.name}
              </p>
            </Link>
            -
            <p className="text-[14px]">
              <time
                className="truncate text-sm"
                dateTime={post?.publishedAt || post._createdAt}>
                {format(
                  parseISO(post?.publishedAt || post._createdAt),
                  "MMMM dd, yyyy"
                )}
              </time>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
