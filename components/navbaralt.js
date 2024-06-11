// components/Navbar.js

"use client";
import Link from "next/link";
import { Fragment, useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
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
  X,
  ChevronDown,
  ChevronRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import axios from "axios";

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

export default function NavbarAlt(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const navigationRef = useRef(null);
  const handleCloseSheet = () => setOpen(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const fetchUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          setUser(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          // Handle error
        });
    } else {
      console.error(
        "Token not found in local storage. Redirecting to login..."
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <h2 className="mb-4 text-center text-lg font-semibold">
              Site Navigation
            </h2>
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
            <SheetTrigger asChild className="md:hidden">
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
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="rounded-full"
                      size="icon"
                      variant="ghost">
                      <img
                        alt="Avatar"
                        className="rounded-full"
                        height="32"
                        src={user.avatar_url}
                        style={{
                          aspectRatio: "32/32",
                          objectFit: "cover"
                        }}
                        width="32"
                      />
                      <span className="sr-only">
                        Toggle user menu
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {user.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={handleSignOut}
                      className="flex gap-2">
                      
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Loader2 className="animate-spin" />
              )}
            </div>

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
                <div className="flex items-center gap-4">
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="rounded-full"
                          size="icon"
                          variant="ghost">
                          <img
                            alt="Avatar"
                            className="rounded-full"
                            height="32"
                            src={user.avatar_url}
                            style={{
                              aspectRatio: "32/32",
                              objectFit: "cover"
                            }}
                            width="32"
                          />
                          <span className="sr-only">
                            Toggle user menu
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {user.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {user.email}
                            </span>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button
                            onClick={handleSignOut}
                            variant="ghost"
                            className="w-full py-1 text-left">
                            
                            Sign Out
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Loader2 className="animate-spin" />
                  )}
                </div>
              </ul>
            </div>
          </header>
        </div>
      </Sheet>
    </div>
  );
}
