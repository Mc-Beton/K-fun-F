# 📚 Dokumentacja XML KSeF

## 📄 Pliki w tym katalogu

### 1. `przyklad-faktury-ksef-prawidlowy.xml`

✅ **Pełny, prawidłowy przykład faktury** zgodny z wymaganiami KSeF

- Zawiera wszystkie wymagane elementy
- Poprawne formaty dat, kwot, NIP-ów
- Gotowy do wysłania do KSeF (po podpisaniu)

### 2. `STRUKTURA_XML_KSEF.md`

📖 **Szczegółowy przewodnik** po strukturze XML faktury KSeF

- Wyjaśnienie wszystkich pól
- Najczęstsze błędy i jak ich unikać
- Przykłady kodu XML

---

## ⚠️ WAŻNE: Różnice między mockami a prawdziwymi danymi

### Mocki na froncie (PRZED poprawką)

Pierwotne dane mockowe (**NIEPRAWIDŁOWE**):

```xml
<Faktura xmlns="http://crd.gov.pl/wzor/2023/06/29/12648/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA(2)" wersjaSchemy="1-0E">FA</KodFormularza>
    <!-- ... -->
  </Naglowek>
  <Podmiot1>
    <PrefiksBufor>BUFOR</PrefiksBufor>  <!-- ❌ ŹLE -->
    <DaneIdentyfikacyjne>
      <NIP>1234567890</NIP>
    </DaneIdentyfikacyjne>
  </Podmiot1>
  <!-- ❌ BRAK Podmiot2 - KRYTYCZNY BŁĄD! -->
</Faktura>
```

**Problemy:**

- ❌ Używa FA(2) zamiast FA(3)
- ❌ Niepotrzebny element `PrefiksBufor`
- ❌ BRAK wymaganego elementu `Podmiot2` (nabywca)
- ❌ BRAK elementu `Fa` z danymi faktury
- ❌ BRAK pozycji faktury `FaWiersz`

### Mocki na froncie (PO poprawce)

Nowe dane mockowe (**PRAWIDŁOWE**):

```xml
<Faktura xmlns="http://crd.gov.pl/wzor/2023/06/29/12648/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA(3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <!-- ... -->
  </Naglowek>
  <Podmiot1>
    <DaneIdentyfikacyjne>
      <NIP>1234567890</NIP>
      <Nazwa>Przykładowa Firma Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Testowa 15</AdresL1>
      <KodPocztowy>00-950</KodPocztowy>
      <Miejscowosc>Warszawa</Miejscowosc>
    </Adres>
  </Podmiot1>
  <Podmiot2>  <!-- ✅ DODANO! -->
    <DaneIdentyfikacyjne>
      <NIP>9876543210</NIP>
      <Nazwa>Firma Nabywca Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Nabywcy 10</AdresL1>
      <KodPocztowy>02-222</KodPocztowy>
      <Miejscowosc>Warszawa</Miejscowosc>
    </Adres>
  </Podmiot2>
  <Fa>  <!-- ✅ DODANO! -->
    <KodWaluty>PLN</KodWaluty>
    <P_1>2026-02-09</P_1>
    <P_2>FV/2026/02/001</P_2>
    <!-- ... kompletne dane faktury ... -->
  </Fa>
  <FaWiersz>  <!-- ✅ DODANO! -->
    <NrWierszaFa>1</NrWierszaFa>
    <P_7>Usługa konsultingowa IT</P_7>
    <!-- ... szczegóły pozycji ... -->
  </FaWiersz>
</Faktura>
```

---

## 🎯 Jak używać tej dokumentacji

### Jeśli piszesz frontend:

1. Zobacz mocki w `app/api/messages/route.ts` - już zaktualizowane!
2. Używaj ich jako wzoru dla wyświetlania danych

### Jeśli integrujesz z KSeF:

1. Przeczytaj `STRUKTURA_XML_KSEF.md` - pełny przewodnik
2. Użyj `przyklad-faktury-ksef-prawidlowy.xml` jako template
3. Backend generuje XML automatycznie w `KsefXmlGeneratorService.java`

### Jeśli testujesz:

1. Porównaj XML z przykładem w `przyklad-faktury-ksef-prawidlowy.xml`
2. Sprawdź czy zawiera wszystkie wymagane elementy
3. Użyj walidatora XSD przeciwko schematowi KSeF

---

## ✅ Checklist prawidłowej faktury XML

Przed wysłaniem do KSeF upewnij się, że:

- [ ] Używasz `FA(3)` w `KodFormularza`
- [ ] Masz element `<Podmiot1>` z pełnymi danymi sprzedawcy
- [ ] Masz element `<Podmiot2>` z pełnymi danymi nabywcy
- [ ] Daty w formacie `YYYY-MM-DD`
- [ ] NIP bez kresek (10 cyfr)
- [ ] Kwoty z dokładnie dwoma miejscami po przecinku
- [ ] Element `<Fa>` z danymi faktury
- [ ] Przynajmniej jeden element `<FaWiersz>`
- [ ] Suma brutto (`P_15`) = suma netto + VAT
- [ ] Encoding UTF-8
- [ ] XML jest well-formed (parsuje się bez błędów)

---

## 📞 Pomoc

Jeśli masz problemy z XML:

1. Sprawdź błąd w konsoli backendu - zawiera szczegóły walidacji
2. Porównaj swój XML z `przyklad-faktury-ksef-prawidlowy.xml`
3. Zobacz najczęstsze błędy w `STRUKTURA_XML_KSEF.md`

Oficjalna dokumentacja KSeF:

- https://www.gov.pl/web/kas/api-ksef
- http://crd.gov.pl (schemat XSD)
