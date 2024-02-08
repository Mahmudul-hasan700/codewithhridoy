// components/Navbar.js

"use client";

  import React, { useState, useEffect } from "react";
  import { useRouter } from "next/navigation";
  import Link from "next/link";
  import Image from "next/image";
  import { urlForImage } from "@/lib/sanity/image";
  import {
    InformationCircleIcon,
    HomeIcon,
    MagnifyingGlassIcon,
  } from "@heroicons/react/24/outline";
import axios from "axios"; 

export default function Navbar(props) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Fetch user data here
      fetchUserData(token);
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSearchClick = () => {
    router.push("/search");
  };


  return (
    <div className="flex">
      <nav
        id="sideNav"
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-shrink-0 transform flex-col bg-gray-50 py-6 pl-2 pr-4 text-gray-800 shadow-md transition-transform duration-300 dark:bg-gray-800 dark:text-slate-200 sm:w-80 ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <Link href="/" className="w-28 dark:hidden">
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
        <Link href="/" className="hidden h-10 w-28 dark:block">
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

        <ul className="mt-4">
          <li>
            <Link
              href="/"
              className={`mt-2 flex items-center gap-2 rounded-md px-2 py-2 font-semibold text-black dark:text-white ${
                router.pathname === "/"
                  ? "bg-slate-300 dark:bg-slate-700"
                  : "hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}>
              <HomeIcon className="h-6 w-6" />
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className={`mt-2 flex items-center gap-2 rounded-md px-2 py-2 font-semibold text-black dark:text-white ${
                router.pathname === "/about"
                  ? "bg-slate-300 dark:bg-slate-700"
                  : "hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}>
              <InformationCircleIcon className="h-6 w-6" />
              About
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className={`nav-item mt-2 flex items-center gap-2 rounded-md px-2 py-2 font-semibold text-black dark:text-white ${router.pathname === "/contact" ? "bg-slate-300 dark:bg-slate-700" : "hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
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
          {!isLoggedIn && (
            <>
              <li>
                <Link href="/auth/signup">Signup</Link>
              </li>
              <li>
                <Link href="/auth/login">Login</Link>
              </li>
            </>
          )}
          {isLoggedIn && userData && (
            <li className="flex items-center gap-2">
              {/* User profile */}
              {/* Profile image */}
              <div className="h-8 w-8 rounded-full overflow-hidden">
                {/* Default profile image or user uploaded image */}
                <Image
                  src="/default-profile-image.jpg"
                  alt="Profile image"
                  width={32}
                  height={32}
                />
              </div>
              <div className="text-gray-800 dark:text-white">
                {/* User name and email */}
                <span>{userData.name}</span>
                <span className="text-xs">{userData.email}</span>
              </div>
            </li>
          )}
        </ul>
      </nav>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-20 items-center justify-between bg-white p-4 shadow-md dark:bg-gray-900">
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
            <button
              id="menuToggle"
              className={`menu hamburger inline-flex items-center justify-center rounded-lg p-2 text-sm text-gray-800 focus:outline-none dark:text-slate-200 ${
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
          </div>
          <div className="flex hidden gap-2 pr-3 md:block">
            <ul className="flex md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
              <li>
                <Link
                  href="/"
                  className="hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/signup"
                  className="hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                  Signup
                </Link>
              </li>
            </ul>
          </div>
        </header>
      </div>
    </div>
  );
}
