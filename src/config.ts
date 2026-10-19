export const SITE_URL = 'https://studioautomatyzacji.pl';

const clean = (value: string | undefined) => (value && value.trim() ? value.trim() : '');

/** Jeden adres kontaktowy dla całej strony (mailto, JSON-LD, stopka, dokumenty). */
export const CONTACT_EMAIL =
  clean(import.meta.env.PUBLIC_CONTACT_EMAIL) || 'kontakt@studioautomatyzacji.pl';

/**
 * Endpoint formularza (własna usługa studio-forms na VPS, zwykły POST + 303 na /dziekujemy).
 * Działa bez JavaScriptu. Nadpisanie: PUBLIC_FORM_ENDPOINT.
 */
export const FORM_ENDPOINT =
  clean(import.meta.env.PUBLIC_FORM_ENDPOINT) || 'https://radarnieruchomosci.com/sf/kontakt';

/** Analityka bez cookies: self-hosted Umami (ten sam serwer co formularz). */
export const UMAMI_SRC = 'https://radarnieruchomosci.com/u/s.js';
export const UMAMI_HOST = 'https://radarnieruchomosci.com/u';
export const UMAMI_WEBSITE_ID = '3cdb8d46-37a3-4f2f-b71f-8db532876f56';

/** Ścieżka kontaktu. Jeden cel dla wszystkich CTA w serwisie. */
export const CONTACT_HREF = '/kontakt';

export { PRICE_UPDATED } from './data/pricing';

/** Deklarowane czasy odpowiedzi (obsługiwane treścią strony). */
export const CONTACT_RESPONSE = '1 dzień roboczy';
export const DIAGNOSIS_RESPONSE = '2 dni robocze';

export const mailtoHref = (subject = 'Zapytanie o automatyzację') =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
