# Szybki Start - KSeF Hub Frontend

## Krok 1: Instalacja zależności

Otwórz terminal w katalogu `ksef-hub-frontend` i uruchom:

```bash
npm install
```

Lub po prostu uruchom plik `start.bat` na Windows.

## Krok 2: Uruchomienie aplikacji

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: **http://localhost:3000**

## Krok 3: Podłączenie do backendu (opcjonalnie)

1. Skopiuj plik `.env.local.example` jako `.env.local`
2. Ustaw adres swojego backendu:
   ```
   BACKEND_URL=http://localhost:8080
   ```
3. W plikach `app/api/status/route.ts` i `app/api/messages/route.ts` odkomentuj linie odpowiedzialne za połączenie z backendem

## Co zobaczysz?

✅ **Dashboard** z 4 kartami statusu:

- Status huba (Online/Offline)
- Połączenie z KSeF (Połączony/Rozłączony)
- Liczba odebranych komunikatów
- Liczba wysłanych komunikatów

✅ **Tabelę komunikatów** zawierającą:

- Data i czas
- Kierunek (przychodzący/wychodzący)
- Źródło i cel
- Status (sukces/błąd/w trakcie)
- Przycisk "Podgląd"

✅ **Dialog szczegółów** pokazujący:

- Pełną zawartość XML
- Odpowiedź z KSeF
- Komunikaty błędów (jeśli występują)

## Automatyczne odświeżanie

Dashboard automatycznie odświeża dane co 5 sekund. Możesz też kliknąć przycisk "Odśwież" w prawym górnym rogu.

## Testowanie

Obecnie aplikacja używa przykładowych danych (mock).
Po podłączeniu prawdziwego backendu, dane będą pobierane na żywo.

## Dostosowywanie

- Kolory i style: `app/globals.css` i `tailwind.config.ts`
- Komponenty: katalog `components/`
- Typy danych: `types/index.ts`
- API routes: `app/api/`

## Potrzebujesz pomocy?

Sprawdź pełną dokumentację w pliku `README.md`
