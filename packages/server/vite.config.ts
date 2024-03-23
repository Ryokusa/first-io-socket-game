import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  envDir: "../../",
  server: {
    port: 3001,
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "./src/main.ts",
    }),
    tsconfigPaths(),
  ],
});
