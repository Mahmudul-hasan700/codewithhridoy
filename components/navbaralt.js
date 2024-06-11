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
  const [userData, setUserData] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const navigationRef = useRef(null);
  const handleCloseSheet = () => setOpen(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          setUserData(response.data.user); // Accessing nested user data
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
              {userData ? (
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
                        src={userData.profileUrl || "/R.png"}
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
                          {userData.name || 'username'}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {userData.email || "email"}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button
                        onClick={handleSignOut}
                        variant="ghost"
                        className="w-full py-1 text-left">
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
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
                  {userData ? (
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
                            src={userData.profileUrl}
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
                              {userData.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {userData.email}
                            </span>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <SettingsIcon className="mr-2 h-4 w-4" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button
                            onClick={handleSignOut}
                            variant="ghost"
                            className="w-full py-1 text-left">
                            <LogOutIcon className="mr-2 h-4 w-4" />
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

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function InboxIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UserPlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
