export interface AIResponse {
  content: string;
  imageUrl: string;
}

export async function generatePostContent(prompt: string): Promise<AIResponse> {
  const response = await fetch("/api/posts/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate content");
  }

  const data = await response.json();
  return {
    content: data.content,
    imageUrl: data.imageUrl,
  };
}

export function getSamplePrompts(): string[] {
  return [
    "Write an engaging social media post about digital marketing trends",
    "Create a post about the importance of social media presence for businesses",
    "Generate content about effective social media strategies",
    "Write about the benefits of social media automation",
    "Create a post about social media analytics and insights",
  ];
}
