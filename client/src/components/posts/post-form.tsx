import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, generateContent } from "@/lib/api";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PostFormProps {
  onSuccess?: () => void;
}

interface FormData {
  content: string;
  imageUrl: string;
  scheduledFor: string;
}

export default function PostForm({ onSuccess }: PostFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Post created",
        description: "Your post has been scheduled successfully.",
      });
      onSuccess?.();
    },
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const content = await generateContent("Write an engaging social media post about digital marketing");
      setValue("content", content);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    }
    setIsGenerating(false);
  };

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="content">Content</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Wand2 className="h-4 w-4 mr-2" />
            )}
            Generate
          </Button>
        </div>
        <Textarea
          id="content"
          {...register("content", { required: true })}
          placeholder="Enter your post content..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          {...register("imageUrl", { required: true })}
          placeholder="Enter image URL..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="scheduledFor">Schedule For</Label>
        <Input
          id="scheduledFor"
          type="datetime-local"
          {...register("scheduledFor", { required: true })}
        />
      </div>

      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending && (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        )}
        Schedule Post
      </Button>
    </form>
  );
}
