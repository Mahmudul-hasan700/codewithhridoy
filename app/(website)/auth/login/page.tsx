"use client";
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Github, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        ...data,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
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
              Welcome Back!
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Login to your account
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

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                <Label htmlFor="password">Enter your Password</Label>
                <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  placeholder="Enter your password"
               />
                  <Button
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
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
              <div className="flex items-center justify-center text-sm">
                Don't have an account?
                <Link
                  href="/auth/signup"
                  className="ml-2 font-medium underline underline-offset-4"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}