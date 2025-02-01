import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "./", // ✅ Ensures correct asset paths in Vercel
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ✅ Fixes imports like "@/components"
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"), // ✅ Ensures correct entry point
      output: {
        manualChunks: undefined, // ✅ Prevents large chunk warnings
      },
    },
  },
  server: {
    port: 5173,
  },
});
