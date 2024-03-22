"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@/components/google";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox } from "@/components/ui/checkbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Spinner } from "@nextui-org/react";

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

  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  return (
    <>
      {errorMessage && (
        <div
          id="toast-danger"
          className="fixed right-5 top-5 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
          role="alert">
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <CloseIcon className="h-5 w-5" aria-hidden="true" />
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
            <CloseIcon className="h-3 w-3" aria-hidden="true" />
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
            <CloseIcon className="h-3 w-3" aria-hidden="true" />
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
                    onClick={handleGoogleLogin}
                    className="group flex h-12 w-full select-none items-center justify-center gap-2 rounded-lg border border-gray-300 border-gray-300 bg-white px-6 text-gray-800 transition duration-300 hover:border-blue-400 hover:bg-blue-50 focus:border-blue-500 focus:bg-blue-50 active:bg-blue-100 dark:border-slate-600 dark:bg-gray-800 dark:text-slate-200 dark:hover:border-blue-400 dark:focus:border-blue-400 dark:focus:bg-gray-700">
                    <GoogleIcon />
                    <span className="text-sm font-semibold">
                      Continue with Google
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
                              <VisibilityOffIcon className="h-5 w-5" />
                            ) : (
                              <VisibilityIcon className="h-5 w-5" />
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
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 hover:underline">
                        Forgot password?
                      </a>
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
                      <a
                        href="/auth/login"
                        className={`ml-2 text-gray-800 hover:underline dark:text-slate-200`}>
                        {" "}
                        Login
                      </a>
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
