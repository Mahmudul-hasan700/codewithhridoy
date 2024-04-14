import React from "react";

export default function TagList({ tags }) {
  return (
    <div className="my-4">
      {tags && tags.length > 0 && (
        <ul className="flex flex-wrap *:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5">
          {tags.map(tag => (
            <li key={tag?._id} className="mb-2 mr-2 flex flex-wrap">
              <a href={`/tag/${tag.slug?.current}`}>
                {tag?.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
