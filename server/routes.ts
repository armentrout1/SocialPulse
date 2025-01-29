import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { posts } from "@db/schema";
import { generateContent } from "./services/ai";
import { publishToFacebook } from "./services/facebook";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);

  // Posts management
  app.get("/api/posts", async (req, res) => {
    const allPosts = await db.select().from(posts).orderBy(posts.scheduledFor);
    res.json(allPosts);
  });

  app.post("/api/posts", async (req, res) => {
    const { content, imageUrl, scheduledFor } = req.body;
    
    const newPost = await db.insert(posts).values({
      content,
      imageUrl,
      scheduledFor: new Date(scheduledFor),
      userId: 1, // TODO: Get from auth
    }).returning();

    res.json(newPost[0]);
  });

  app.post("/api/posts/generate", async (req, res) => {
    const { prompt } = req.body;
    const content = await generateContent(prompt);
    res.json({ content });
  });

  app.post("/api/posts/:id/publish", async (req, res) => {
    const { id } = req.params;
    
    const post = await db.select().from(posts).where(eq(posts.id, parseInt(id))).limit(1);
    if (!post.length) {
      return res.status(404).json({ message: "Post not found" });
    }

    try {
      const result = await publishToFacebook(post[0]);
      await db
        .update(posts)
        .set({ 
          status: "published",
          platformData: { 
            fbPostId: result.id,
            engagement: { likes: 0, shares: 0, comments: 0 }
          }
        })
        .where(eq(posts.id, parseInt(id)));
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  return httpServer;
}
