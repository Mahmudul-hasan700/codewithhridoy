"use client";

import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async data => {
    try {
      const response = await axios.post("/api/storeUserData", data);
      console.log("Server Response:", response.data);

      if (response.status === 200) {
        toast.success("Signup successful!");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");

      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="bg-white py-16 dark:bg-gray-900">
      <div className="container mx-auto max-w-lg px-6 xl:px-40">
        <div className="w-full rounded-xl bg-white p-6 text-gray-800 dark:bg-gray-900 dark:text-slate-300 sm:p-16 lg:w-6/12 xl:w-6/12">
          <h1 className="mb-4 text-center text-xl font-bold">
            Sign up
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                {...register("fullName", { required: true })}
                placeholder="Enter your full name"
                className={`mb-2 block w-full rounded-md border ${
                  errors.fullName
                    ? "border-red-500"
                    : "border-gray-300"
                } px-4 py-2 focus:border-blue-500 focus:outline-none focus:invalid:border-red-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white`}
              />
              {errors.fullName && (
                <span className="text-sm text-red-500">
                  Full name is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium">
                Your Email Address
              </label>
              <input
                type="text"
                id="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className={`mb-2 block w-full rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } px-4 py-2 focus:border-blue-500 focus:outline-none focus:invalid:border-red-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white`}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  Email is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium">
                Choose a Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: true })}
                placeholder="Enter your password"
                className={`mb-2 block w-full rounded-md border ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } px-4 py-2 focus:border-blue-500 focus:outline-none focus:invalid:border-red-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white`}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  Password is required
                </span>
              )}
            </div>
            <div className="my-4">
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-500 py-3 font-medium text-white focus:outline-none">
                Create Account
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
