import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.studioautomatyzacji.pl',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/o-mnie') &&
        !page.includes('/404') &&
        !page.includes('/dziekujemy') &&
        !page.includes('/cennik'),
    }),
  ],
  build: { inlineStylesheets: 'always' },
  vite: {
    build: {
      // Skrypty zawsze jako osobne pliki: tekst komunikatu kalkulatora nie może
      // trafić do HTML, bo bez JS byłby czytany jako widoczna treść.
      assetsInlineLimit: (filePath, content) =>
        filePath.endsWith('.css') ? content.length < 4096 : false,
    },
    // Cache w katalogu projektu (gitignored .astro/), nie we współdzielonym node_modules.
    cacheDir: './.astro/vite',
  },
});
