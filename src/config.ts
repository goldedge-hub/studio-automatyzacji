export const SITE_URL = 'https://studioautomatyzacji.pl';

const clean = (value: string | undefined) => (value && value.trim() ? value.trim() : '');

/** Jeden adres kontaktowy dla całej strony (mailto, JSON-LD, stopka, dokumenty). */
export const CONTACT_EMAIL =
  clean(import.meta.env.PUBLIC_CONTACT_EMAIL) || 'kontakt@studioautomatyzacji.pl';

/**
 * Opcjonalny endpoint formularza (np. Formspree). Bez niego formularz
 * otwiera klienta poczty z gotową wiadomością na CONTACT_EMAIL.
 */
export const FORM_ENDPOINT = clean(import.meta.env.PUBLIC_FORM_ENDPOINT);

/** Ścieżka kontaktu. Jeden cel dla wszystkich CTA w serwisie. */
export const CONTACT_HREF = '/kontakt';

export const PRICE_UPDATED = '18.10.2026';

/** Deklarowane czasy odpowiedzi (obsługiwane treścią strony). */
export const CONTACT_RESPONSE = '1 dzień roboczy';
export const DIAGNOSIS_RESPONSE = '2 dni robocze';

export const mailtoHref = (subject = 'Zapytanie o automatyzację') =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
