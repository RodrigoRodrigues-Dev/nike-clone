import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://nike-vibe-shop.vercel.app',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
