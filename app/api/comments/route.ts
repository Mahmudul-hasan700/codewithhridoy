import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-03-25",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

export async function POST(request) {
  const { postId, name, email, comment } = await request.json();

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

    return Response.json(
      {
        message: "Comment submitted successfully",
        data: result
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving comment:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json(
    { message: "Method not allowed" },
    { status: 405 }
  );
}
