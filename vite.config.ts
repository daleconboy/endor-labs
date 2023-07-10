import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        // HACK: handle issue with the vite/rollup
        // env variable replacement in the msw library
        "globalThis.process.env.NODE_ENV": "development"
      }
    }
  }
});
