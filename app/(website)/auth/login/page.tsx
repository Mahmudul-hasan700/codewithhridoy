"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import GoogleIcon from "@/components/google";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState(''); 
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/login', { email, password });

      if (response.data.success) {
        toast.success('Login successful!');
        localStorage.setItem('token', response.data.token);
        router.push('/dashboard');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await router.push("/api/auth/google");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("An error occurred during Google login. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <>
      <div
        className="relative py-16">
        <div className="container relative m-auto px-6 xl:px-40">
          <div
            className="m-auto lg:w-6/12 xl:w-6/12">
            <div
              className="rounded-xl shadow-xl">
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
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading}
                    variant="outline"
                    className="flex w-full select-none items-center justify-center gap-2"
                  >
                    <GoogleIcon />
                    {isGoogleLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <span className="font-semibold">Continue with Google</span>
                    )}
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
                        onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            className="block w-full p-4"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
                          >
                            {showPassword ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                          </Button>
                      </div>
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
                        className="ml-2 hover:underline">
                        {" "}
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
