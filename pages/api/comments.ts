import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-03-25",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { postId, name, email, comment } = req.body;

    try {
      const newComment = {
        _type: "comment",
        post: {
          _type: "reference",
          _ref: postId
        },
        name,
        email,
        comment,
        _createdAt: new Date().toISOString()
      };

      const result = await client.create(newComment);

      res.status(201).json({
        message: "Comment submitted successfully",
        data: result
      });
    } catch (error) {
      console.error("Error saving comment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}