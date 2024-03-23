import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  envDir: "../../",
  server: {
    port: 3001,
  },
  plugins: [tsconfigPaths()],
});
