export const SITE_URL = 'https://studioautomatyzacji.pl';

const clean = (value: string | undefined) => (value && value.trim() ? value.trim() : '');

/** Jeden adres kontaktowy dla całej strony (mailto, JSON-LD, stopka, dokumenty). */
export const CONTACT_EMAIL =
  clean(import.meta.env.PUBLIC_CONTACT_EMAIL) || 'tomasz.dziedzicki@gmail.com';

/**
 * Opcjonalny endpoint formularza (np. Formspree). Bez niego formularz
 * otwiera klienta poczty z gotową wiadomością na CONTACT_EMAIL.
 */
export const FORM_ENDPOINT = clean(import.meta.env.PUBLIC_FORM_ENDPOINT);

/** Opcjonalny link rezerwacji. Bez niego CTA prowadzi do /kontakt?temat=rozmowa. */
export const BOOKING_URL = clean(import.meta.env.PUBLIC_BOOKING_URL);
export const BOOKING_HREF = BOOKING_URL || '/kontakt?temat=rozmowa';

export const PRICE_UPDATED = '18.10.2026';

export const mailtoHref = (subject = 'Zapytanie o automatyzację') =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
