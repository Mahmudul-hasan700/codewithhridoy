"use client";

import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
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

  const onSuccess = async googleUser => {
    const profile = googleUser.getBasicProfile();
    const userData = {
      fullName: profile.getName(),
      email: profile.getEmail()
    };
    // Call your backend API to store user data
    try {
      const response = await axios.post(
        "/api/storeUserData",
        userData
      );
      console.log("Server Response:", response.data);
      if (response.status === 200) {
        toast.success("Google signup successful!");
      } else {
        toast.error("Google signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error storing Google user data:", error);
      toast.error("Google signup failed. Please try again.");
    }
  };

  const login = useGoogleLogin({
    clientId:
      "685077013953-i9i1hjtrg91ap9indvgrn2n32s2p57ei.apps.googleusercontent.com",
    onSuccess: tokenResponse => console.log(tokenResponse),
    onFailure: error => console.error(error),
  });

  return (
    <div className="bg-white py-16 dark:bg-gray-900">
      <div className="container mx-auto max-w-lg px-6 xl:px-40">
        <div className="w-full rounded-xl bg-white p-6 text-gray-800 dark:bg-gray-900 dark:text-slate-300 sm:p-16 lg:w-6/12 xl:w-6/12">
          <h1 className="mb-4 text-center text-xl font-bold">
            Sign up
          </h1>
          <div className="my-4">
            <button
              onClick={() => login()}
              className="group flex h-12 w-full select-none items-center justify-center gap-2 rounded-lg border border-gray-300 border-gray-300 bg-white px-6 text-gray-800 transition duration-300 hover:border-blue-400 hover:bg-blue-50 focus:border-blue-500 focus:bg-blue-50 active:bg-blue-100 dark:border-slate-600 dark:bg-gray-800 dark:text-slate-200 dark:hover:border-blue-400 dark:focus:border-blue-400 dark:focus:bg-gray-700">
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
              Sign up with Google
            </button>
          </div>
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
