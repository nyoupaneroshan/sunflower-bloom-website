import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env.DB_HOST': JSON.stringify(process.env.DB_HOST || 'localhost'),
    'process.env.DB_USER': JSON.stringify(process.env.DB_USER || 'root'),
    'process.env.DB_PASSWORD': JSON.stringify(process.env.DB_PASSWORD || ''),
    'process.env.DB_DATABASE': JSON.stringify(process.env.DB_DATABASE || 'sunflower'),
  },
}));