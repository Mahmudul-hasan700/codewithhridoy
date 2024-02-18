// components/Navbar.js

"use client";
import { Fragment, useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import { searchquery } from "@/lib/sanity/groq";
import { fetcher } from "@/lib/sanity/client";
import PostGrid from "./PostGrid";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import {
  InformationCircleIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";

export default function Navbar(props) {
  const [isNavOpen, setIsNavOpen] = useState(false);
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
  const currentPath = usePathname();
  const navigationRef = useRef(null);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target)
      ) {
        setIsNavOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <Transition.Root show={open} as={Fragment}>
      <div>
        {isNavOpen && (
          <div
            className="fixed inset-0 z-50 w-full bg-black opacity-75"
            onClick={toggleNav}></div>
        )}
        <div
          ref={navigationRef}
          id="sideNav"
          className={`fixed left-0 top-0 z-50 h-full w-72 flex-shrink-0 transform flex-col bg-gray-50 py-6 pl-2 pr-4 text-gray-800 shadow-md transition-transform duration-300 dark:bg-gray-800 dark:text-slate-200 sm:w-80 ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
          <ul className="mt-4">
            <li>
              <a
                href="/"
                className={`mt-2 flex items-center gap-2 rounded-md px-2 py-2 font-semibold text-black dark:text-white ${
                  currentPath === "/"
                    ? "bg-slate-300 pl-2 dark:bg-slate-700"
                    : "duration-300 hover:bg-slate-200 hover:pl-3 dark:hover:bg-slate-700"
                }`}>
                <HomeIcon className="h-6 w-6" />
                Home
              </a>
            </li>

            <li>
              <a
                href="/about"
                className={`mt-2 flex items-center gap-2 rounded-md px-2 py-2 font-semibold text-black duration-300 hover:pl-2 dark:text-white ${
                  currentPath === "/about"
                    ? "bg-slate-300 pl-2 dark:bg-slate-700"
                    : "duration-300 hover:bg-slate-200 hover:pl-3 dark:hover:bg-slate-700"
                }`}>
                <InformationCircleIcon className="h-6 w-6" />
                About
              </a>
            </li>

            <li>
              <a
                href="/contact"
                className={`nav-item mt-2 flex items-center gap-2 rounded-md px-2 py-2 font-semibold text-black dark:text-white ${
                  currentPath === "/contact"
                    ? "bg-slate-300 pl-2 dark:bg-slate-700"
                    : "duration-300 hover:bg-slate-200 hover:pl-3 dark:hover:bg-slate-700"
                }`}>
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                Contact
              </a>
            </li>
            <li>
              <a
                href="/auth/signup"
                className={`nav-item mt-2 flex items-center gap-2 rounded-md px-2 py-2 font-semibold text-black dark:text-white ${
                  currentPath === "/auth/signup"
                    ? "bg-slate-300 pl-2 dark:bg-slate-700"
                    : "duration-300 hover:bg-slate-200 hover:pl-3 dark:hover:bg-slate-700"
                }`}>
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
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                Signup
              </a>
            </li>
          </ul>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex w-full items-center justify-between gap-2 rounded-md bg-transparent px-2 py-2 pl-2 font-semibold text-black text-gray-800 duration-300 dark:text-slate-300">
              <span>HTML & CSS</span>
              <ChevronDownIcon className="h-6 w-6" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg dark:bg-gray-700">
                <a
                  href="/category/login-forms"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500 dark:text-gray-200 dark:hover:bg-gray-700">
                  Login Forms
                </a>
                <a
                  href="/category/tailwindcss"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500 dark:text-gray-200 dark:hover:bg-gray-700">
                  Tailwindcss
                </a>
                <a
                  href="/category/website-deesigns"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500 dark:text-gray-200 dark:hover:bg-gray-700">
                  Website Designs
                </a>
                <a
                  href="/category/navigation-bars"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500 dark:text-gray-200 dark:hover:bg-gray-700">
                  Navigation Bars
                </a>
                <a
                  href="/category/sidebar-menu"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500 dark:text-gray-200 dark:hover:bg-gray-700">
                  Sidebar Menu
                </a>
                <a
                  href="/category/card-designs"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500 dark:text-gray-200 dark:hover:bg-gray-700">
                  Card Designs
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="fixed top-0 z-40 w-full bg-white shadow-sm dark:bg-gray-800">
          <header className="flex h-20 items-center justify-between bg-white p-4 dark:bg-gray-900">
            <button
              id="menuToggle"
              className={`menu hamburger inline-flex items-center justify-center rounded-lg p-2 text-sm text-gray-800 focus:outline-none dark:text-slate-200 md:hidden ${
                isNavOpen ? "active" : ""
              }`}
              aria-label="Menu"
              onClick={toggleNav}>
              <div>
                <svg
                  className="h-5 w-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <rect y="4" width="24" height="2" rx="1" />
                  <rect y="11" width="24" height="2" rx="1" />
                  <rect y="18" width="24" height="2" rx="1" />
                </svg>
              </div>
            </button>
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
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-800 dark:text-slate-200" />
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
              <div className="rightsideNav fixed right-0 top-0 z-50 h-full w-screen flex-shrink-0 transform flex-col overflow-y-auto overflow-x-hidden bg-gray-50 py-6 text-gray-800 shadow-md transition duration-500 ease-in-out dark:bg-gray-800 dark:text-slate-200 sm:duration-700">
                {/* Sidebar content */}
                <div className="block">
                  <button
                    className="ml-6 mt-5 text-gray-500 dark:text-gray-400"
                    onClick={toggleRightSidebar}>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <>
                  <div>
                    <div className="flex items-center justify-center p-4">
                      <h1 className="text-brand-primary text-center text-xl font-semibold tracking-tight dark:text-white lg:text-3xl lg:leading-tight">
                        Search
                      </h1>
                    </div>

                    <div className="mx-4 mt-5">
                      <div className="relative flex items-center justify-center">
                        <div className="relative w-full md:max-w-[600px]">
                          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Search..."
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
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
            <div className="flex hidden items-center justify-between gap-2 pr-3 md:block">
              <ul className="mt-0 flex items-center space-x-8 border-0 bg-white p-0 dark:bg-gray-900">
                <li>
                  <a
                    href="/"
                    className={`tracing-wide p-0 font-semibold ${
                      currentPath === "/"
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
                      currentPath === "/about"
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
                      currentPath === "/contact"
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
                    <span>HTML & CSS</span>
                    <ChevronDownIcon className="h-6 w-6" />
                  </button>
                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg dark:bg-gray-700"
                      style={{ zIndex: 1000 }}>
                      <a
                        href="/category/login-forms"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500 dark:text-gray-200 dark:hover:bg-gray-700">
                        Login Forms
                      </a>
                      <a
                        href="/category/tailwindcss"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500 dark:text-gray-200 dark:hover:bg-gray-700">
                        Tailwindcss
                      </a>
                      <a
                        href="/category/website-deesigns"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500 dark:text-gray-200 dark:hover:bg-gray-700">
                        Website Designs
                      </a>
                      <a
                        href="/category/navigation-bars"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500 dark:text-gray-200 dark:hover:bg-gray-700">
                        Navigation Bars
                      </a>
                      <a
                        href="/category/sidebar-menu"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500 dark:text-gray-200 dark:hover:bg-gray-700">
                        Sidebar Menu
                      </a>
                      <a
                        href="/category/card-designs"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500 dark:text-gray-200 dark:hover:bg-gray-700">
                        Card Designs
                      </a>
                    </div>
                  )}
                </div>
                <button
                  className="mr-[3px] inline-flex items-center justify-center rounded-lg p-2 p-2 text-sm font-semibold text-gray-800 focus:outline-none dark:text-slate-200"
                  id="search"
                  aria-label="Search"
                  onClick={handleSearchClick}>
                  <MagnifyingGlassIcon className="h-6 w-6 text-gray-800 dark:text-slate-200" />
                </button>
              </ul>
            </div>
          </header>
        </div>
      </div>
    </Transition.Root>
  );
}
