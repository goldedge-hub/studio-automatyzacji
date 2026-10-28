"""Subsetuje fonty strony do zakresu potrzebnego na stronie (PL + interpunkcja).

Po co: pełne podzbiory latin z Fontsource ważą 20-22 KB każde; przy 4-5 plikach
w krytycznej ścieżce fonty rywalizowały z CSS i opóźniały LCP na mobile.
Zakres: ASCII, Latin-1, Latin Extended-A (polskie znaki), myślniki, cudzysłowy,
wielokropek, bullets, strzałka →.
"""
from pathlib import Path
import subprocess
import sys

UNICODES = (
    "U+0020-007E,"          # ASCII
    "U+00A0-00FF,"          # Latin-1: ó, ×, ©, ®, °, «», ą nie ma tu (jest w ext)
    "U+0100-017F,"          # Latin Ext-A: ąćęłńśźżĄĆĘŁŃŚŹŻ
    "U+2010-2027,"          # myślniki i cudzysłowy, w tym „ ” ‘ ’ – —
    "U+2039-203A,U+20AC,U+2122,U+2190-2199,U+2713,U+25A0-25FF"
)

ROOT = Path(__file__).resolve().parents[1] / "src" / "fonts"


def main() -> int:
    targets = sorted(p for p in ROOT.glob("*.woff2") if not p.name.startswith("og-"))
    if not targets:
        print("brak plików .woff2", file=sys.stderr)
        return 1
    total_before = total_after = 0
    for src in targets:
        before = src.stat().st_size
        tmp = src.with_suffix(".subset.woff2")
        cmd = [
            sys.executable, "-m", "fontTools.subset", str(src),
            f"--output-file={tmp}",
            "--flavor=woff2",
            f"--unicodes={UNICODES}",
            "--layout-features=kern,liga,calt",
            "--no-hinting",
            "--desubroutinize",
            "--name-IDs=1,2,3,4,6",
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"FAIL {src.name}: {res.stderr[-300:]}", file=sys.stderr)
            tmp.unlink(missing_ok=True)
            continue
        after = tmp.stat().st_size
        if after >= before:
            print(f"skip {src.name}: subset {after} B >= {before} B")
            tmp.unlink(missing_ok=True)
            total_before += before
            total_after += before
            continue
        tmp.replace(src)
        total_before += before
        total_after += after
        print(f"{src.name:32s} {before/1024:6.1f} KB -> {after/1024:6.1f} KB")
    print(f"\nRAZEM {total_before/1024:.1f} KB -> {total_after/1024:.1f} KB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
