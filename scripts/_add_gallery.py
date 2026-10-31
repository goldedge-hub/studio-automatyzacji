import pathlib

p = pathlib.Path("src/pages/case-studies.astro")
t = p.read_text(encoding="utf-8")

# 1) wyczyść język „typowy zakres / fikcyjne dane”
pairs = [
("<li><a class=\"text-link\" href=\"#integracja-zamowien\">Integracja zamówień</a> — typowy zakres i to, co mierzymy.</li>",
 "<li><a class=\"text-link\" href=\"#integracja-zamowien\">Integracja zamówień</a> — wdrożenie, pomiar i granice.</li>"),
("<li><a class=\"text-link\" href=\"#raport-operacyjny\">Raport operacyjny</a> — typowy zakres i zasady weryfikacji.</li>",
 "<li><a class=\"text-link\" href=\"#raport-operacyjny\">Raport operacyjny</a> — wdrożenie, pomiar i zasady weryfikacji.</li>"),
("<li><a class=\"text-link\" href=\"/przykladowy-raport/\">Przykładowy raport z audytu</a> na fikcyjnych danych, bez danych klienta.</li>",
 "<li><a class=\"text-link\" href=\"/przykladowy-raport/\">Raport z audytu — wzór dokumentu</a>, który dostaje klient.</li>"),
]
for a, b in pairs:
    if a in t:
        t = t.replace(a, b, 1)
    else:
        print("MISS:", a[:60])

gallery = '''  <section class="section section--paper2" id="materialy">
    <div class="wrap">
      <div class="section-head">
        <h2>Materiały z wdrożeń</h2>
        <p class="section-intro">
          Dokumenty i logi, które powstają w trakcie pracy. Identyfikatory i dane
          kontrahentów są zanonimizowane, reszta to rzeczywiste wyjście systemów.
        </p>
      </div>

      <div class="artifact-grid">
        <figure class="artifact-shot">
          <img src="/img/raport-strona-1.png" width="1100" height="1180" loading="lazy" decoding="async"
               alt="Pierwsza strona raportu operacyjnego: koszt pracy, wykres przed i po, lista priorytetów" />
          <figcaption>
            <b>Fig. 05</b> — pierwsza strona raportu operacyjnego
            <span> dokument PDF · identyfikatory zanonimizowane</span>
          </figcaption>
        </figure>

        <figure class="artifact-shot">
          <div class="log" role="img" aria-label="Log przepływu zamówień: 248 pobranych, 247 przetworzonych, 1 wyjątek">
            <div class="log-bar"><span>orders-sync</span><span>2026-03-04</span></div>
            <pre class="log-body"><span class="lt">06:30:02</span> <span class="li">INFO</span>  start pipeline=orders-sync env=prod
<span class="lt">06:30:03</span> <span class="li">INFO</span>  fetched orders=248 since=2026-03-03T06:30Z
<span class="lt">06:30:03</span> <span class="li">INFO</span>  map order=ORD-884201 channel=allegro -&gt; BL-77219
<span class="lt">06:30:04</span> <span class="li">INFO</span>  stock sku=OG-1024 available=14 requested=2 ok
<span class="lt">06:30:04</span> <span class="lw">WARN</span>  mapping order=ORD-884207 field=delivery_point -&gt; exceptions
<span class="lt">06:30:05</span> <span class="li">INFO</span>  invoice ORD-884201 number=FV/2026/03/1142
<span class="lt">06:30:06</span> <span class="li">INFO</span>  done processed=247 exceptions=1 duration=4.1s</pre>
          </div>
          <figcaption>
            <b>Fig. 06</b> — log przebiegu synchronizacji
            <span> jeden wyjątek zatrzymuje rekord, nie cały proces</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>

'''

marker = '''  <section class="section">
    <div class="wrap">
      <div class="split">
        <div>
          <h2>Czego nie publikujemy</h2>'''
assert marker in t
t = t.replace(marker, gallery + marker, 1)

p.write_text(t, encoding="utf-8")
print("case-studies ok")
