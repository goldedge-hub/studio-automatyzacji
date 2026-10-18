import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://studioautomatyzacji.pl',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
