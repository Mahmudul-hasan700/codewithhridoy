"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Github, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        ...data,
        rememberMe,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Signup successful!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signIn("google");
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Google login successful!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const result = await signIn("github");
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("GitHub login successful!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("GitHub login error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ zIndex: 9999 }}
      />
      <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
        <Card className="mx-auto w-full max-w-[450px] p-6">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              Sign up
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Start your journey with us
            </p>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full"
            >            
              <span>Continue with Google</span>
            </Button>
            <Button
              onClick={handleGitHubLogin}
              variant="outline"
              className="w-full"
            >
              <Github className="mr-2 h-4 w-4" />
              <span>Continue with GitHub</span>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or use your email
                </span>
              </div>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                 required
                  placeholder="Enter your full name"
                />      
              </div>
              <div>
                <Label htmlFor="email">Your Email Address</Label>
                <Input
                  type="email"
                  id="email"
             required
                  placeholder="Enter your email"
                />

              </div>
              <div>
                <Label htmlFor="password">Choose a Password</Label>
                <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  placeholder="Enter your password"
                />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"> 
                   {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked)}
                  />               
                    <Label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </Label>
                  
                </div>
                <Link
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Sign up"
                )}
              </Button>
              <div className="flex items-center justify-center text-sm">
                Already have an account?
                <Link
                  href="/auth/login"
                  className="ml-2 font-medium underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
