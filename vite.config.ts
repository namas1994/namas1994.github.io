import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  // root: "src", // Set the root directory for the project
  base: "/",
  build: {
    sourcemap: false,
    outDir: "dist",
    minify: "esbuild",
    target: "esnext",
    rollupOptions: {
      external: [
        // Exclude all CLDR JSON files except those containing 'en'
        /cldr\/(?!en\.json$).*\.json/,
        // Exclude all message bundle JS files except those containing 'en'
        /messagebundle_(?!.*en(_[A-Za-z]+)?\.js).*\.js/,
      ],
      output: {
        manualChunks: {
          vendorUi5a: ["@ui5/webcomponents-base"],
          vendorUi5b: ["@ui5/webcomponents-react"],
          vendorUi5c: ["@ui5/webcomponents-icons/dist/Assets.js"],
          VendorReact: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
