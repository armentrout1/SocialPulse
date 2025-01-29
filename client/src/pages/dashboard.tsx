import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PostPreviewCard from "@/components/posts/post-preview-card";
import { fetchPosts } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["/api/posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const scheduledPosts = posts?.filter(post => post.status === "pending") || [];
  const publishedPosts = posts?.filter(post => post.status === "published") || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{scheduledPosts.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Published Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{publishedPosts.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {publishedPosts.reduce((acc, post) => 
                acc + ((post.platformData?.engagement?.likes || 0) + 
                      (post.platformData?.engagement?.shares || 0) + 
                      (post.platformData?.engagement?.comments || 0)), 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Upcoming Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scheduledPosts.slice(0, 6).map((post) => (
          <PostPreviewCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
