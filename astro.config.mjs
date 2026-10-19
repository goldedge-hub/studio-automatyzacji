import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://studioautomatyzacji.pl',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/o-mnie') && !page.includes('/404') && !page.includes('/dziekujemy'),
    }),
  ],
  build: { inlineStylesheets: 'auto' },
});
