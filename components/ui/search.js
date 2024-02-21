"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";

export default function SearchInput({
  q,
  handleChange,
  placeholder
}) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="relative w-full md:max-w-[600px]">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          defaultValue={q}
          onChange={handleChange}
          placeholder={placeholder}
          name="q"
          id="q"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
        />
      </div>
    </div>
  );
}
