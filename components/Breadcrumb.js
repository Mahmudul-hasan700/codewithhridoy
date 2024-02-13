// components/Breadcrumb.js
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const Breadcrumb = () => {
  const currentPath = usePathname();
  const pathnames = currentPath ? currentPath.split("/").filter(x => x) : [];

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb flex items-center bg-white p-4 dark:bg-gray-900">
        <li className="breadcrumb-item mr-2">
          <Link href="/" className="text-blue-500 dark:text-blue-400 flex items-center gap-2 cursor-pointer">
            <span>Home</span>
            <ChevronRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </Link>
        </li>
        {pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={routeTo} className={`breadcrumb-item ${isLast ? "active" : ""} mr-2 flex items-center flex-wrap`}>
              {isLast ? (
                <span className="flex items-center flex-wrap gap-2 text-gray-500 dark:text-gray-400">{path}</span>
              ) : (
                <Link href={routeTo} className="flex items-center gap-2 text-blue-500 dark:text-blue-400 cursor-pointer">
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