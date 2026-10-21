#!/usr/bin/env python
"""Czeka na certyfikat HTTPS GitHub Pages i włącza wymuszanie HTTPS.

Uruchamiany z crona. Gdy certyfikat jest gotowy:
- ustawia https_enforced=true,
- sprawdza https://studioautomatyzacji.pl (apex = domena główna od 21.10),
- wypisuje wynik (cron dostarczy go na Telegram).
Gdy nie jest gotowy: kończy się cicho (bez wiadomości).
"""
import json
import shutil
import subprocess
import sys
import urllib.request

REPO = "goldedge-hub/studio-automatyzacji"
DOMAIN = "https://studioautomatyzacji.pl"
GH = shutil.which("gh") or "C:/Users/sfajr/bin/gh.exe"


def gh(*args: str) -> str:
    p = subprocess.run([GH, *args], capture_output=True, text=True, encoding="utf-8")
    if p.returncode != 0:
        raise RuntimeError(p.stderr.strip()[:300])
    return p.stdout


def main() -> int:
    raw = gh("api", f"repos/{REPO}/pages")
    data = json.loads(raw)
    cert = (data.get("https_certificate") or {}).get("state")
    enforced = data.get("https_enforced")
    if cert != "approved":
        return 0  # cicho: certyfikat jeszcze nie gotowy
    if not enforced:
        gh("api", "-X", "PUT", f"repos/{REPO}/pages", "-F", "https_enforced=true")
    # Weryfikacja realnym żądaniem
    try:
        req = urllib.request.Request(DOMAIN, headers={"User-Agent": "studio-automation-check/1.0"})
        with urllib.request.urlopen(req, timeout=25) as r:
            code = r.status
            body = r.read(2000).decode("utf-8", "ignore")
        ok = code == 200 and "Studio Automatyzacji" in body
        print(f"HTTPS OK: {code} enforced={not enforced or 'already'} cert=approved")
        return 0 if ok else 1
    except Exception as e:
        print(f"HTTPS jeszcze nie działa: {e}")
        return 1


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as e:
        print(f"HTTPS check error: {e}")
        sys.exit(0)
