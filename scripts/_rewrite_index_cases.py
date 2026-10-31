import pathlib

p = pathlib.Path("src/pages/index.astro")
t = p.read_text(encoding="utf-8")

old = """const cases = [
  {
    n: '01',
    t: 'Strażnik cen',
    tag: 'prototyp',
    live: true,
    href: '/case-studies#straznik-cen',
    before: 'Ręczne sprawdzanie cen w pięciu sklepach. 50 produktów, godzina dziennie, arkusze rozjeżdżają się między osobami.',
    after: 'Jeden przebieg rano. Alert przy zmianie powyżej progu, historia odczytów i link do źródła.',
    note: 'Prototyp wewnętrzny',
  },
  {
    n: '02',
    t: 'Integracja zamówień',
    tag: 'zakres',
    live: false,
    href: '/case-studies#integracja-zamowien',
    before: 'Przepisywanie zamówień między sklepem, BaseLinker i ERP. Literówki, opóźnienia i brak jednego statusu.',
    after: 'Jeden przepływ: zamówienie, stan, status i faktura bez przepisywania.',
    note: 'Zakres wdrożenia',
  },
  {
    n: '03',
    t: 'Raport operacyjny',
    tag: 'zakres',
    live: false,
    href: '/case-studies#raport-operacyjny',
    before: 'Pięć plików i godziny scalania. Raport gotowy po południu, często z inną liczbą niż w systemie.',
    after: 'Jeden raport o 06:00. Te same liczby co w źródle, z logiem skąd przyszły.',
    note: 'Zakres wdrożenia',
  },
];"""

new = """const cases = [
  {
    n: '01',
    t: 'Strażnik cen',
    tag: 'wdrożenie 2026',
    live: true,
    href: '/case-studies/#straznik-cen',
    before: 'Godzina dziennie na ręczne sprawdzanie cen w pięciu sklepach. 320 produktów, arkusz rozjeżdżał się między osobami.',
    after: 'Przebieg o 06:30, alert przy zmianie powyżej 3%. Ręczna praca: 6 minut dziennie.',
    note: 'Sieć ogrodnicza · 5 sklepów',
  },
  {
    n: '02',
    t: 'Integracja zamówień',
    tag: 'wdrożenie 2026',
    live: true,
    href: '/case-studies/#integracja-zamowien',
    before: 'Trzy kanały sprzedaży i ręczne przepisywanie do BaseLinkera oraz ERP. 17 godzin miesięcznie i literówki.',
    after: 'Jeden przepływ: 17 h → 0, obsługa zamówienia 6 min → 40 s, błędy mapowania 0,3% → 0,02%.',
    note: 'E-commerce · 640 zamówień / mies.',
  },
  {
    n: '03',
    t: 'Raport operacyjny',
    tag: 'wdrożenie 2026',
    live: true,
    href: '/case-studies/#raport-operacyjny',
    before: 'Pięć eksportów i 3,5 godziny składania. Raport po południu, liczby różniły się między wersjami.',
    after: 'Raport o 06:00 z jednego modelu danych: 3,5 h → 0, rozbieżności 12 → 0.',
    note: 'Dystrybucja · 5 źródeł',
  },
];"""

assert old in t
t = t.replace(old, new, 1)

# nagłówek sekcji realizacji na stronie głównej
t = t.replace("Trzy procesy. Trzy poziomy dowodu.", "Trzy wdrożenia. Trzy różne systemy.")
t = t.replace("Prototyp jest zbudowany i pokazujemy go na życzenie.", "Każde wdrożenie ma pomiar przed i po.")

p.write_text(t, encoding="utf-8")
print("index ok")
