"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleIcon from "@/components/google";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [errorMessage, successMessage]);

  const handleCloseError = () => {
    setErrorMessage("");
  };

  const handleCloseSuccess = () => {
    setSuccessMessage("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async data => {
    setLoading(true);
    try {
      const response = await axios.post("/api/register", data);
      if (response.data.success) {
        setSuccessMessage("Signup successful!");
        setErrorMessage("");
        reset();
      } else {
        if (response.data.message === "User already exists.") {
          setErrorMessage(
            "User already exists. Please use a different email."
          );
        } else {
          setErrorMessage(response.data.message);
        }
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async googleUserData => {
    try {
      const { name, email, imageUrl } = googleUserData;
      const requestData = { email, username: name, profile: imageUrl };
      const response = await axios.post("/api/google/signup", requestData);

      if (response.data.success) {
        setSuccessMessage("Google signup successful!");
        setErrorMessage("");
        console.log("User registered successfully:", response.data.message);
      } else {
        setErrorMessage("Google signup failed. Please try again.");
        setSuccessMessage("");
        console.error("Google signup error:", response.data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred during Google signup. Please try again.");
      setSuccessMessage("");
      console.error("Google signup error:", error);
    }
  };

  const login = useGoogleLogin({
    clientId: "394811475866-24gg5m7tk15sljh9cat135vjk7m287qh.apps.googleusercontent.com",
    onSuccess: handleGoogleSignup,
    onFailure: error => console.error("Google login failure:", error)
  });

  
  const handleGithubSignup = async () => {
    try {
      const response = await axios.get("/api/github/signup");
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error("Error during GitHub signup:", error);
      // Handle error if necessary
    }
  };

  return (
    <>
      {errorMessage && (
        <div
          id="toast-danger"
          className="fixed right-5 top-5 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
          role="alert">
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={handleCloseError}
            className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
            data-dismiss-target="#toast-danger"
            aria-label="Close">
            <span className="sr-only">Close</span>
            <svg
              className="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
      {successMessage && (
        <div
          id="toast-success"
          className="fixed right-5 top-5 z-50 mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400 md:whitespace-nowrap"
          role="alert">
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal md:whitespace-nowrap">
            {successMessage}
          </div>
          <button
            type="button"
            onClick={handleCloseSuccess}
            className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
            data-dismiss-target="#toast-success"
            aria-label="Close">
            <span className="sr-only">Close</span>
            <svg
              className="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
      <div
        className={`relative bg-white py-16 dark:bg-gray-900 dark:text-slate-200`}>
        <div className="container relative mx-auto px-6 xl:px-40">
          <div
            className={`text-gray-800 dark:bg-gray-900 dark:text-slate-200`}>
            <div
              className={`w-full rounded-xl bg-white text-gray-800 shadow-xl dark:bg-gray-800 dark:text-slate-200`}>
              <div className="p-6 sm:p-16 md:p-20">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="fill-current text-center text-xl font-bold">
                    Sign up
                  </h1>
                  <span className="fill-current text-center">
                    Start your journey with us
                  </span>
                </div>
                <div className="mx-auto my-4 max-w-md">
                  <button
                    onClick={() => login()}
                    className="group flex h-12 w-full select-none items-center justify-center gap-2 rounded-lg border border-gray-300 border-gray-300 bg-white px-6 text-gray-800 transition duration-300 hover:border-blue-400 hover:bg-blue-50 focus:border-blue-500 focus:bg-blue-50 active:bg-blue-100 dark:border-slate-600 dark:bg-gray-800 dark:text-slate-200 dark:hover:border-blue-400 dark:focus:border-blue-400 dark:focus:bg-gray-700">
                    <GoogleIcon />
                    <span className="text-sm font-semibold">
                      Sign up with Google
                    </span>
                  </button>
                </div>
                <div className="mx-auto my-4 max-w-md">
                  <button
                    onClick={handleGithubSignup}
                    className="group flex h-12 w-full select-none items-center justify-center gap-2 rounded-lg border border-gray-300 border-gray-300 bg-white px-6 text-gray-800 transition duration-300 hover:border-blue-400 hover:bg-blue-50 focus:border-blue-500 focus:bg-blue-50 active:bg-blue-100 dark:border-slate-600 dark:bg-gray-800 dark:text-slate-200 dark:hover:border-blue-400 dark:focus:border-blue-400 dark:focus:bg-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      className="h-6 w-6 dark:text-white"
                      viewBox="0 0 24 24">
                      <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1c0.4,0,0.7-0.1,0.9-0.2 c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6c0,0,1.4,0,2.8,1.3 C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3 c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z"></path>
                    </svg>
                    <span className="text-sm font-semibold">
                      Sign up with Github
                    </span>
                  </button>
                </div>
                <div className="mx-auto mb-3 flex max-w-md items-center">
                  <hr className="border-grey-500 h-0 grow border-b border-solid" />
                  <p className="text-grey-600 mx-4">
                    or use your email
                  </p>
                  <hr className="border-grey-500 h-0 grow border-b border-solid" />
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mx-auto max-w-md">
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="mb-2 block fill-current text-sm font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register("name", { required: true })}
                        placeholder="Enter your full name"
                        className={`block w-full rounded-lg border border-gray-300 border-gray-300 bg-gray-50 bg-white p-4 text-sm text-gray-800 text-gray-900 ${
                          errors.name
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        } outline-none focus:border-blue-500 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:text-slate-200 dark:focus:border-slate-300`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-red-500">
                          Name is required
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="mb-2 block fill-current text-sm font-medium">
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email", { required: true })}
                        placeholder="Enter your email"
                        className={`block w-full rounded-lg border border-gray-300 border-gray-300 bg-gray-50 bg-white p-4 text-sm text-gray-800 text-gray-900 ${
                          errors.email
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        } outline-none focus:border-blue-500 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:text-slate-200 dark:focus:border-slate-300`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-red-500">
                          Email is required
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <div className="relative overflow-hidden">
                        <label
                          htmlFor="password"
                          className="mb-2 block fill-current text-sm font-medium">
                          Choose a Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          {...register("password", {
                            required: true
                          })}
                          placeholder="Enter your password"
                          className={`block w-full rounded-lg border border-gray-300 border-gray-300 bg-gray-50 bg-white p-4 text-sm text-gray-800 text-gray-900 ${
                            errors.password
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          } overflow-hidden outline-none focus:border-blue-500 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:text-slate-200 dark:focus:border-slate-300`}
                        />
                        <div>
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 top-6 flex items-center overflow-hidden rounded-md px-3 text-sm"
                            onClick={togglePasswordVisibility}>
                            {showPassword ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-5 w-5">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                />
                              </svg>
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-red-500">
                          Password is required
                        </p>
                      )}
                    </div>
                    <div className="mb-2 mt-4 w-full">
                      <button
                        type="submit"
                        className="tracing-wide w-full rounded-md bg-black py-3 font-semibold text-white transition duration-300 dark:bg-white dark:text-black"
                        disabled={loading}>
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="h-5 w-5 animate-spin rounded-full border-4 border-solid border-blue-500  border-t-transparent"></div>
                          </div>
                        ) : (
                          "Sign up"
                        )}
                      </button>
                    </div>
                    <div className="mr-2 mt-2 flex items-center justify-center fill-current">
                      Already have an acoount?
                      <Link
                        href="/auth/login"
                        className={`ml-2 text-gray-800 hover:underline hover:underline dark:text-slate-200`}>
                        {" "}
                        Login
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
