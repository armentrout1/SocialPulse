import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchPosts } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";

export default function Analytics() {
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

  const publishedPosts = posts?.filter(post => post.status === "published") || [];
  
  const engagementData = publishedPosts.map(post => ({
    date: new Date(post.createdAt).toLocaleDateString(),
    likes: post.platformData?.engagement?.likes || 0,
    shares: post.platformData?.engagement?.shares || 0,
    comments: post.platformData?.engagement?.comments || 0,
  }));

  const totalEngagement = publishedPosts.reduce((acc, post) => ({
    likes: acc.likes + (post.platformData?.engagement?.likes || 0),
    shares: acc.shares + (post.platformData?.engagement?.shares || 0),
    comments: acc.comments + (post.platformData?.engagement?.comments || 0),
  }), { likes: 0, shares: 0, comments: 0 });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalEngagement.likes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Shares</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalEngagement.shares}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalEngagement.comments}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Engagement Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="likes" fill="var(--chart-1)" name="Likes" />
                <Bar dataKey="shares" fill="var(--chart-2)" name="Shares" />
                <Bar dataKey="comments" fill="var(--chart-3)" name="Comments" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
