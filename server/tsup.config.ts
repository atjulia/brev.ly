import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/infra/http/server.ts"],
  format: ["esm"],
  outDir: "dist",
  clean: true,
  minify: true,
  sourcemap: false,
  target: "node20",
  splitting: false,
  bundle: true,
  external: ["pg-native"],
});
