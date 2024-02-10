"use client";
import Link from "next/link";
import { useState } from "react";
import Container from "@/components/container";
import PostList from "@/components/postlist";
import Loading from "./loading";

export default function HomePage({ posts }) {
  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // First page is always displayed
    pageNumbers.push(renderPageButton(1));

    if (currentPage > 3) {
      pageNumbers.push(
        <span
          key="ellipsis1"
          className="mr-2 inline-flex items-center justify-center rounded-md bg-transparent text-black dark:text-slate-200 px-3 py-2">
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
          className="mr-2 inline-flex items-center justify-center rounded-md bg-transparent text-black dark:text-slate-200 px-3 py-2">
          ...
        </span>
      );
    }

    // Last page is always displayed
    if (totalPages !== 1) {
      pageNumbers.push(renderPageButton(totalPages));
    }

    return pageNumbers;
  };

  const renderPageButton = pageNumber => {
    return (
      <button
        key={pageNumber}
        onClick={() => paginate(pageNumber)}
        className={`relative inline-flex items-center rounded-md px-3.5 py-2 mr-2 text-sm font-medium focus:z-20 disabled:pointer-events-none ${currentPage === pageNumber ? "cursor-not-allowed bg-blue-500 text-white" : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 dark:border-gray-500 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"}`}
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
    <Container>
      <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
        {currentPosts.map(post => (
          <PostList
            key={post._id}
            post={post}
            aspect="landscape"
            preloadImage={true}
          />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        {renderPageNumbers()}
      </div>
    </Container>
  );
}
