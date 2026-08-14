import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    warmup: {
      clientFiles: [
        "./src/pages/Home/Home.jsx",
        "./src/pages/Course/Course.jsx",
        "./src/pages/Problem/Problem.jsx",
        "./src/pages/Contest/Contest.jsx",
        "./src/pages/Badge/Badge.jsx",
        "./src/pages/Roadmap/Roadmap.jsx",
        "./src/pages/Leaderboard/Leaderboard.jsx",
        "./src/pages/Pricing/Pricing.jsx",
        "./src/pages/Setting/Setting.jsx",
        "./src/pages/DashBoard/DashBoard.jsx",
      ],
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.js"],
  },
});
