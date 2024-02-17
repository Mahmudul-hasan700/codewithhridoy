"use client";
import { Suspense, useState, useEffect } from "react";
import Container from "@/components/container";
import PostList from "@/components/postlist";
import Loading from "./loading";
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import { Adsense } from "@ctrl/react-adsense";

export default function HomePage({ posts }) {
  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let ads = document.getElementsByClassName('adsbygoogle').length;
    for (let i = 0; i < ads; i++) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);

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
        className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 disabled:select-none disabled:hidden">
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        <span className="hidden md:block">Previous</span>
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
        className="relative mx-1 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 disabled:select-none disabled:hidden">
        <span className="hidden md:block">Next</span>
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
        className={`relative mx-1 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium focus:z-20 disabled:pointer-events-none sm:block md:block ${currentPage === pageNumber ? "cursor-not-allowed bg-blue-500 text-white select-none px-4 py-2 border border-blue-500" : "border border-gray-300 bg-white text-gray-700 dark:border-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 disabled:select-none"}`}
        disabled={currentPage === pageNumber}>
        {pageNumber}
      </button>
    );
  };

  // Logic to display posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Suspense fallback={<Loading />}>
      <Container>
        <div className="text-center adsbygoogle my-3">
          <Adsense
            client="ca-pub-3227806848574176"
            slot="3063566126"
            style={{ display: "block" }}
            layout="in-article"
            format="fluid"
          />
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:gap-10 mt-5">
          {currentPosts.map(post => (
            <PostList
              key={post._id}
              post={post}
              aspect="landscape"
              preloadImage={true}
            />
          ))}
        </div>
        <div className="mt-10 flex items-center justify-center">
          {renderPageNumbers()}
        </div>
      </Container>
    </Suspense>
  );
}
