import React from "react";
import Link from "next/link";

export default function TagList({ tags }) {
  return (
    <div className="my-4">
      {tags && tags.length > 0 && (
        <ul className="flex flex-wrap *:rounded-full *:border *:border-sky-100 *:dark:border-gray-600 *:bg-sky-50 *:px-2 *:py-0.5 *:dark:bg-gray-800">
          {tags.map((tag, index) => (
            <li key={tag?._id || `tag-${index}`} className="mb-2 mr-2 flex flex-wrap">
              <Link href={`/tag/${tag.slug?.current}`}>
                {tag?.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}