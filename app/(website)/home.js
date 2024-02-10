"use client";
import Link from "next/link";
import { useState } from "react";
import Container from "@/components/container";
import PostList from "@/components/postlist";
import Loading from "./loading";

export default function HomePage({ posts }) {
  const postsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const visiblePages = 3; // Number of page numbers to show
    const pageNumbers = [];

    // Calculate the range of page numbers to display
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    // Adjust startPage and endPage if necessary
    if (totalPages - endPage < Math.floor(visiblePages / 2)) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 mr-2 ${currentPage === i ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
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