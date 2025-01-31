import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// ✅ Fix __dirname for ES Modules
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure Tailwind is loaded in Vite
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay() as PluginOption, // ✅ Explicitly cast as PluginOption
    themePlugin() as PluginOption, // ✅ Explicitly cast as PluginOption
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      "@db": path.join(__dirname, "db"),
      "@": path.join(__dirname, "src"), // Ensures `@/` points to `src/`
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
