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
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import {
  AlignJustify,
  Search,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

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
  }
];

export default function Navbar(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
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
  const handleCloseSheet = () => setOpen(false);

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
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="mb-4 text-center text-lg font-semibold">
              Site Navigation
            </SheetTitle>
          </SheetHeader>
          <div>
            <ul className="flex flex-col gap-2 py-4">
              {defaultNavigation.map(item => (
                <li key={item.href}>
                  <Button
                    variant={
                      pathname === item.href ? "default" : "outline"
                    }
                    asChild>
                    <Link
                      href={item.href}
                      className="w-full"
                      onClick={handleCloseSheet}>
                      {item.name}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-full items-center justify-center">
                Categories{" "}
                <ChevronRight className="ml-auto h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                {navigation.map(item => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} onClick={handleCloseSheet}>
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SheetContent>

        <div className="fixed top-0 z-40 w-full bg-background text-foreground shadow-sm">
          <header className="text-forground flex h-20 items-center justify-between bg-background p-4">
            <SheetTrigger asChild className="md:hidden" aria-label="Open menu">
              <Button variant="outline" size="icon">
                <AlignJustify />
              </Button>
            </SheetTrigger>
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
                id="toggleRightSidebar"
                onClick={toggleRightSidebar}
                aria-label="Search">
                <Search />
              </button>
            </div>
            {/* Right Sidebar Sheet */}
            <Sheet
              open={isRightSidebarOpen}
              onOpenChange={setIsRightSidebarOpen}>
              <SheetContent
                side="right"
                className="w-screen overflow-y-auto">
                <div className="flex-shrink-0">
                  <>
                    <div className="mx-auto my-5">
                      <div className="flex items-center justify-center p-4">
                        <SheetTitle className="text-center text-lg font-semibold dark:text-white lg:text-3xl lg:leading-tight">
                          Search
                        </SheetTitle>
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
                      <div className="w-full">
                        {data && (
                          <PostGrid data={data} query={query} />
                        )}
                      </div>
                    </div>
                  </>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex hidden max-w-lg items-center justify-between gap-2 pr-3 md:ml-auto md:block lg:mx-auto">
              <ul className="mt-0 flex items-center space-x-8 border-0 p-0">
                {defaultNavigation.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`font-semibold hover:bg-gray-100 md:p-0 ${
                        pathname === item.href
                          ? "text-blue-700"
                          : "text-black dark:text-slate-200"
                      } md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-blue-500`}>
                      {item.name}
                    </Link>
                  </li>
                ))}
                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      Categories
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        Categories
                      </DropdownMenuLabel>
                      {navigation.map(item => (
                        <DropdownMenuItem key={item.href} asChild>
                          <Link href={item.href}>{item.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <button
                  className="mr-[3px] inline-flex items-center justify-center rounded-lg p-2 p-2 text-sm font-semibold text-gray-800 focus:outline-none dark:text-slate-200"
                  id="search"
                  aria-label="Search"
                  onClick={handleSearchClick}>
                  <Search aria-hidden="true"/>
                </button>
              </ul>
            </div>
          </header>
        </div>
      </Sheet>
    </div>
  );
}
