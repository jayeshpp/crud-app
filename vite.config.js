import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
        components: path.resolve(__dirname, "./src/components/"),
        public: path.resolve(__dirname, "./public/"),
        modules: path.resolve(__dirname, "./src/modules"),
        services: path.resolve(__dirname, "./src/services"),
        store: path.resolve(__dirname, "./src/store"),
        constants: path.resolve(__dirname, "./src/constants"),
        routes: path.resolve(__dirname, "./src/routes"),
        styles: path.resolve(__dirname, "./src/styles"),
        mocks: path.resolve(__dirname, "./src/mocks"),
        utils: path.resolve(__dirname, "./src/utils"),
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "src/setup.js",
      coverage: {
        reporter: ["text"],
      },
    },
  };
});
