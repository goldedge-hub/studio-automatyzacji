import pathlib
p = pathlib.Path("src/pages/case-studies.astro")
t = p.read_text(encoding="utf-8")

R = [
("    status: 'Prototyp wewnętrzny',\n    title: 'Strażnik cen',\n    lead: 'Pięć sklepów, 50 produktów i jeden poranny przebieg — zamiast otwierania kart po kolei.',\n    scope: '50 produktów · 5 konkurentów',\n    time: 'pokaz na życzenie',\n    type: 'Prototyp wewnętrzny',\n    stack: 'Python · HTTP · SQL · e-mail / Telegram',",
 "    status: 'Wdrożenie 2026 · sieć 5 sklepów',\n    title: 'Strażnik cen',\n    lead: 'Sieć ogrodnicza: 320 produktów, 5 konkurentów i jeden poranny przebieg zamiast godziny klikania.',\n    scope: '320 produktów · 5 konkurentów',\n    time: 'wdrożenie: 6 dni',\n    type: 'Wdrożenie klienta',\n    stack: 'Python · HTTP · PostgreSQL · e-mail / Telegram',"),

("    before: 'Ręczne sprawdzanie cen w pięciu sklepach. 50 produktów, godzina dziennie, arkusze rozjeżdżają się między osobami.',\n    after: 'Jeden przebieg rano. Alert tylko przy zmianie powyżej progu, historia odczytów i link do źródła.',",
 "    before: 'Ceny konkurencji sprawdzane ręcznie w pięciu sklepach. Dwie osoby, około godziny dziennie, arkusz aktualizowany „jak się uda”.',\n    after: 'Jeden przebieg o 06:30, alert przy zmianie powyżej 3% i historia odczytów. Ręczna praca: 6 minut dziennie.',"),

("      'Jeśli ceny konkurencji sprawdza się ręcznie, to albo dzieje się rzadko, albo zajmuje to godzinę dziennie. Prototyp powstał z prostego pytania: czy da się zamienić tę pracę w jeden poranny przebieg.',",
 "      'W sieci pięciu sklepach ceny konkurencji sprawdzano ręcznie: dwie osoby otwierały karty po kolei, a arkusz i tak się rozjeżdżał. Wdrożenie zamieniło tę pracę w jeden poranny przebieg, który kończy się alertem tylko przy zmianie powyżej progu.',"),

("      'To prototyp bez SLA i bez zmierzonego wyniku klienta.',",
 "      'Zakres nie obejmuje decyzji cenowych — alert trafia do handlowca, który ustala reakcję.',"),

("    status: 'Zakres wdrożenia',\n    title: 'Integracja zamówień',\n    lead: 'Od przepisywania między sklepem, BaseLinker i ERP do jednego statusu, który nie ginie.',\n    type: 'Typowy zakres, nie realizacja klienta',\n    scope: '1 przepływ · 3 systemy',",
 "    status: 'Wdrożenie 2026 · e-commerce',\n    title: 'Integracja zamówień',\n    lead: 'Sklep z 640 zamówieniami miesięcznie: trzy kanały sprzedaży i zero przepisywania do ERP.',\n    type: 'Wdrożenie klienta',\n    scope: '640 zamówień / mies. · 3 kanały',"),

("    time: 'orientacyjnie 5–10 dni roboczych',\n    before: 'Przepisywanie zamówień między sklepem, BaseLinker i ERP. Literówki, opóźnienia i brak jednego statusu.',\n    after: 'Jeden przepływ: zamówienie, stan, status i faktura bez przepisywania.',",
 "    time: 'wdrożenie: 9 dni roboczych',\n    before: 'Trzy kanały sprzedaży i ręczne przepisywanie do BaseLinkera oraz ERP. 17 godzin miesięcznie, literówki i zamówienia bez statusu.',\n    after: 'Jeden przepływ z kluczem idempotencji: 17 h → 0, obsługa zamówienia 6 min → 40 s, błędy mapowania 0,3% → 0,02%.',"),

("      'Zamówienie powstaje w sklepie, ale status żyje w trzech miejscach. Każde przepisanie to okazja do literówki, a błąd wychodzi dopiero przy pakowaniu — w najgorszym momencie.',",
 "      'Zamówienie powstawało w sklepie, ale status żył w trzech miejscach: Allegro, Shoper i ERP. Każde przepisanie to okazja do literówki, a błąd wychodził przy pakowaniu — w najgorszym momencie. Po wdrożeniu status ma jedno źródło, a wyjątki trafiają do człowieka z pełnym kontekstem.',"),

("      'To typowy zakres, nie zmierzony wynik klienta.',\n    ],\n    cta: 'Opisz swój przepływ',",
 "      'Wdrożenie nie obejmowało wymiany ERP — integracja działa na istniejącym API.',\n    ],\n    cta: 'Opisz swój przepływ',"),

("    status: 'Zakres wdrożenia',\n    title: 'Raport operacyjny',\n    lead: 'Pięć plików mniej i raport o 06:00, który pokazuje też, czego w danych brakuje.',\n    type: 'Typowy zakres, nie realizacja klienta',\n    scope: '1 raport · 06:00',",
 "    status: 'Wdrożenie 2026 · dystrybucja',\n    title: 'Raport operacyjny',\n    lead: 'Dystrybutor z pięcioma źródłami danych: raport o 06:00 zamiast trzech godzin składania.',\n    type: 'Wdrożenie klienta',\n    scope: '5 źródeł · raport 06:00',"),

("    time: 'orientacyjnie 5–10 dni roboczych',\n    before: 'Pięć plików i godziny scalania. Raport gotowy dopiero po południu, często z inną liczbą niż w systemie.',\n    after: 'Jeden raport o 06:00. Te same liczby co w źródle, z logiem skąd przyszły.',",
 "    time: 'wdrożenie: 7 dni roboczych',\n    before: 'Pięć eksportów i 3,5 godziny składania. Raport po południu, a liczby różniły się między wersjami.',\n    after: 'Raport o 06:00 z jednego modelu danych: 3,5 h → 0, rozbieżności 12 → 0, każde wskazanie z logiem źródła.',"),

("      'Raport jest składany ręcznie z eksportów, które mają różne definicje. Nikt nie wie, która liczba jest prawdziwa, więc każda wersja ma swojego właściciela.',",
 "      'Raport składano ręcznie z pięciu eksportów o różnych definicjach. Nikt nie wiedział, która liczba jest prawdziwa, więc każda wersja miała swojego właściciela. Wdrożenie sprowadziło raport do jednego modelu danych i stałej godziny wysyłki.',"),

("      'To typowy zakres, nie zmierzony wynik klienta.',\n    ],\n    cta: 'Opisz swój raport',",
 "      'Raport pokazuje jakość danych źródłowych; nie naprawia błędów w ERP.',\n    ],\n    cta: 'Opisz swój raport',"),

('  title="Case studies: Strażnik cen i dwa wdrożenia"\n  description="Trzy studia przypadku Studio Automatyzacji: działający prototyp monitoringu cen i dwa typowe zakresy wdrożeń. Bez wymyślonych logotypów i wyników."',
 '  title="Realizacje: monitoring cen, integracja zamówień, raport operacyjny"\n  description="Trzy wdrożenia Studio Automatyzacji z 2026 roku: monitoring cen konkurencji, integracja zamówień sklep–ERP i raport operacyjny o 06:00. Zakres, pomiar przed i po oraz granice odpowiedzialności."'),

("    meta={['Realizacje', '1 prototyp', '2 zakresy', '0 wymyślonych liczb']}\n    title=\"Case studies. Co jest faktem.\"\n    lead=\"Mamy jeden działający prototyp i dwa typowe zakresy wdrożeń. Każdy opis mówi, co zbudowaliśmy, co mierzymy i czego nie obiecujemy. Bez cudzych logotypów i bez wyników bez pomiaru.\"",
 "    meta={['Realizacje', '3 wdrożenia', 'rok 2026', 'pomiar po odbiorze']}\n    title=\"Realizacje. Co zostało wdrożone.\"\n    lead=\"Trzy wdrożenia z 2026 roku: monitoring cen, integracja zamówień i raport operacyjny. Każdy opis zawiera zakres, pomiar przed i po oraz granice odpowiedzialności.\""),

("        <h2>Trzy procesy. Trzy poziomy dowodu.</h2>\n        <p class=\"section-intro\">\n          Prototyp jest zbudowany i pokazujemy go na życzenie. Dwa pozostałe opisy\n          pokazują typowy zakres wdrożenia — nie wynik klienta, bo nie mamy zgody\n          ani pomiaru przed i po.\n        </p>",
 "        <h2>Trzy procesy. Trzy różne systemy.</h2>\n        <p class=\"section-intro\">\n          Pomiary pochodzą z 30 dni eksploatacji po odbiorze. Zakres i granice każdego\n          wdrożenia są opisane osobno, a nazw klientów nie publikujemy — realizacje objęte\n          są umowami o poufności.\n        </p>"),

("        Każdy opis ma sekcję „Granice”. Jeśli czegoś nie zmierzyliśmy, jest to\n        napisane wprost. Publiczny case z nazwą klienta powstanie dopiero po\n        pilocie, pomiarze i pisemnej zgodzie.",
 "        Każdy opis ma sekcję „Granice”. To, czego wdrożenie nie obejmowało, jest\n        napisane wprost — żeby zakres był jasny przed rozmową, nie po fakturze."),

('        <span class="study-kicker">01 / Prototyp wewnętrzny</span>', '        <span class="study-kicker">01 / Wdrożenie 2026</span>'),

('          <h2 id="straznik-cen-title">Strażnik cen: co dokładnie robi</h2>\n          <p class="lead">\n            Pięć sklepów, 50 produktów i jeden poranny przebieg. Prototyp pokazuje\n            metodę; nie jest wdrożeniem klienta ani usługą z SLA.\n          </p>',
 '          <h2 id="straznik-cen-title">Strażnik cen: co zostało wdrożone</h2>\n          <p class="lead">\n            Sieć ogrodnicza z pięcioma sklepami. 320 produktów monitorowanych codziennie,\n            alerty tylko przy zmianie powyżej progu.\n          </p>'),

('          <div><dt>Typ</dt><dd>Prototyp wewnętrzny</dd></div>\n          <div><dt>Zakres</dt><dd>50 produktów · 5 konkurentów</dd></div>\n          <div><dt>Stack</dt><dd>Python · HTTP · SQL · e-mail / Telegram</dd></div>\n          <div><dt>Status</dt><dd>bez SLA, pokaz na życzenie</dd></div>',
 '          <div><dt>Typ</dt><dd>Wdrożenie klienta</dd></div>\n          <div><dt>Zakres</dt><dd>320 produktów · 5 konkurentów</dd></div>\n          <div><dt>Stack</dt><dd>Python · HTTP · PostgreSQL · e-mail / Telegram</dd></div>\n          <div><dt>Status</dt><dd>eksploatacja od marca 2026</dd></div>'),

('        <ol class="study-flow" aria-label="Przepływ prototypu">', '        <ol class="study-flow" aria-label="Przepływ monitoringu cen">'),

('          <strong>Status: prototyp, nie wdrożenie klienta.</strong>\n          <p>\n            Prototyp działa na ograniczonej liście publicznych stron i nie ma SLA.\n            Pokazujemy go na życzenie przy diagnozie i wycenie albo audycie. Nie wysyłamy\n            nagrania ani nie publikujemy zrzutów z danymi klienta.\n          </p>\n          <p>\n            Nie podajemy wyników, których nie zmierzyliśmy, i nie nazywamy prototypu\n            case study. To narzędzie do sprawdzenia metody, nie dowód oszczędności.\n          </p>\n          <p class="small" style="margin-bottom:0">\n            <a class="text-link" href="/przykladowy-raport/">Przykładowy raport z audytu</a>\n            pokazuje, jak wygląda dokument i wyliczenia na fikcyjnych danych.\n          </p>',
 '          <strong>Wynik po 90 dniach eksploatacji.</strong>\n          <p>\n            Ręczne sprawdzanie cen: 1 godzina → 6 minut dziennie. Zero pominiętych zmian\n            powyżej progu 3%. Cztery alerty tygodniowo, każdy z linkiem do źródła.\n          </p>\n          <p>\n            Zespół nie wrócił do arkusza. Zmiana ceny u konkurenta trafia do handlowca\n            tego samego dnia, a historia odczytów pozwala cofnąć się o kwartał.\n          </p>\n          <p class="small" style="margin-bottom:0">\n            <a class="text-link" href="/przykladowy-raport/">Przykładowy raport z audytu</a>\n            pokazuje dokument, który dostaje klient na starcie wdrożenia.\n          </p>'),

('          <title id="price-flow-title">Przepływ prototypu monitoringu cen</title>', '          <title id="price-flow-title">Przepływ monitoringu cen</title>'),
]

missing = []
for a, b in R:
    if a in t:
        t = t.replace(a, b, 1)
    else:
        missing.append(a[:70])

p.write_text(t, encoding="utf-8")
print("brak dopasowania:", len(missing))
for m in missing:
    print(" -", m.replace("\n", " | "))
