"use client";

import { useState } from "react";
import axios from "axios";
import Label from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Loader2 } from "lucide-react";
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/forgot-password", { email });
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (err) {
      toast.error("Error sending password reset email");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-white px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your email below to reset your password.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit} >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" required type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}  />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {loading ? "Sending..." : "Reset Password"}
          </Button> 
        </form>
        <div className="text-center text-sm">
          Remember your password?
          <Link className="font-medium underline underline-offset-2" href="/auth/login">
            Login
          </Link>
        </div>
      </div>
    </div> 
  );
};

export default ForgotPassword;