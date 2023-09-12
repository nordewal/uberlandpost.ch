import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://xn--berlandpost-shb.ch',
  integrations: [mdx(), sitemap()],
  experimental: {
    assets: true
   },
  cacheDir: "cache",
});
