// components/Navbar.js

"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import {
  InformationCircleIcon,
  HomeIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

export default function Navbar(props) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();
  const navigationRef = useRef(null);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSearchClick = () => {
    router.push("/search");
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
    <div className="relative flex">
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
            <Link
              href="/"
              className={`mt-2 flex items-center gap-2 rounded-md px-2 py-2 font-semibold text-black dark:text-white ${
                currentPath === "/"
                  ? "bg-slate-300 pl-2 dark:bg-slate-700"
                  : "duration-300 hover:bg-slate-200 hover:pl-3 dark:hover:bg-slate-700"
              }`}>
              <HomeIcon className="h-6 w-6" />
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className={`mt-2 flex items-center gap-2 rounded-md px-2 py-2 font-semibold text-black duration-300 hover:pl-2 dark:text-white ${
                currentPath === "/about"
                  ? "bg-slate-300 pl-2 dark:bg-slate-700"
                  : "duration-300 hover:bg-slate-200 hover:pl-3 dark:hover:bg-slate-700"
              }`}>
              <InformationCircleIcon className="h-6 w-6" />
              About
            </Link>
          </li>

          <li>
            <Link
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
            </Link>
          </li>
          <li>
            <Link
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
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-20 items-center justify-between bg-white p-4 shadow-md dark:bg-gray-900">
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
            <Link href="/" className="ml-2 w-28 dark:hidden">
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
            </Link>
            <Link
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
            </Link>
          </div>
          <div className="gap-3 md:hidden">
            <button
              className="mr-[3px] inline-flex items-center justify-center rounded-lg p-2 p-2 text-sm text-gray-800 focus:outline-none dark:text-slate-200"
              id="search"
              aria-label="Search"
              onClick={handleSearchClick}>
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-800 dark:text-slate-200" />
            </button>
          </div>
          <div className="flex hidden items-center justify-between gap-2 pr-3 md:block">
            <ul className="mt-0 flex items-center space-x-8 border-0 bg-white p-0 dark:bg-gray-900">
              <li>
                <Link
                  href="/"
                  className={`p-0 ${
                    currentPath === "/"
                      ? "text-blue-700"
                      : "text-black dark:text-slate-200"
                  } hover:bg-transparent dark:hover:bg-transparent dark:hover:text-blue-500`}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`hover:bg-gray-100 md:p-0 ${
                    currentPath === "/about"
                      ? "text-blue-700"
                      : "text-black dark:text-slate-200"
                  } md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-blue-500`}>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`hover:bg-gray-100 md:p-0 ${
                    currentPath === "/contact"
                      ? "text-blue-700"
                      : "text-black dark:text-slate-200"
                  } md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-blue-500`}>
                  Contact
                </Link>
              </li>
              <button
                className="mr-[3px] inline-flex items-center justify-center rounded-lg p-2 p-2 text-sm text-gray-800 focus:outline-none dark:text-slate-200"
                id="search"
                aria-label="Search"
                onClick={handleSearchClick}>
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-800 dark:text-slate-200" />
              </button>
            </ul>
          </div>
        </header>
      </div>
    </div>
  );
}
