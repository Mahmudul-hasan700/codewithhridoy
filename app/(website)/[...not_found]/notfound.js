import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center dark:bg-gray-900 px-4 pb-12 pt-20 sm:px-6 lg:px-8">
      <main className="mx-auto max-w-md">
        <img
          src="/404.svg"
          alt="404 Not Found"
          className="mx-auto w-auto h-auto"
        />
        <h2 className="mt-7 text-center text-2xl font-bold leading-7 dark:text-gray-300">
          Oops! Page Not Found.
        </h2>
        <p className="mt-2 text-center dark:text-gray-400">
          The page you are looking for is not available or has been
          moved. Try a different page or go to homepage with the
          button below.
        </p>
        <div className="mt-6 flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go To Home
          </Link>
        </div>
      </main>
    </div>
  );
}