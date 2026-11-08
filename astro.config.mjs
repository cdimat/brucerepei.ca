// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Used for canonical URLs, social cards and the sitemap.
  site: 'https://brucerepei.ca',
  trailingSlash: 'always',
  // Astro's HTML compression strips spaces at line breaks next to inline tags (e.g. <em>), so keep it off.
  compressHTML: false,
  integrations: [sitemap()],
  image: {
    responsiveStyles: false,
  },
});
