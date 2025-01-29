import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Share2 } from "lucide-react";
import type { SelectPost } from "@db/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishPost } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface PostPreviewCardProps {
  post: SelectPost;
}

export default function PostPreviewCard({ post }: PostPreviewCardProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const publishMutation = useMutation({
    mutationFn: publishPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Post published",
        description: "Your post has been published to Facebook successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    },
  });

  const handlePublish = () => {
    publishMutation.mutate(post.id);
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={post.imageUrl}
          alt="Post preview"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-2 flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date(post.scheduledFor).toLocaleDateString()}
        </p>
        <p className="line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {post.status === "pending" ? (
          <Button 
            variant="secondary" 
            className="w-full"
            onClick={handlePublish}
            disabled={publishMutation.isPending}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Publish Now
          </Button>
        ) : (
          <div className="w-full flex justify-between text-sm text-muted-foreground">
            <span>👍 {post.platformData?.engagement?.likes || 0}</span>
            <span>💬 {post.platformData?.engagement?.comments || 0}</span>
            <span>🔄 {post.platformData?.engagement?.shares || 0}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
