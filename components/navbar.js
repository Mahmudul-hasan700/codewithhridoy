// components/Navbar.js

"use client";
import Link from "next/link";
import { Fragment, useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import { searchquery } from "@/lib/sanity/groq";
import { fetcher } from "@/lib/sanity/client";
import PostGrid from "./PostGrid";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { Transition } from "@headlessui/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { AlignJustify, Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    name: "HTML and CSS",
    href: "/category/html-and-css",
    current: false
  },
  {
    name: "Login form",
    href: "/category/login-forms",
    current: false
  },
  {
    name: "Tailwindcss",
    href: "/category/tailwindcss",
    current: false
  },
  {
    name: "Website Design",
    href: "/category/website-deesigns",
    current: false
  },
  {
    name: "Sidebar Menu",
    href: "/category/sidebar-menu",
    current: false
  },
  {
    name: "Navigation Bars",
    href: "/category/navigation-bars",
    current: false
  },
  {
    name: "Card Designs",
    href: "/category/card-designs",
    current: false
  }
];

const defaultNavigation = [
  {
    name: "Home",
    href: "/",
    current: true
  },
  {
    name: "About",
    href: "/about",
    current: false
  },
  {
    name: "Contact",
    href: "/contact",
    current: false
  },
  {
    name: "Signup",
    href: "/auth/signup",
    current: false
  }
];

export default function Navbar(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const { data, error } = useSWR(
    query ? [searchquery, { query }] : null,
    fetcher
  );
  const isLoading = !data && !error;
  const router = useRouter();
  const pathname = usePathname();
  const navigationRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = e => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    setIsSearching(!!searchTerm);
  };

  const handleSearchClick = () => {
    router.push("/search");
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  return (
    <div>
      <Sheet>
        <SheetContent side="left">
          <SheetHeader>
            <SheetDescription>
              <ul className="flex flex-col gap-2 py-4">
                {defaultNavigation.map(item => (
                  <li key={item.href}>
                    <Button
                      asChild
                      variant="outline"
                      className={`w-full ${
                        pathname === item.href
                          ? "bg-indigo-500 text-white"
                          : ""
                      }`}>
                      <Link href={item.href}>{item.name}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>

        <div className="text-forground fixed top-0 z-40 w-full bg-background shadow-sm">
          <header className="text-forground flex h-20 items-center justify-between bg-background p-4">
            <SheetTrigger>
              <AlignJustify />
            </SheetTrigger>
            <div className="flex items-center justify-center">
              <a href="/" className="ml-2 w-28 dark:hidden">
                {props.logo ? (
                  <Image
                    {...urlForImage(props.logo)}
                    alt="Logo"
                    priority={true}
                    sizes="(max-width: 640px) 100vw, 200px"
                  />
                ) : (
                  <span className="block text-center">Stablo</span>
                )}
              </a>
              <a
                href="/"
                className="ml-2 hidden w-28 dark:block md:w-36">
                {props.logoalt ? (
                  <Image
                    {...urlForImage(props.logoalt)}
                    alt="Logo"
                    priority={true}
                    sizes="(max-width: 640px) 100vw, 200px"
                  />
                ) : (
                  <span className="block text-center">Stablo</span>
                )}
              </a>
            </div>
            <div className="gap-3 md:hidden">
              <button
                className="mr-[3px] inline-flex items-center justify-center rounded-lg p-2 p-2 text-sm text-gray-800 focus:outline-none dark:text-slate-200"
                id="toggleRightSidebar"
                onClick={toggleRightSidebar}
                aria-label="Search">
                <Search />
              </button>
            </div>
            <Transition
              show={isRightSidebarOpen}
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full">
              <div className="rightsideNav fixed right-0 top-0 z-50 h-screen w-screen flex-shrink-0 flex-col overflow-y-auto bg-gray-50 py-6 text-gray-800 shadow-md dark:bg-gray-800 dark:text-slate-200">
                <div className="mr-5 block flex items-center justify-end">
                  <button
                    className="text-gray-500 dark:text-gray-400"
                    onClick={toggleRightSidebar}>
                    <X />
                  </button>
                </div>
                <>
                  <div className="my-5 block">
                    <div className="flex items-center justify-center p-4">
                      <h1 className="text-center text-lg font-semibold dark:text-white lg:text-3xl lg:leading-tight">
                        Search
                      </h1>
                    </div>

                    <div className="mx-4 my-5">
                      <div className="relative flex items-center justify-center">
                        <div className="relative w-full md:max-w-[600px]">
                          <input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Search..."
                            id="search"
                            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {isSearching && isLoading && (
                      <div className="mt-8 flex items-center justify-center">
                        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500  border-t-transparent"></div>
                      </div>
                    )}
                    {error && (
                      <div className="flex h-40 items-center justify-center">
                        <span className="text-lg text-gray-500">
                          Error fetching data. Please try again.
                        </span>
                      </div>
                    )}
                    {data && data.length === 0 && isSearching && (
                      <div className="flex h-40 items-center justify-center">
                        <span className="text-lg text-gray-500">
                          No results found.
                        </span>
                      </div>
                    )}
                    {data && <PostGrid data={data} query={query} />}
                  </div>
                </>
              </div>
            </Transition>
            <div className="flex hidden max-w-lg items-center justify-between gap-2 pr-3 md:ml-auto md:block lg:mx-auto">
              <ul className="mt-0 flex items-center space-x-8 border-0 bg-white p-0 dark:bg-gray-900">
                <li>
                  <a
                    href="/"
                    className={`tracing-wide p-0 font-semibold ${
                      pathname === "/"
                        ? "text-blue-700"
                        : "text-black dark:text-slate-200"
                    } hover:bg-transparent dark:hover:bg-transparent dark:hover:text-blue-500`}>
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className={`font-semibold hover:bg-gray-100 md:p-0 ${
                      pathname === "/about"
                        ? "text-blue-700"
                        : "text-black dark:text-slate-200"
                    } md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-blue-500`}>
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className={`font-semibold hover:bg-gray-100 md:p-0 ${
                      pathname === "/contact"
                        ? "text-blue-700"
                        : "text-black dark:text-slate-200"
                    } md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-blue-500`}>
                    Contact
                  </a>
                </li>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 rounded-md bg-transparent px-2 py-2 pl-2 font-semibold text-black dark:text-gray-200">
                    <span>Category</span>
                    <ChevronDown />
                  </button>
                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg dark:bg-gray-700"
                      style={{ zIndex: 1000 }}>
                      {navigation.map(item => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500 dark:text-gray-200 dark:hover:bg-gray-700">
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  className="mr-[3px] inline-flex items-center justify-center rounded-lg p-2 p-2 text-sm font-semibold text-gray-800 focus:outline-none dark:text-slate-200"
                  id="search"
                  aria-label="Search"
                  onClick={handleSearchClick}>
                  <Search />
                </button>
              </ul>
            </div>
          </header>
        </div>
      </Sheet>
    </div>
  );
}
