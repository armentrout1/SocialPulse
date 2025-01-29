import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import PostPreviewCard from "./post-preview-card";
import { Loader2 } from "lucide-react";

export default function PostCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const { data: posts, isLoading } = useQuery({
    queryKey: ["/api/posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getPostsForDate = (date: Date) => {
    return posts?.filter(post => {
      const postDate = new Date(post.scheduledFor);
      return (
        postDate.getFullYear() === date.getFullYear() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getDate() === date.getDate()
      );
    }) || [];
  };

  return (
    <div className="grid md:grid-cols-[auto,1fr] gap-8">
      <Card className="p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Posts for {selectedDate?.toLocaleDateString()}
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {selectedDate && getPostsForDate(selectedDate).map((post) => (
            <PostPreviewCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
