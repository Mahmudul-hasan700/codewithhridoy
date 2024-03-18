"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";
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

    pageNumbers.push(
      <PaginationPrevious
        key="prev"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    pageNumbers.push(
      <PaginationItem key={1}>
        <PaginationLink onClick={() => paginate(1)}>1</PaginationLink>
      </PaginationItem>
    );

    if (currentPage > 3) {
      pageNumbers.push(<PaginationEllipsis key="ellipsis1" />);
    }

    if (currentPage > 2) {
      pageNumbers.push(
        <PaginationItem key={currentPage - 1}>
          <PaginationLink onClick={() => paginate(currentPage - 1)}>
            {currentPage - 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage >= 2 && currentPage !== totalPages) {
      pageNumbers.push(
        <PaginationItem key={currentPage}>
          <PaginationLink onClick={() => paginate(currentPage)}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage < totalPages - 1) {
      pageNumbers.push(
        <PaginationItem key={currentPage + 1}>
          <PaginationLink onClick={() => paginate(currentPage + 1)}>
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(<PaginationEllipsis key="ellipsis2" />);
    }

    pageNumbers.push(
      <PaginationNext
        key="next"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    return pageNumbers;
  };

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
            data-full-width-responsive="true"
          ></ins>
        </div>
        <div className="md:mx-3 grid gap-3 md:grid-cols-2 lg:gap-10">
          {currentPosts.map(post => (
            <PostAlt key={post._id} post={post} />
          ))}
        </div>
        <Pagination className="mt-8">
          <PaginationContent>{renderPageNumbers()}</PaginationContent>
        </Pagination>
        <div className="text-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-3227806848574176"
            data-ad-slot="3063566126"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
    </>
  );
}