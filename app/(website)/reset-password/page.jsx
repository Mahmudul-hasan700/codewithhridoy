"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner";
import { Label } from "@/components/ui/labels";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.info("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const token = new URLSearchParams(window.location.search).get(
        "token"
      );
      await axios.post("/api/reset-password", { token, newPassword });
      toast.success("Password reset successful");
    } catch (err) {
      toast.error("Error resetting password");
    }
    setLoading(false);
  };

  return (
    <div className="mx-5 md:mx-auto max-w-md space-y-6 py-12">
      <Card>
        <CardHeader>
        <CardTitle>
          Update Password
        </CardTitle>
          <CardDescription>
            Enter new password below to update your account password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                placeholder="Enter your new password"
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full"
                disabled={loading}
                required
              />
            </div>
            <div className="space-y-2 mt-3">
              <Label htmlFor="confirmPassword">
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                placeholder="Confirm your new password"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full"
                disabled={loading}
                required
              />
            </div>
            <div className="mt-4 space-y-2">
              <Button
                type="submit"
                className="w-full"
                disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Update Password"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
