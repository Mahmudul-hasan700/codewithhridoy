"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useGoogleLogin,
  GoogleLogin
} from "@react-oauth/google";
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      const requestData = { name, email, profileUrl: imageUrl };
      const response = await axios.post(
        "/api/googleSignup",
        requestData
      );

      if (response.data.success) {
        setSuccessMessage("Google signup successful!");
        setErrorMessage("");
        console.log(
          "User registered successfully:",
          response.data.message
        );
      } else {
        setErrorMessage("Google signup failed. Please try again.");
        setSuccessMessage("");
        console.error("Google signup error:", response.data.message);
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred during Google signup. Please try again."
      );
      setSuccessMessage("");
      console.error("Google signup error:", error);
    }
  };

  const login = useGoogleLogin({
    clientId:
      "394811475866-24gg5m7tk15sljh9cat135vjk7m287qh.apps.googleusercontent.com",
    onSuccess: handleGoogleSignup,
    onFailure: error => console.error("Google login failure:", error)
  });
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
            {errorMessage}
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
          className="fixed right-5 top-5 z-50 mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
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
          <div className="ms-3 text-sm font-normal">
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
        <div className="container relative m-auto px-6 xl:px-40">
          <div
            className={`m-auto text-gray-800 dark:bg-gray-900 dark:text-slate-200 lg:w-6/12 xl:w-6/12`}>
            <div
              className={`rounded-xl bg-white text-gray-800 shadow-xl dark:bg-gray-800 dark:text-slate-200`}>
              <div className="p-6 sm:p-16">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="fill-current text-center text-xl font-bold">
                    Sign up
                  </h1>
                  <span className="fill-current text-center">
                    Start your journey with us
                  </span>
                </div>
                <div className="mx-auto my-4 max-w-sm">
                  <button
                    onClick={() => login()}
                    className="group flex h-12 w-full select-none items-center justify-center gap-2 rounded-lg border border-gray-300 border-gray-300 bg-white px-6 text-gray-800 transition duration-300 hover:border-blue-400 hover:bg-blue-50 focus:border-blue-500 focus:bg-blue-50 active:bg-blue-100 dark:border-slate-600 dark:bg-gray-800 dark:text-slate-200 dark:hover:border-blue-400 dark:focus:border-blue-400 dark:focus:bg-gray-700">
                    <GoogleIcon />
                    Continue with Google
                  </button>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">

                  <GoogleLogin
                    clientId="394811475866-24gg5m7tk15sljh9cat135vjk7m287qh.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                    cookiePolicy={'single_host_origin'}
                  />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                          Password is required
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="mb-2 block fill-current text-sm font-medium">
                        Choose a Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        {...register("password", { required: true })}
                        placeholder="Enter your password"
                        className={`block w-full rounded-lg border border-gray-300 border-gray-300 bg-gray-50 bg-white p-4 text-sm text-gray-800 text-gray-900 ${
                          errors.password
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        } outline-none focus:border-blue-500 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:text-slate-200 dark:focus:border-slate-300`}
                      />
                      {errors.password && (
                        <p className="mt-1 text-red-500">
                          Password is required
                        </p>
                      )}
                    </div>
                    <div className="mb-2 w-full">
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
                        className={`ml-2 text-sm text-gray-800 hover:underline hover:underline dark:text-slate-200`}>
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
};

const GoogleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      className="h-7 w-7"
      viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
  );
};

export default Signup;
