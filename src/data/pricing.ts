/**
 * Jedyne źródło cen na stronie (netto, PLN). Zmiana ceny = zmiana tutaj.
 * Model z 21.10.2026 (raport 11:31, akceptacja Chiefa): jeden plan opieki,
 * white-label z drugim progiem wolumenowym, audyt jako tania bramka wejściowa.
 */
export const PRICE_UPDATED = '21.10.2026';

const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
export const zl = (n: number) => `${fmt(n)} zł`;

export const PRICES = {
  miniDiagnosis: 0,
  audit: 623,
  start: 2730,
  growth: 6230,
  scaleFrom: 10500,
  care: 483,
  whiteLabel: 1750,
  whiteLabel3plus: 1540,
  caseStudy: 2030,
} as const;

export const P = {
  miniDiagnosis: '0 zł',
  audit: zl(PRICES.audit),
  start: zl(PRICES.start),
  growth: zl(PRICES.growth),
  scaleFrom: `od ${zl(PRICES.scaleFrom)}`,
  care: zl(PRICES.care),
  careMc: `${zl(PRICES.care)}/mc`,
  whiteLabel: zl(PRICES.whiteLabel),
  whiteLabel3plus: zl(PRICES.whiteLabel3plus),
  caseStudy: zl(PRICES.caseStudy),
};

/** Zakres pakietów (bez zmian merytorycznych względem poprzedniej wersji, tylko ceny). */
export const PACKAGES = {
  start: { processes: '1 proces', integrations: 'do 3 integracji', warranty: '30 dni gwarancji', time: 'orientacyjnie 5–10 dni roboczych' },
  growth: { processes: '3 procesy', integrations: 'do 6 integracji', warranty: '60 dni gwarancji', time: 'orientacyjnie 3 tygodnie' },
  scale: { processes: 'od 4 procesów', integrations: 'ERP / WMS, wiele systemów', warranty: 'wg umowy', time: 'orientacyjnie 4–6 tygodni' },
};
