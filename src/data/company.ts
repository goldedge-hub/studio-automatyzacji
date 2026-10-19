/**
 * Dane usługodawcy (stopka, regulamin, polityka prywatności, JSON-LD).
 * UZUPEŁNIĆ przed publikacją: dane przekaże Hermes. Nie wpisywać nic z głowy.
 * Dopóki pole zaczyna się od "[DO UZUPEŁNIENIA", strona pokazuje je jako widoczny placeholder,
 * a `COMPANY_READY` jest false (build ostrzega w konsoli).
 */
export const COMPANY = {
  legalName: '[DO UZUPEŁNIENIA: pełna nazwa firmy]',
  nip: '[DO UZUPEŁNIENIA: NIP]',
  regon: '', // opcjonalnie
  krs: '', // tylko spółka
  street: '[DO UZUPEŁNIENIA: ulica i numer]',
  postalCode: '[DO UZUPEŁNIENIA: kod]',
  city: '[DO UZUPEŁNIENIA: miejscowość]',
  country: 'Polska',
};

export const COMPANY_READY = !Object.values(COMPANY).some((v) => String(v).startsWith('[DO UZUPEŁNIENIA'));
export const COMPANY_ADDRESS = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}`;

if (!COMPANY_READY) {
  console.warn('[company.ts] Dane usługodawcy niekompletne — placeholdery widoczne na stronie.');
}
