# Counter Demo

Minimalna aplikacja demonstracyjna React Native + Expo + TypeScript. Pokazuje licznik,
zwiększa go przyciskiem `+1` i zapisuje wartość lokalnie przez AsyncStorage.

## Uruchomienie na Windows

Wymagany jest Node.js. Instalacja zależności i podstawowe sprawdzenia:

```powershell
npm ci
npm run typecheck
npm run check:expo
```

Do szybkiego sprawdzenia interfejsu można uruchomić `npm start` i otworzyć projekt
w Expo Go. Projekt jest celowo przypięty do Expo SDK 54, które obsługuje publiczna
wersja Expo Go na fizycznym iPhonie. Natywny build iOS wymaga Xcode, dlatego wykonuje
go GitHub Actions na runnerze macOS — lokalny Mac ani EAS Build nie są używane.

## Build iOS w GitHub Actions

Workflow `.github/workflows/ios-build.yml` uruchamia się dla pull requestów, pushy
do `main` oraz ręcznie przez `Actions > Build unsigned iOS IPA > Run workflow`.
Generuje projekt natywny przez Expo Prebuild, buduje wersję `Release` dla fizycznego
iPhone'a z wyłączonym podpisywaniem i pakuje aplikację do struktury IPA.

Po udanym jobie `Build iOS app` pobierz z sekcji `Artifacts` archiwum
`counter-demo-ios-unsigned`. Po rozpakowaniu zawiera ono:

```text
CounterDemo-unsigned.ipa
```

To IPA nie jest podpisane i nie nadaje się do bezpośredniego uruchomienia. Sideloadly
podpisze je lokalnie przed instalacją.

## Instalacja przez Sideloadly na Windows

1. Pobierz [Sideloadly](https://sideloadly.io/) i zainstaluj wymagane przez niego
   webowe wersje iTunes i iCloud (nie warianty z Microsoft Store).
2. Podłącz iPhone'a przewodem USB, odblokuj go i zaakceptuj komunikat o zaufaniu
   temu komputerowi.
3. Rozpakuj artefakt GitHub Actions i przeciągnij `CounterDemo-unsigned.ipa` do
   okna Sideloadly.
4. Wybierz podłączone urządzenie, podaj bezpłatne Apple ID i kliknij `Start`.
   Sideloadly lokalnie podpisze IPA i zainstaluje aplikację.
5. Jeżeli iOS o to poprosi, włącz tryb deweloperski i zaufaj profilowi Apple ID w
   `Ustawienia > Ogólne > VPN i zarządzanie urządzeniem`, a następnie uruchom
   `Counter Demo`.

Przy bezpłatnym Apple ID podpis jest ważny przez 7 dni. Po tym czasie aplikację
trzeba podpisać i zainstalować ponownie (Sideloadly oferuje także auto-refresh).
