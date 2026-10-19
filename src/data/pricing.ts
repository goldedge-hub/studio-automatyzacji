/**
 * Jedyne źródło cen na stronie (netto, PLN). Zmiana ceny = zmiana tutaj.
 * Uzasadnienie rynkowe: /workspace/marketing/studio-automatyzacji/competitors-1910/RAPORT.md (poza repo).
 */
export const PRICE_UPDATED = '19.10.2026';

const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
export const zl = (n: number) => `${fmt(n)} zł`;

export const PRICES = {
  miniDiagnosis: 0,
  audit: 1490,
  start: 3400,
  growth: 10900,
  scaleFrom: 19900,
  careBasic: 390,
  careStandard: 790,
  whiteLabel: 2400,
} as const;

export const P = {
  miniDiagnosis: '0 zł',
  audit: zl(PRICES.audit),
  start: zl(PRICES.start),
  growth: zl(PRICES.growth),
  scaleFrom: `od ${zl(PRICES.scaleFrom)}`,
  careBasic: zl(PRICES.careBasic),
  careStandard: zl(PRICES.careStandard),
  whiteLabel: zl(PRICES.whiteLabel),
};

/** Zakres pakietów (bez zmian merytorycznych względem poprzedniej wersji, tylko ceny). */
export const PACKAGES = {
  start: { processes: '1 proces', integrations: 'do 3 integracji', warranty: '30 dni gwarancji', time: 'orientacyjnie 5–10 dni roboczych' },
  growth: { processes: '3 procesy', integrations: 'do 6 integracji', warranty: '60 dni gwarancji', time: 'orientacyjnie 3 tygodnie' },
  scale: { processes: 'od 4 procesów', integrations: 'ERP / WMS, wiele systemów', warranty: 'wg umowy', time: 'orientacyjnie 4–6 tygodni' },
};
