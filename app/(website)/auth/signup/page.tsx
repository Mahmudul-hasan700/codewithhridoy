"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import GoogleIcon from "@/components/google";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password
      });
      if (response.data.success) {
        toast.success("Signup successful!");
      } else {
        if (response.data.message === "User already exists.") {
          toast.error(
            "User already exists. Please use a different email."
          );
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred. Please try again.");
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
        <div className="container relative mx-auto px-6 xl:px-40">
          <div>
            <div className="w-full rounded-xl shadow-xl">
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
                  <Button
                    onClick={handleGoogleLogin}
                    variant="outline"
                    className="flex h-10 w-full select-none items-center justify-center gap-2">
                    <GoogleIcon />
                    <span className="text-sm font-semibold">
                      Continue with Google
                    </span>
                  </Button>
                </div>

                <div className="mx-auto mb-3 flex max-w-md items-center">
                  <hr className="border-grey-500 h-0 grow border-b border-solid" />
                  <p className="text-grey-600 mx-4">
                    or use your email
                  </p>
                  <hr className="border-grey-500 h-0 grow border-b border-solid" />
                </div>
                <form
                  onSubmit={onSubmit}
                  className="mx-auto max-w-md">
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="mb-2 block fill-current text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        placeholder="Enter your full name"
                        className="block w-full p-4"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="mb-2 block fill-current text-sm font-medium">
                        Your Email Address
                      </label>
                      <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        className="block w-full p-4"
                      />
                    </div>
                    <div className="mb-4">
                      <div>
                        <label
                          htmlFor="password"
                          className="mb-2 block fill-current text-sm font-medium">
                          Choose a Password
                        </label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={e =>
                              setPassword(e.target.value)
                            }
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
                        href="/forgot-password"
                        className="text-sm font-medium text-blue-600 hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <div className="mb-2 mt-4 w-full">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}>
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          "Sign up"
                        )}
                      </Button>
                    </div>
                    <div className="mr-2 mt-2 flex items-center justify-center fill-current">
                      Already have an acoount?
                      <a
                        href="/auth/login"
                        className="ml-2 text-gray-800 hover:underline">
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
