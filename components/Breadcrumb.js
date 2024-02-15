// components/Breadcrumb.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const Breadcrumb = ({ title }) => {
  const currentPath = usePathname();
  const pathnames = currentPath
    ? currentPath.split("/").filter(x => x)
    : [];

  return (
    <nav
      className="w-full text-ellipsis whitespace-normal"
      aria-label="breadcrumb">
      <ol className="breadcrumb flex w-full flex-wrap items-center bg-transparent px-4 py-2">
        <li className="breadcrumb-item text-blue-gray-900 hover:text-light-blue-500 flex cursor-pointer items-center font-sans text-sm font-normal leading-normal antialiased transition-colors duration-300">
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-500 dark:text-blue-400">
            <span>Home</span>
            <ChevronRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </Link>
        </li>
        {pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li
              key={routeTo}
              className={`breadcrumb-item ${isLast ? "active" : ""} flex items-center font-sans text-sm font-normal leading-normal antialiased`}>
              {isLast ? (
                <span className="gap-2 overflow-hidden text-ellipsis whitespace-normal text-wrap text-gray-500 dark:text-gray-400">
                  {title || path}
                </span>
              ) : (
                <Link
                  href={routeTo}
                  className="flex items-center gap-2 text-blue-500 dark:text-blue-400">
                  <span>{path}</span>
                  <ChevronRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
