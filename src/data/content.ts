export const ecommerceProblems = [
  {
    t: 'Zamówienia z kilku kanałów lądują w arkuszu',
    d: 'Allegro, sklep i marketplace mają osobne panele. Ktoś przepisuje numer, dane klienta i status, a przy większym wolumenie rosną pomyłki.',
  },
  {
    t: 'Zwroty i reklamacje giną w skrzynce',
    d: 'Zgłoszenie przychodzi mailem albo formularzem, status zostaje w głowie pracownika, a klient pyta drugi raz. Brakuje jednego miejsca i jednego statusu.',
  },
  {
    t: 'Stany rozjeżdżają się między sklepem a magazynem',
    d: 'Shoper, BaseLinker i hurtownia pokazują różne liczby. Ręczna korekta działa do pierwszego większego zamówienia.',
  },
  {
    t: 'Faktury do zamówień wystawiane po kolei',
    d: 'Eksport, przepisanie danych i numeracja zajmują czas, a błąd w numerze trzeba poprawiać w kilku miejscach.',
  },
  {
    t: 'Korespondencja powtarza te same odpowiedzi',
    d: 'Status dostawy, termin zwrotu, brakujący rozmiar. Większość wiadomości ma ten sam schemat, ale każdą trzeba napisać od nowa.',
  },
  {
    t: 'Raport sprzedaży składany z eksportów',
    d: 'Zanim trafi do decyzji, ktoś scala pliki i sprawdza, która wersja jest aktualna. Nadal nie wiadomo, czy liczby się zgadzają.',
  },
];

export const ecommerceServices = [
  {
    t: 'Zamówienia i statusy',
    d: 'Shoper, BaseLinker, Allegro i WooCommerce wymieniają zamówienia, statusy i dane wysyłki bez przepisywania. Wyjątki trafiają do kolejki człowieka.',
    out: 'Jeden obieg zamówienia',
  },
  {
    t: 'Zwroty i reklamacje',
    d: 'Zgłoszenie z formularza lub maila dostaje numer, status i właściciela. Klient widzi, co dalej, a zespół nie szuka wątku w skrzynce.',
    out: 'Mniej ponownych pytań',
  },
  {
    t: 'Stany i dostępność',
    d: 'Synchronizacja stanów między sklepem, BaseLinkerem i hurtownią. Alert, gdy produkt schodzi do zera albo dane się rozjeżdżają.',
    out: 'Mniej sprzedaży bez towaru',
  },
  {
    t: 'Faktury i dokumenty',
    d: 'Faktury do zamówień, odczyt dokumentów i klasyfikacja. Numeracja i dane zgodne z systemem źródłowym, bez przepisywania.',
    out: 'Mniej ręcznego wpisywania',
  },
  {
    t: 'Korespondencja z klientem',
    d: 'AI przygotowuje szkic odpowiedzi na podstawie statusu zamówienia. Człowiek zatwierdza treść przed wysłaniem.',
    out: 'Szybciej, decyzja u człowieka',
  },
  {
    t: 'Raporty sprzedaży i marży',
    d: 'Jeden raport zamiast pięciu eksportów. Liczby zgodne ze źródłem i jasna definicja każdej kolumny.',
    out: 'Decyzje na bieżących danych',
  },
];

export const notWorth = [
  {
    t: 'Proces zdarza się kilka razy w miesiącu',
    d: 'Przy niskim wolumenie czas wdrożenia i utrzymania może być większy niż oszczędność. Czasem wystarczy szablon i checklista.',
  },
  {
    t: 'Proces jest właśnie zmieniany',
    d: 'Automatyzacja niestabilnego procesu utrwala bałagan. Najpierw porządkujemy reguły, potem budujemy.',
  },
  {
    t: 'Brak API i niski wolumen',
    d: 'Eksport plików albo automatyzacja interfejsu bywa możliwa, ale przy małej skali nie zwróci się. W mini-diagnozie mówimy to wprost.',
  },
  {
    t: 'Decyzja wymaga człowieka przy każdym kroku',
    d: 'Jeśli każdy rekord wymaga oceny, automatyzacja może przygotować dane, ale nie zastąpi decyzji. Wtedy lepiej usprawnić kolejkę pracy.',
  },
  {
    t: 'Dane nie mają źródła prawdy',
    d: 'Dwa sprzeczne arkusze i brak identyfikatora to problem danych, nie automatyzacji. Najpierw trzeba ustalić, który system jest nadrzędny.',
  },
  {
    t: 'To jednorazowe zadanie',
    d: 'Jednorazowy raport albo migracja nie potrzebuje stałej automatyzacji. Można to policzyć jako zwykłe zlecenie.',
  },
];
