# Studio Automatyzacji — strona

Statyczna strona (Astro 5) dla studia automatyzacji e-commerce: mini-diagnoza, audyt, wdrożenia, opieka, white-label.
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

- `PUBLIC_CONTACT_EMAIL` — jeden adres kontaktowy używany w mailto, JSON-LD, stopce i dokumentach. Domyślnie `kontakt@studioautomatyzacji.pl`.
- `PUBLIC_FORM_ENDPOINT` — opcjonalny endpoint formularza (np. Formspree). Bez niego formularz działa jako mailto na `PUBLIC_CONTACT_EMAIL`.

Formularz `/kontakt` ma pięć pól: firma lub imię, e-mail (wymagany), proces, narzędzia, liczba osób; temat jest opcjonalny. Walidacja działa natywnie w HTML, także bez JavaScriptu. Po wysłaniu bez endpointu otwiera się program pocztowy z gotową wiadomością; strona pokazuje potwierdzenie i stały fallback z adresem e-mail.

## Stan skrzynki kontaktowej (ważne)

`kontakt@studioautomatyzacji.pl` jest zakładana przez Hermesa. **Do czasu potwierdzenia uruchomienia skrzynki formularz i mailto nie dojdą.** Nie publikować strony ani nie uruchamiać outreachu przed potwierdzeniem odbioru wiadomości testowej. W README nie ma publicznego komunikatu „skrzynka w toku” — na stronie nie może się on pojawić.

## Strony

- `/` — strona główna: e-commerce, problemy, usługi, mini-diagnoza, ścieżka 3 kroków, pakiety, opieka, scenariusz modelowy, kiedy nie, FAQ.
- `/ile-kosztuje` — cennik, porównanie pakietów, opieka Basic/Standard, zależności cenowe, kiedy automatyzacja się nie opłaca.
- `/audyt` — bezpłatna mini-diagnoza e-mailem i płatny audyt (cena w `src/data/pricing.ts`, odliczany od wdrożenia), porównanie obu usług.
- `/wdrozenia` — pakiety Start, Growth, Scale i porównanie.
- `/opieka` — opieka Basic i Standard (ceny w `src/data/pricing.ts`).
- `/dla-agencji` — white-label (cena w `src/data/pricing.ts`).
- `/zaufanie` — RODO, NDA, AI Act, własność kodu, monitoring, logi, jak pracujemy.
- `/case-studies` — jawne zasady publikacji realizacji, bez wymyślonych case studies.
- `/o-studiu`, `/kontakt`, `/polityka-prywatnosci`, `/regulamin`, `/404`.
- `/o-mnie` — przekierowanie na `/o-studiu`.

## Zasady treści

- Zero wymyślonych liczb, klientów, opinii, logotypów i wyników.
- Scenariusze efektywności są oznaczone jako „Scenariusz modelowy, nie wynik klienta”, z jawnymi założeniami. Szacunki niepewne: `[EST]`.
- Brak licznika wolnych terminów i sztucznego niedoboru.
- Ceny netto; jedyne źródło cen i daty aktualizacji: `src/data/pricing.ts`.
- Audyt jest odliczany od wdrożenia; nie ma obietnicy zwrotu gotówki.
- Kontakt i dane: `src/config.ts`.
- Target główny: MŚP e-commerce (Shoper, BaseLinker, Allegro, WooCommerce); usługi/biura jako drugi plan; agencje jako osobna ścieżka `/dla-agencji`.

## Publikacja

Push na `main` uruchamia GitHub Actions i publikuje `dist/` na GitHub Pages.
Domena główna: `www.studioautomatyzacji.pl` (apex przekierowuje na www; DNS w OVH). Sitemap generuje `@astrojs/sitemap`.
Nie pushować bez zgody Tomasa; commity lokalne na `rysiek/redesign`.
