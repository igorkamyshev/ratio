import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { purgeCss } from "vite-plugin-tailwind-purgecss";

export default defineConfig({
  plugins: [svelte(), purgeCss()],
});
