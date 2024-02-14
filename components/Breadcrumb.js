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
    <nav className="flex items-center" aria-label="breadcrumb">
      <ol className="breadcrumb inline-flex items-center space-x-1 text-wrap bg-white p-4 dark:bg-gray-900 md:space-x-2 rtl:space-x-reverse">
        <li className="breadcrumb-item mr-2 inline-flex items-center">
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
              className={`breadcrumb-item ${isLast ? "active" : ""} mr-2 text-wrap`}>
              {isLast ? (
                <span className="gap-2 text-wrap text-gray-500 dark:text-gray-400">
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
