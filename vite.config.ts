import { defineConfig } from "vitest/config";
// do vitest/config for TS files instead of from 'vite'
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), svgr()],
  test: {
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
});
