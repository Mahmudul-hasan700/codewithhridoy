"use client";
import { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import PostAlt from "@/components/postalt";

export default function HomePage({ posts }) {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.adsbygoogle) {
      window.adsbygoogle = window.adsbygoogle || [];
    }
  }, []);

  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Previous button
    pageNumbers.push(
      <button
        key="prev"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:select-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300" aria-label="Previous">
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        <span className="text-sm">Previous</span>
      </button>
    );

    // First page is always displayed
    pageNumbers.push(renderPageButton(1));

    if (currentPage > 3) {
      pageNumbers.push(
        <span
          key="ellipsis1"
          className="mr-2 inline-flex hidden items-center justify-center rounded-md bg-transparent px-4 py-2 text-black dark:text-slate-200 md:block">
          ...
        </span>
      );
    }

    if (currentPage > 2) {
      pageNumbers.push(renderPageButton(currentPage - 1));
    }

    if (currentPage >= 2 && currentPage !== totalPages) {
      pageNumbers.push(renderPageButton(currentPage));
    }

    if (currentPage < totalPages - 1) {
      pageNumbers.push(renderPageButton(currentPage + 1));
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <span
          key="ellipsis2"
          className="mx-1 inline-flex hidden items-center justify-center rounded-md bg-transparent px-4 py-2 text-black dark:text-slate-200 md:block">
          ...
        </span>
      );
    }

    // Last page is always displayed
    if (totalPages !== 1) {
      pageNumbers.push(renderPageButton(totalPages));
    }

    // Next button
    pageNumbers.push(
      <button
        key="next"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="relative mx-1 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:select-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300" aria-label="Next">
        <span className="text-sm">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    );

    return pageNumbers;
  };

  const renderPageButton = pageNumber => {
    return (
      <button
        key={pageNumber}
        onClick={() => paginate(pageNumber)}
        className={`relative mx-1 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium focus:z-20 disabled:pointer-events-none sm:block md:block ${currentPage === pageNumber ? "cursor-not-allowed select-none border border-blue-500 bg-blue-500 px-4 py-2 text-white" : "border border-gray-300 bg-white text-gray-700 disabled:select-none dark:border-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"}`}
        disabled={currentPage === pageNumber} aria-label="Page number">
        {pageNumber}
      </button>
    );
  };

  // Logic to display posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="mt-20">
        <div className="my-3 bg-transparent text-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-3227806848574176"
            data-ad-slot="3063566126"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
          <div className="md:mx-3 grid gap-3 md:grid-cols-2 lg:gap-10">
          {currentPosts.map(post => (
            <PostAlt key={post._id} post={post} />
          ))}
        </div>
        <div className="mt-10 flex items-center justify-center">
          {renderPageNumbers()}
        </div>
        <div className="text-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-3227806848574176"
            data-ad-slot="3063566126"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
      </div>
    </>
  );
}
