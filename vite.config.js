import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    port: 5173,
    proxy: {
      "/api/judge": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on("error", (_err, _req, res) => {
            if (res && !res.headersSent && res.writeHead) {
              res.writeHead(503, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  error: "Judge Backend Offline",
                  message: "Django Judge server chưa được bật trên cổng 8000",
                }),
              );
            }
          });
        },
      },
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on("error", (_err, _req, res) => {
            if (res && !res.headersSent && res.writeHead) {
              res.writeHead(503, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  error: "Backend Offline",
                  message: "Backend server chưa được bật trên cổng 3000",
                }),
              );
            }
          });
        },
      },
      "/socket.io": {
        target: "http://localhost:3000",
        ws: true,
        configure: (proxy) => {
          proxy.on("error", () => {
            // Im lặng khi socket backend chưa bật
          });
        },
      },
    },
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
        "./src/pages/Blog/Blog.jsx",
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
