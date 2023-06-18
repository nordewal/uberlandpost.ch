import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://uberlandpost.pages.dev',
  integrations: [mdx(), sitemap(), react()],
  experimental: {
    assets: true
   },
});