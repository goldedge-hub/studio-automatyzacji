# Studio Automatyzacji — strona

Statyczna strona (Astro 5) dla biura automatyzacji: audyt, wdrożenia, opieka, white-label.

## Uruchomienie lokalne
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/
```

## Publikacja
Push na `main` uruchamia GitHub Actions i publikuje `dist/` na GitHub Pages.
Domena: `studioautomatyzacji.pl` (DNS w OVH).

## Struktura
- `/` — strona główna
- `/audyt` — audyt 890 zł
- `/wdrozenia` — pakiety i cennik
- `/opieka` — opieka 690 zł/mc
- `/dla-agencji` — white-label
- `/case-studies` — dowody
- `/o-mnie`, `/kontakt`, `/polityka-prywatnosci`, `/regulamin`

## Zasady treści
- Bez wymyślonych opinii i logotypów.
- Ceny netto, stałe, widoczne.
- Kontakt: tomasz.dziedzicki@gmail.com (do czasu skrzynki na domenie).
