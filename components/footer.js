import React from "react";
import { Github, Twitter, Linkedin, Mail, Rss } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold">Code Blog</h3>
            <p className="text-gray-400">
              Empowering developers with insightful articles and
              tutorials.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="transition-colors hover:text-blue-400">
                <Github size={24} />
              </a>
              <a
                href="#"
                className="transition-colors hover:text-blue-400">
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="transition-colors hover:text-blue-400">
                <Linkedin size={24} />
              </a>
              <a
                href="/rss.xml"
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
                className="rounded bg-gray-800 px-4 py-2 text-white"
              />
              <button
                type="submit"
                className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Code Blog. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
