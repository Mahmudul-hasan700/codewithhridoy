"use client";

import React from "react";
import Container from "@/components/container";
import PostList from "@/components/postlist";
import SearchInput from "@/components/ui/search";
import { searchquery } from "@/lib/sanity/groq";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/sanity/client";
import SkeletonLoader from "@/components/SkeletonLoader";
import Breadcrumb from "@/components/Breadcrumb";
import Loding from "../loading";
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

export async function getStaticProps(context) {
  const searchParams = new URLSearchParams(context.query);
  const query = searchParams.get("q");

  const data = await fetcher(searchquery, { query });

  return {
    props: {
      initialData: data
    }
  };
}

export default function Search({ initialData }) {
  return (
    <Suspense fallback={<Loding />}>
      <SearchContent initialData={initialData} />
    </Suspense>
  );
}

function SearchContent({ initialData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || null;

  const [timer, setTimer] = useState(null);
  const { data, error, isValidating } = useSWR(
    query ? [searchquery, { query }] : null,
    fetcher,
    { initialData }
  );

  const handleChange = e => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      router.push(`/search?q=${e.target.value}`);
    }, 500);
    setTimer(newTimer);
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data
    ? data.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        <Breadcrumb title="Search" />
        <div className="mt-8 flex items-center justify-center p-4 md:mt-14">
          <h1 className="text-brand-primary text-center text-xl font-semibold tracking-tight dark:text-white lg:text-3xl lg:leading-tight">
            {query ? `Search results for "${query}"` : "Search"}
          </h1>
        </div>

        <div className="mx-4 mt-5 max-w-md md:mx-auto">
          <SearchInput
            q={query}
            handleChange={handleChange}
            placeholder="Enter keywords"
          />
        </div>
      </div>
      <Container>
        {isValidating && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        )}
        {error && (
          <div className="flex h-40 items-center justify-center">
            <span className="text-lg text-gray-500">
              Error fetching data. Please try again.
            </span>
          </div>
        )}
        {!query && !isValidating && (
          <div className="flex h-40 items-center justify-center">
            <span className="text-lg text-gray-500">¯\_(ツ)_/¯</span>
          </div>
        )}
        {query && !isValidating && data?.length === 0 && (
          <div className="flex h-40 items-center justify-center">
            <span className="text-lg text-gray-500">
              No posts found for {query}. Try again!
            </span>
          </div>
        )}
        {query && data && (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post, index) => (
              <PostList
                key={post._id}
                post={post}
                aspect="landscape"
              />
            ))}
          </div>
        )}
        {query && data && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-1 rounded-md bg-gray-300 px-3 py-1 text-gray-700">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            {Array.from({
              length: Math.ceil(data.length / postsPerPage)
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 rounded-md px-3 py-1 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}>
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(data.length / postsPerPage)
              }
              className="mx-1 rounded-md bg-gray-300 px-3 py-1 text-gray-700">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </Container>
    </>
  );
}
