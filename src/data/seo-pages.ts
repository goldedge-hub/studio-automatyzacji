export type SeoGroup = 'integracje' | 'branze' | 'poradnik';

export interface SeoPage {
  href: string;
  title: string;
  group: SeoGroup;
}

/**
 * Nowe strony SEO pod intencję. Lista jest gotowa do wykorzystania w stopce
 * (Base.astro) bez dodatkowego mapowania. Kolejność: hub, potem podstrony.
 */
export const SEO_PAGES: SeoPage[] = [
  { href: '/integracje', title: 'Integracje e-commerce', group: 'integracje' },
  { href: '/integracje/baselinker-allegro', title: 'BaseLinker i Allegro', group: 'integracje' },
  { href: '/integracje/shoper', title: 'Shoper', group: 'integracje' },
  { href: '/integracje/woocommerce', title: 'WooCommerce', group: 'integracje' },
  { href: '/integracje/ksef', title: 'KSeF', group: 'integracje' },
  { href: '/branze', title: 'Branże', group: 'branze' },
  { href: '/branze/sklepy-wielokanalowe', title: 'Sklepy wielokanałowe', group: 'branze' },
  { href: '/branze/hurtownie-b2b', title: 'Hurtownie B2B', group: 'branze' },
  { href: '/branze/biura-rachunkowe', title: 'Biura rachunkowe', group: 'branze' },
  { href: '/poradnik', title: 'Poradnik', group: 'poradnik' },
  {
    href: '/poradnik/ile-kosztuje-integracja-baselinker-allegro',
    title: 'Ile kosztuje integracja BaseLinker i Allegro',
    group: 'poradnik',
  },
];
