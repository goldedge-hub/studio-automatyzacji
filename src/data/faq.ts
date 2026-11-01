import { P } from './pricing';
import { PRICE_UPDATED } from '../config';

export const homeFaq = [
  {
    q: 'Jak zacząć współpracę?',
    a: 'Napisz przez formularz na stronie /kontakt. Wystarczy firma lub imię, e-mail, opis procesu, narzędzia i liczba osób, które go wykonują. Odpowiadamy w ciągu 24 godzin. Nie trzeba znać budżetu ani przygotowywać prezentacji.',
  },
  {
    q: 'Czym jest bezpłatna diagnoza i wycena e-mailem?',
    a: 'To krótka pisemna ocena jednego procesu razem z orientacyjną wyceną wdrożenia. Wypełniasz formularz, a w ciągu 24 godzin dostajesz e-mail: czy proces warto automatyzować, ile godzin może oszczędzić (szacunek), jakich narzędzi wymaga i ile kosztuje wdrożenie rekomendowanego zakresu. Wycena jest bezpłatna i niezobowiązująca. Nie zastępuje pogłębionego audytu (mapa procesu, koszt pracy, ryzyka, plan).',
  },
  {
    q: `Czym różni się diagnoza i wycena od audytu za ${P.audit}?`,
    a: 'Diagnoza i wycena odpowiadają na pytanie „czy to ma sens i ile kosztuje” na podstawie opisu z formularza — bezpłatnie, w ciągu 24 godzin. Audyt to płatna, pogłębiona praca: ustalenia 60–90 minut, analiza systemów i danych, mapa procesu, koszt ręcznej pracy, priorytety, ryzyka, plan wdrożenia i 30-minutowe omówienie raportu. Audyt ma sens, gdy decyzja dotyczy większego wdrożenia albo kilku procesów naraz.',
  },
  {
    q: 'Ile kosztuje audyt i czy jest odliczany?',
    a: `Audyt kosztuje ${P.audit} netto. Jeśli dojdzie do wdrożenia, odliczamy tę kwotę od pierwszej faktury. Jeśli nie, audyt pozostaje osobną usługą, a raport zostaje u Ciebie. Nie obiecujemy zwrotu gotówki za audyt.`,
  },
  {
    q: 'Ile kosztują wdrożenia?',
    a: `Start ${P.start} netto (1 proces, do 3 integracji, 30 dni gwarancji), Growth ${P.growth} netto (3 procesy, do 6 integracji, 60 dni gwarancji), Scale ${P.scaleFrom} netto (od 4 procesów lub większe środowisko, wycena indywidualna). Cena jest stała dla zakresu opisanego przed startem.`,
  },
  {
    q: 'Ile trwa wdrożenie?',
    a: 'Terminy są orientacyjne: Start zwykle 5–10 dni roboczych, Growth około 3 tygodni, Scale 4–6 tygodni. Liczymy je od przekazania dostępów i danych testowych. Opóźnienia po stronie systemów klienta przesuwają termin.',
  },
  {
    q: 'Czy ceny są netto czy brutto?',
    a: 'Wszystkie ceny na stronie są netto. Do zamówienia wystawiamy fakturę, a kwota do zapłaty zależy od Twojej sytuacji podatkowej. Nie doliczamy ukrytych opłat za dokumentację, testy ani przekazanie kodu.',
  },
  {
    q: 'Czy dostaję kod i dokumentację?',
    a: 'Tak. Po opłaceniu zlecenia kod źródłowy, dokumentacja i dostępy zostają po Twojej stronie. Możesz rozwijać rozwiązanie sam albo z innym wykonawcą. Nie blokujemy go własnym abonamentem ani zamkniętą platformą.',
  },
  {
    q: 'Czy podpisujecie NDA?',
    a: 'Tak, na życzenie i przed przekazaniem materiałów o procesach, danych i systemach. Jeśli w projekcie uczestniczą podwykonawcy, obejmujemy ich tym samym zobowiązaniem.',
  },
  {
    q: 'Jakie dane przetwarzacie i na jakiej podstawie?',
    a: 'Dane z formularza i korespondencji: firmę lub imię, e-mail, opis procesu, narzędzia i liczbę osób. Używamy ich do odpowiedzi i realizacji usługi na podstawie art. 6 ust. 1 lit. b i f RODO. Jeśli proces obejmuje dane osobowe klientów, podpisujemy umowę powierzenia. Szczegóły są w polityce prywatności.',
  },
  {
    q: 'Czy AI podejmuje decyzje za człowieka?',
    a: 'Nie. W naszych wdrożeniach AI klasyfikuje, streszcza albo przygotowuje szkic, a człowiek zatwierdza wynik. Decyzje o kliencie, płatności, zamówieniu czy zwrocie nie są autonomiczne. Zasady opisujemy w dokumentacji wdrożenia i na stronie /zaufanie.',
  },
  {
    q: 'Co, jeśli automatyzacja nie zadziała?',
    a: 'W zakresie uzgodnionym w zleceniu usuwamy błędy przez 30 dni (Start) albo 60 dni (Growth); dla Scale okres określa umowa. Gwarancja nie obejmuje zmian w systemach zewnętrznych ani nowych funkcji. Nie gwarantujemy, że żaden błąd się nie zdarzy, ale mamy procedurę reakcji, logi i alerty.',
  },
  {
    q: 'Czy muszę wykupić opiekę?',
    a: `Nie. Opieka jest opcjonalna i miesięczna: ${P.care} netto/mc (monitoring, alerty i kopie, do 5 h zmian, SLA 1 dzień roboczy, przegląd kwartalny i 1 h konsultacji/mc). Bez rocznego zobowiązania, z miesięcznym wypowiedzeniem.`,
  },
  {
    q: 'Na jakich narzędziach pracujecie?',
    a: 'Na tym, co już masz: Shoper, BaseLinker, Allegro, WooCommerce, ERP, arkusze i poczta. Budujemy w n8n, Make, Pythonie albo bezpośrednio na API. Jeśli system nie ma API, sprawdzamy eksport, bazę lub inny punkt zaczepienia, zamiast obiecywać integrację, której nie ma.',
  },
  {
    q: 'Kiedy nie warto zlecać automatyzacji?',
    a: 'Gdy proces zdarza się kilka razy w miesiącu, właśnie się zmienia, nie ma źródła prawdy w danych albo każdy rekord wymaga decyzji człowieka. Wtedy mówimy to wprost — także w diagnozie i wycenie. Czasem taniej jest uporządkować proces niż go automatyzować.',
  },
  {
    q: 'Pracujecie z agencjami?',
    a: `Tak, w modelu white-label: ${P.whiteLabel} netto za proces do 3 integracji, ${P.whiteLabel3plus} netto przy trzech procesach lub więcej. Pod marką agencji, bez kontaktu z klientem końcowym. To osobna ścieżka na stronie /dla-agencji.`,
  },
  {
    q: 'Dlaczego nie ma tu logotypów klientów ani opinii?',
    a: 'Bo nazw klientów nie publikujemy bez ich zgody (NDA), a wyników nie wymyślamy. Na stronie Realizacje opisujemy trzy wdrożenia — monitoring cen, integrację zamówień i raport operacyjny — każde z zakresem, przepływem, pomiarem przed i po oraz granicami. Publiczny case klienta powstanie po wdrożeniu, za zgodą klienta i po akceptacji opisu.',
  },
];

export const pricingFaq = [
  {
    q: 'Dlaczego diagnoza i wycena są bezpłatne, a audyt płatny?',
    a: 'Diagnoza i wycena to krótka praca na podstawie opisu: ocena, czy proces warto automatyzować, szacunek oszczędności i widełki wdrożenia. Dlatego są bezpłatne i wracają w ciągu 24 godzin. Audyt to dokument decyzyjny: ustalenia, analiza systemów i danych, mapa procesu, koszt ręcznej pracy, ryzyka i plan. Płatny audyt wybierają ci, którzy potrzebują podstawy do decyzji o większym budżecie.',
  },
  {
    q: 'Czy audyt odliczacie od wdrożenia?',
    a: `Tak. Jeśli dojdzie do wdrożenia, ${P.audit} netto odliczamy od pierwszej faktury. Jeśli nie, audyt pozostaje osobną usługą za ${P.audit} netto. Nie obiecujemy zwrotu gotówki.`,
  },
  {
    q: 'Czy ceny na stronie są aktualne?',
    a: `Tak, cennik aktualizujemy na dzień ${PRICE_UPDATED}. Cenę potwierdzamy w ofercie przed startem. Zmiana zakresu to osobna decyzja i osobna wycena, nie dopisek na końcu projektu.`,
  },
  {
    q: 'Ile trwa wdrożenie?',
    a: 'Terminy są orientacyjne: Start zwykle 5–10 dni roboczych, Growth około 3 tygodni, Scale 4–6 tygodni. Liczymy je od przekazania dostępów i danych testowych. Opóźnienia po stronie systemów klienta przesuwają termin.',
  },
  {
    q: 'Co zawiera opieka techniczna?',
    a: `Opieka ${P.care} netto/mc: monitoring i alerty, kopie, do 5 h zmian miesięcznie, SLA reakcji 1 dzień roboczy, przegląd kwartalny i 1 h konsultacji miesięcznie. Plan jest miesięczny, bez rocznego zobowiązania.`,
  },
  {
    q: 'Czy muszę wykupić opiekę?',
    a: 'Nie. Po wdrożeniu przekazujemy kod, dokumentację i dostępy. Jeśli Twój zespół potrafi utrzymać proces, opieka nie jest konieczna. Jeśli nie, dobieramy plan miesięczny.',
  },
  {
    q: 'Co, jeśli w trakcie okaże się, że potrzebny jest większy zakres?',
    a: 'Zatrzymujemy się i wyceniamy zmianę osobno. Nie doliczamy pracy bez pisemnej zgody. Stała cena dotyczy zakresu opisanego przed startem.',
  },
  {
    q: 'Czy ceny są brutto?',
    a: 'Nie, podajemy ceny netto. Do zamówienia wystawiamy fakturę. Kwota do zapłaty zależy od Twojej sytuacji podatkowej.',
  },
  {
    q: 'Czy white-label ma inne ceny?',
    a: `Tak. Dla agencji jeden proces do 3 integracji kosztuje ${P.whiteLabel} netto, a przy trzech procesach lub więcej ${P.whiteLabel3plus} netto za proces. Szczegóły i warunki są na stronie Dla agencji.`,
  },
  {
    q: 'Jak płacę za wdrożenie?',
    a: `Standardowo 50% przed rozpoczęciem prac i 50% po odbiorze, z fakturą i 7-dniowym terminem płatności. Przy projektach powyżej ${P.scaleFrom.replace('od ', '')} ustalamy harmonogram etapów.`,
  },
];
