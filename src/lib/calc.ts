/**
 * Czysta logika kalkulatora. Używana zarówno przy renderowaniu SSR,
 * jak i w skrypcie przeglądarkowym (Astro bundluje ten import).
 */

export type PaybackVerdict = 'ok' | 'bad';

export interface CalcResult {
  /** Godziny ręcznej pracy miesięcznie. */
  hours: number;
  /** Miesięczny koszt ręcznej pracy. */
  cost: number;
  /** Miesięczna oszczędność po przejęciu części pracy. */
  saving: number;
  /** Oszczędność w 12 miesięcy. */
  saving12: number;
}

/** share podajemy w procentach (np. 70), nie jako ułamek. */
export function compute(
  orders: number,
  minutes: number,
  days: number,
  rate: number,
  share: number,
): CalcResult {
  const hours = (orders * minutes * days) / 60;
  const cost = hours * rate;
  const saving = cost * (share / 100);
  const saving12 = saving * 12;
  return { hours, cost, saving, saving12 };
}

/**
 * "ok" tylko dla skończonego, dodatniego zwrotu do 12 miesięcy.
 * Infinity (brak oszczędności), NaN i zwrot ponad 12 mies. => "bad".
 */
export function paybackVerdict(payback: number): PaybackVerdict {
  return Number.isFinite(payback) && payback > 0 && payback <= 12 ? 'ok' : 'bad';
}
