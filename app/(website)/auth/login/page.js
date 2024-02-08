"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async data => {
    try {
      const response = await axios.post("/api/login", data);
      if (response.data.success) {
        setSuccessMessage("Login successful!");
        setErrorMessage("");
        reset();
      } else {
        setErrorMessage(response.data.message);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-gray-50 py-16 dark:bg-gray-900 dark:text-slate-200">
      <div className="container relative m-auto px-6 xl:px-40">
        <div
          className={`m-auto text-gray-800 dark:bg-gray-900 dark:text-slate-200 lg:w-6/12 xl:w-6/12`}>
          <div className="p-6 py-10 sm:p-16">
            <div className="flex flex-col items-center justify-center my-5">
              <h1 className="fill-current text-center text-xl font-bold">
                Login
              </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div className="mb-4">
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className={`block w-full rounded-lg border border-gray-300 border-gray-300 bg-gray-50 bg-white p-4 text-sm text-gray-800 text-gray-900 outline-none focus:border-blue-500 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-gray-900 dark:text-slate-200 dark:focus:border-slate-300`}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500">Email is required</p>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className={`block w-full rounded-lg border border-gray-300 border-gray-300 bg-gray-50 bg-white p-4 text-sm text-gray-800 text-gray-900 outline-none focus:border-blue-500 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-gray-900 dark:text-slate-200 dark:focus:border-slate-300`}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-red-500">
                      Password is required
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-500 py-3 text-white transition duration-300 hover:bg-blue-600">
                  Login
                </button>
              </div>
            </form>
            <div className="mr-2 mt-2 flex items-center justify-center fill-current">
              Don't have an acoount?
              <Link
                href="/auth/signup"
                className={`text-dark ml-2 text-sm text-slate-200 hover:underline hover:underline`}>
                {" "}
                Signup
              </Link>
            </div>
            {errorMessage && (
              <p className="mt-4 text-red-500">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="mt-4 text-green-500">{successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
