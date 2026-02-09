# KSeF Hub Frontend

Frontend aplikacji do monitorowania i zarządzania hubem KSeF, zbudowany w Next.js z shadcn/ui i Tailwind CSS.

## Wymagania

- Node.js 18+
- npm lub yarn

## Instalacja

```bash
npm install
# lub
yarn install
```

## Uruchomienie w trybie deweloperskim

```bash
npm run dev
# lub
yarn dev
```

Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000).

## Budowanie dla produkcji

```bash
npm run build
npm start
# lub
yarn build
yarn start
```

## Funkcjonalności

- **Dashboard** - przegląd statusu huba i połączenia z KSeF
- **Statystyki** - liczba odebranych i wysłanych komunikatów
- **Tabela komunikatów** - lista wszystkich komunikatów XML z możliwością filtrowania
- **Podgląd szczegółów** - szczegółowy widok pojedynczych komunikatów z XML i odpowiedziami
- **Auto-odświeżanie** - automatyczne odświeżanie danych co 5 sekund

## Konfiguracja

Utwórz plik `.env.local` w katalogu głównym:

```env
BACKEND_URL=http://localhost:8080
```

## Integracja z backendem

Obecnie aplikacja używa mockowych danych. Aby podłączyć prawdziwy backend:

1. Ustaw `BACKEND_URL` w pliku `.env.local`
2. Odkomentuj linijki w plikach:
   - `app/api/status/route.ts`
   - `app/api/messages/route.ts`
3. Upewnij się, że backend udostępnia endpointy:
   - `GET /api/status` - zwraca status huba
   - `GET /api/messages` - zwraca listę komunikatów

## Struktura projektu

```
ksef-hub-frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (proxy do backendu)
│   ├── globals.css        # Globalne style
│   ├── layout.tsx         # Layout aplikacji
│   └── page.tsx           # Strona główna
├── components/            # Komponenty React
│   ├── ui/               # Komponenty shadcn/ui
│   ├── status-cards.tsx  # Karty statusu
│   ├── messages-table.tsx # Tabela komunikatów
│   └── message-detail-dialog.tsx # Dialog szczegółów
├── lib/                   # Utilities
│   └── utils.ts          # Pomocnicze funkcje
├── types/                 # Definicje TypeScript
│   └── index.ts
└── public/               # Pliki statyczne
```

## Technologie

- **Next.js 14** - Framework React
- **TypeScript** - Typowanie
- **Tailwind CSS** - Stylowanie
- **shadcn/ui** - Komponenty UI
- **Lucide React** - Ikony

## Dokumentacja XML KSeF

W katalogu `docs/` znajdziesz:

- **`przyklad-faktury-ksef-prawidlowy.xml`** - Pełny, prawidłowy przykład faktury FA(3)
- **`STRUKTURA_XML_KSEF.md`** - Szczegółowy przewodnik po strukturze XML
- **`README.md`** - Różnice między mockami a prawdziwymi danymi

⚠️ **UWAGA:** Mockowe dane zawierają już poprawioną strukturę XML zgodną z wymaganiami KSeF FA(3)!
