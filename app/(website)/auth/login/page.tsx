"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import GoogleIcon from "@/components/google";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        if (response.data.isEmailVerified) {
          toast.success("Login successful!");
          localStorage.setItem("token", response.data.token);
          router.push("/dashboard");
        } else {
          toast.error(
            "Please verify your email before logging in. Check your inbox for the verification link."
          );
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "Invalid password."
      ) {
        toast.error("Password incorrect. Please try again.");
      } else if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.message === "User not found."
      ) {
        toast.error("User not found. Please sign up first.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = () => {
    router.push("/api/auth/google");
  };

  return (
    <>
      <div className="relative py-16">
        <div className="container relative m-auto px-6 xl:px-40">
          <div className="m-auto lg:w-6/12 xl:w-6/12">
            <div className="rounded-xl shadow-xl">
              <div className="p-6 sm:p-16">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="fill-current text-center text-xl font-bold">
                    Welcome Back!
                  </h1>
                  <span className="fill-current text-center">
                    Login to your account
                  </span>
                </div>

                <div className="mx-auto my-4 max-w-md">
                  <Button
                    variant="outline"
                    className="flex w-full select-none items-center justify-center gap-2">
                    <GoogleIcon />
                    
                      <span className="font-semibold">
                        Continue with Google
                      </span>
                
                  </Button>
                </div>

                <div className="mx-auto mb-3 flex max-w-md items-center">
                  <hr className="border-grey-500 h-0 grow border-b border-solid dark:border-gray-700" />
                  <p className="text-grey-600 mx-4">
                    or use your email
                  </p>
                  <hr className="border-grey-500 h-0 grow border-b border-solid dark:border-gray-700" />
                </div>

                <form
                  onSubmit={onSubmit}
                  className="mx-auto max-w-md">
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="mb-2 block fill-current text-sm font-medium">
                        Your Email Address
                      </label>
                      <Input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="block w-full p-4"
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="mb-2 block fill-current text-sm font-medium">
                          Choose a Password
                        </label>
                        <Link
                          href="/forgot-password"
                          className="text-sm font-medium text-blue-600 hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          required
                          placeholder="Enter your password"
                          className="block w-full p-4"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none">
                          {showPassword ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="mb-2 mt-4 w-full">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}>
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </div>
                    <div className="mr-2 mt-2 flex items-center justify-center fill-current">
                      Don't have an acoount?
                      <a
                        href="/auth/signup"
                        className="font-medium underline underline-offset-2">
                        {"  "}
                        Sign Up
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