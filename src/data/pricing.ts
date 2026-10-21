/**
 * Jedyne źródło cen na stronie (netto, PLN). Zmiana ceny = zmiana tutaj.
 * Uzasadnienie: decyzja Chiefa 21.10.2026 — obniżka 30% od cen z 19.10.2026.
 */
export const PRICE_UPDATED = '21.10.2026';

const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
export const zl = (n: number) => `${fmt(n)} zł`;

export const PRICES = {
  miniDiagnosis: 0,
  audit: 1043,
  start: 2380,
  growth: 7630,
  scaleFrom: 13930,
  careBasic: 273,
  careStandard: 553,
  whiteLabel: 1680,
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
