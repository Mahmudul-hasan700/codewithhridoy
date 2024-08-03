import React from "react";
import Link from "next/link";
import ThemeSwitch from "@/components/themeSwitch";
import { Github, Twitter, Linkedin, Mail, Rss } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold">Codewithhridoy</h3>
            <p className="text-gray-700 dark:text-gray-400">
              Empowering developers with insightful articles and
              tutorials.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-blue-400">
                <Github size={24} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-blue-400">
                <Twitter size={24} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-blue-400">
                <Linkedin size={24} />
              </Link>
              <a
                href="/rss/rss.xml"
                target="_blank"
                rel="noopener referrer"
                className="transition-colors hover:text-blue-400">
                <Rss size={24} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Newsletter</h4>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded border border-gray-500 bg-white px-4 py-2 text-black outline-black dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:outline-white"
              />
              <button
                type="submit"
                className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 pt-8 text-center text-gray-400 dark:border-gray-800">
          <div className="text-center text-sm">
            © {new Date().getFullYear()} Codewithhridoy. All rights
            reserved.
          </div>
          <ul className="mb-6 mt-4 flex items-center justify-center text-sm font-medium">
            <li>
              <Link
                href="/privacy-policy"
                className="me-4 text-gray-700 hover:underline dark:text-gray-400 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-condition"
                className="me-4 text-gray-700 hover:underline dark:text-gray-400 md:me-6">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-700 hover:underline dark:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
          <div className="my-5 flex items-center justify-center">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
