import pathlib

def swap(path, imports_after, new_imports, start_marker, new_block, encoding="utf-8"):
    p = pathlib.Path(path)
    t = p.read_text(encoding=encoding)
    if new_imports:
        assert imports_after in t, f"import anchor missing in {path}"
        t = t.replace(imports_after, imports_after + "\n" + new_imports, 1)
    start = t.index(start_marker)
    end = t.index("  </section>", start) + len("  </section>")
    t = t[:start] + new_block + t[end:]
    p.write_text(t, encoding=encoding)
    print("ok", path)

# ---- /opieka/
swap(
    "src/pages/opieka.astro",
    "import Base from '../layouts/Base.astro';",
    "import ArtifactHero from '../components/ArtifactHero.astro';\nimport SlaCard from '../components/SlaCard.astro';",
    '  <section class="page-head">',
    '''  <ArtifactHero
    variant="document"
    meta={['Po wdrożeniu', `Opieka ${P.care} netto/mc`, 'Wypowiedzenie 1 mc']}
    title="Opieka techniczna po wdrożeniu"
    lead="Automatyzacja nie jest pomnikiem. Zmieniają się API, cenniki i formaty plików. Opieka pilnuje procesów e-commerce — zamówień, zwrotów, stanów i faktur — także wtedy, gdy zmieni się coś poza naszym kodem."
    note="Oferta aktualna. Ceny netto. Plan miesięczny, bez rocznego zobowiązania."
  >
    <Fragment slot="actions">
      <a class="btn btn--primary" href="/kontakt/?temat=opieka" data-umami-event="cta_click" data-umami-event-label="Opieka: zapytaj o opiekę">Zapytaj o opiekę</a>
      <a class="btn btn--ghost" href="/ile-kosztuje/#opieka">Zobacz cennik opieki</a>
    </Fragment>
    <Fragment slot="artifact"><SlaCard /></Fragment>
  </ArtifactHero>'''
)

# ---- /integracje/
swap(
    "src/pages/integracje/index.astro",
    "import Base from '../../layouts/Base.astro';",
    "import ArtifactHero from '../../components/ArtifactHero.astro';\nimport ProcessMap from '../../components/ProcessMap.astro';",
    '  <section class="page-head">',
    '''  <ArtifactHero
    variant="flow"
    meta={['Integracje', 'API, webhooki, kolejki wyjątków', 'Ceny netto']}
    title="Integracje e-commerce, które mają źródło prawdy"
    lead="Integracja nie polega na tym, żeby „połączyć API”. Polega na ustaleniu, który system jest nadrzędny, co się dzieje przy powtórzonym zdarzeniu i kiedy człowiek musi przejąć rekord. Poniżej cztery obszary, które w e-commerce najczęściej wymagają uporządkowania: BaseLinker z Allegro, Shoper, WooCommerce i KSeF."
  >
    <Fragment slot="actions">
      <ContactLink class="btn btn--primary" topic="diagnoza" label="Diagnoza i wycena 0 zł" />
      <a class="btn btn--ghost" href="#zasady">Trzy zasady integracji</a>
    </Fragment>
    <Fragment slot="artifact"><ProcessMap /></Fragment>
  </ArtifactHero>'''
)
