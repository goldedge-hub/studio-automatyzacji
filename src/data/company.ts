/**
 * Dane usługodawcy (stopka, regulamin, polityka prywatności, JSON-LD).
 * Celowo PUSTE: decyzja o publikacji nazwy/NIP/adresu jeszcze nie zapadła.
 * Strony renderują te pola tylko, gdy są wypełnione; puste = nic się nie wyświetla
 * (żadnych placeholderów na stronie).
 */
export const COMPANY = {
  legalName: '',
  nip: '',
  regon: '',
  krs: '',
  street: '',
  postalCode: '',
  city: '',
  country: 'Polska',
};

export const COMPANY_READY = Boolean(COMPANY.legalName && COMPANY.nip && COMPANY.street && COMPANY.city);
export const COMPANY_ADDRESS = COMPANY.street ? `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}`.trim() : '';
