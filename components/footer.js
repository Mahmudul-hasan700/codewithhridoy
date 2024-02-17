import Link from "next/link";
import ThemeSwitch from "@/components/themeSwitch";

export default function Footer(props) {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-10">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center text-sm">
            © {new Date().getFullYear()} {props?.copyright}. All
            rights reserved.
          </div>
          <ul className="mb-6 mt-4 flex items-center justify-center text-sm font-medium text-gray-800 dark:text-white">
            <li>
              <Link
                href="/privacy-policy"
                className="me-4 hover:underline md:me-6">
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="me-4 hover:underline md:me-6">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>       
        <div className="mt-2 flex items-center justify-center">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
}
