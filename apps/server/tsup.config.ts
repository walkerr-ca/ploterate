import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["source/server.ts"],
  outDir: "output",
  target: "es2020",
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  tsconfig: "./tsconfig.json",
});
