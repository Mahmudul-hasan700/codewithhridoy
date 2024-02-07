"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function CommentForm({ postId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [saveUserInfo, setSaveUserInfo] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("commentUserName");
    const savedEmail = localStorage.getItem("commentUserEmail");

    if (savedName && savedEmail) {
      setValue("name", savedName);
      setValue("email", savedEmail);
    }
  }, []);

  const onSubmitHandler = async data => {
    setSubmitting(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    try {
      const response = await axios.post(
        "http://codewithhridoy.vercel.app/api/comments",
        {
          postId: postId,
          name: data.name,
          email: data.email,
          comment: data.comment
        },
        {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        }
      );

      if (saveUserInfo) {
        localStorage.setItem("commentUserName", data.name);
        localStorage.setItem("commentUserEmail", data.email);
      } else {
        localStorage.removeItem("commentUserName");
        localStorage.removeItem("commentUserEmail");
      }

      setSubmitting(false);
      setSubmissionSuccess(true);
      console.log(response.data);
    } catch (error) {
      setSubmitting(false);
      setSubmissionError(
        "Error submitting comment. Please try again."
      );
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="mx-auto mt-8 w-full">
      {submissionError && (
        <div className="mb-2 text-center text-red-500">
          {submissionError}
        </div>
      )}
      {submissionSuccess && (
        <div className="mb-2 text-center text-green-500">
          Comment submitted successfully! Your comment will show after
          admin approval.
        </div>
      )}
      <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name:
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className={`mb-2 block w-full rounded-md border ${
              errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            } px-4 py-2 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white`}
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            className={`mb-2 block w-full rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white`}
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="comment"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Comment:
        </label>
        <textarea
          id="comment"
          {...register("comment", { required: true })}
          className={`mb-4 block w-full rounded-md border ${
              errors.comment ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            } px-4 py-2 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white`}></textarea>
        {errors.comment && (
          <span className="text-red-500">Comment is required</span>
        )}
      </div>
      <div className="mt-2 flex items-center">
        <input
          type="checkbox"
          id="saveUserInfo"
          checked={saveUserInfo}
          onChange={() => setSaveUserInfo(!saveUserInfo)}
          className="mr-2 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <label
          htmlFor="saveUserInfo"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Save my name, email, and website in this browser for the
          next time I comment.
        </label>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className={`block w-full rounded-md bg-black py-4 font-medium text-white focus:outline-none dark:bg-white dark:text-black ${
            submitting ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
