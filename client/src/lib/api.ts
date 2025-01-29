import type { SelectPost, InsertPost } from "@db/schema";

export async function fetchPosts(): Promise<SelectPost[]> {
  const response = await fetch("/api/posts");
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
}

export async function createPost(post: Omit<InsertPost, "id" | "userId">): Promise<SelectPost> {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) throw new Error("Failed to create post");
  return response.json();
}

export async function generateContent(prompt: string): Promise<string> {
  const response = await fetch("/api/posts/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  if (!response.ok) throw new Error("Failed to generate content");
  const data = await response.json();
  return data.content;
}

export async function publishPost(postId: number): Promise<void> {
  const response = await fetch(`/api/posts/${postId}/publish`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to publish post");
}
