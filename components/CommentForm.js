"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function CommentForm({ postId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [saveUserInfo, setSaveUserInfo] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("commentUserName");
    const savedEmail = localStorage.getItem("commentUserEmail");

    if (savedName && savedEmail) {
      setValue("name", savedName);
      setValue("email", savedEmail);
    }
  }, []);

  const onSubmitHandler = async data => {
    setSubmitting(true);

    try {
      const response = await axios.post(
        "/api/comments",
        {
          postId: postId,
          name: data.name,
          email: data.email,
          comment: data.comment
        },
        {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        }
      );

      if (saveUserInfo) {
        localStorage.setItem("commentUserName", data.name);
        localStorage.setItem("commentUserEmail", data.email);
      } else {
        localStorage.removeItem("commentUserName");
        localStorage.removeItem("commentUserEmail");
      }

      setSubmitting(false);
      toast.success("Comment submitted successfully!");
      console.log(response.data);
    } catch (error) {
      setSubmitting(false);
      toast.error("Error submitting comment. Please try again.");
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="mx-auto mt-8 w-full">
      <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-4">
          <Input
            type="text"
            id="name"
            {...register("name", { required: true })}
            error={errors.name && "Name is required"}
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            id="email"
            {...register("email", { required: true })}
            error={errors.email && "Email is required"}
          />
        </div>
      </div>
      <div className="mb-4">
        <Textarea
          id="comment"
          {...register("comment", { required: true })}
          error={errors.comment && "Comment is required"}
          className="w-full"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="save"
          checked={saveUserInfo}
          onCheckedChange={checked => setSaveUserInfo(checked)}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="save"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
            Save my name and email in this browser for the next time I
            comment.
          </label>
        </div>
      </div>
      <div className="mt-6">
        <Button
          type="submit"
          className={`w-full ${submitting ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
