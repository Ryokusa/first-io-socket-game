import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: "../../",
  plugins: [vue(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/socket.io": {
        target: "ws://localhost:3001",
        ws: true,
      },
    },
    hmr: {
      clientPort: 443,
    },
  },
});
