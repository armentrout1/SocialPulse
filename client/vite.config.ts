import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal"; // If this causes issues, remove it
import { fileURLToPath } from "url";

// ✅ Fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure Tailwind is loaded in Vite
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay() as PluginOption, // If this causes issues, remove it
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      "@db": path.join(__dirname, "db"),
      "@": path.join(__dirname, "src"),
    },
  },
  build: {
    outDir: path.join(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});
