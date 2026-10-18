# Studio Automatyzacji — strona

Statyczna strona (Astro 5) dla studia automatyzacji: audyt, wdrożenia, opieka, white-label.
Jasny motyw redakcyjny, fonty self-hosted, bez trackerów i zewnętrznych requestów.

## Uruchomienie lokalne

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/
npm run preview  # podgląd builda
```

## Konfiguracja

Skopiuj `.env.example` do `.env` i ustaw, jeśli potrzebujesz:

- `PUBLIC_CONTACT_EMAIL` — jeden adres kontaktowy używany w mailto, JSON-LD, stopce i dokumentach.
- `PUBLIC_FORM_ENDPOINT` — opcjonalny endpoint formularza (np. Formspree). Bez niego formularz działa jako mailto.
- `PUBLIC_BOOKING_URL` — opcjonalny link rezerwacji. Bez niego CTA prowadzi do `/kontakt?temat=rozmowa`.

Domyślny kontakt: `tomasz.dziedzicki@gmail.com` (skrzynka na domenie nie istnieje).

## Strony

- `/` — strona główna: hero, problemy, usługi, ścieżka, pakiety, scenariusz modelowy, FAQ.
- `/ile-kosztuje` — cennik, tabela pakietów, zależności cenowe, kiedy automatyzacja się nie opłaca.
- `/audyt` — audyt 890 zł netto, odliczany od wdrożenia.
- `/wdrozenia` — pakiety Start, Growth, Scale i porównanie.
- `/opieka` — opieka 690 zł netto/mc.
- `/dla-agencji` — white-label 2 500 zł netto/proces.
- `/zaufanie` — RODO, NDA, AI Act, własność kodu, monitoring, logi.
- `/case-studies` — jawne zasady publikacji realizacji, bez wymyślonych case studies.
- `/o-studiu`, `/kontakt`, `/polityka-prywatnosci`, `/regulamin`, `/404`.
- `/o-mnie` — przekierowanie na `/o-studiu`.

## Zasady treści

- Zero wymyślonych liczb, klientów, opinii, logotypów i wyników.
- Scenariusze efektywności są oznaczone jako „Scenariusz modelowy, nie wynik klienta”, z jawnymi założeniami.
- Brak licznika wolnych terminów.
- Ceny netto bez zmian; data aktualizacji cennika: 18.10.2026.
- Nie publikujemy obietnicy zwrotu opłaty za audyt. Warunek „nie proponujemy wdrożenia” jest widoczny; kwestia zwrotu pozostaje do decyzji Tomasa (patrz `PLAN.md`).
- Kontakt i dane: `src/config.ts`.

## Publikacja

Push na `main` uruchamia GitHub Actions i publikuje `dist/` na GitHub Pages.
Domena: `studioautomatyzacji.pl` (DNS w OVH). Sitemap generuje `@astrojs/sitemap`.
