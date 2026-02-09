# 📄 Struktura XML Faktury KSeF - Pełny przewodnik

## 🎯 Wymagania podstawowe

**Schemat XML:** `http://crd.gov.pl/wzor/2023/06/29/12648/`  
**Wersja:** `1-0E`  
**Kod formularza:** `FA(3)` - Faktura VAT online

---

## 📋 Obowiązkowe elementy struktury

### 1. **Nagłówek (`<Naglowek>`)**

```xml
<Naglowek>
  <KodFormularza kodSystemowy="FA(3)" wersjaSchemy="1-0E">FA</KodFormularza>
  <WariantFormularza>3</WariantFormularza>
  <DataWytworzeniaFa>2026-02-09</DataWytworzeniaFa>
  <SystemInfo>Nazwa systemu (opcjonalne)</SystemInfo>
</Naglowek>
```

**Wyjaśnienie pól:**

- `KodFormularza` - zawsze "FA" z atrybutem kodSystemowy="FA(3)"
- `WariantFormularza` - zawsze "3" dla faktury elektronicznej
- `DataWytworzeniaFa` - data utworzenia dokumentu (format: YYYY-MM-DD)
- `SystemInfo` - nazwa systemu, który wygenerował fakturę (opcjonalnie)

---

### 2. **Podmiot1 - Sprzedawca (`<Podmiot1>`) ⚠️ WYMAGANE**

```xml
<Podmiot1>
  <DaneIdentyfikacyjne>
    <NIP>1234567890</NIP>
    <Nazwa>Pełna nazwa firmy</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Nazwa 15</AdresL1>
    <KodPocztowy>00-950</KodPocztowy>
    <Miejscowosc>Warszawa</Miejscowosc>
  </Adres>
  <AdresEmail>email@firma.pl</AdresEmail>        <!-- opcjonalnie -->
  <NrTelefonu>+48123456789</NrTelefonu>           <!-- opcjonalnie -->
</Podmiot1>
```

**Wyjaśnienie:**

- `NIP` - 10 cyfr bez kresek
- `Nazwa` - pełna nazwa firmy sprzedawcy
- `KodKraju` - dwuliterowy kod ISO kraju (PL dla Polski)
- `AdresL1` - ulica i numer
- `KodPocztowy` - format XX-XXX
- `Miejscowosc` - miasto

---

### 3. **Podmiot2 - Nabywca (`<Podmiot2>`) ⚠️ WYMAGANE**

```xml
<Podmiot2>
  <DaneIdentyfikacyjne>
    <NIP>9876543210</NIP>              <!-- lub -->
    <BrakID>1</BrakID>                 <!-- dla osób fizycznych bez NIP -->
    <Nazwa>Nazwa nabywcy</Nazwa>
  </DaneIdentyfikacyjne>
  <Adres>
    <KodKraju>PL</KodKraju>
    <AdresL1>ul. Klienta 10</AdresL1>
    <KodPocztowy>02-222</KodPocztowy>
    <Miejscowosc>Warszawa</Miejscowosc>
  </Adres>
</Podmiot2>
```

**UWAGA:** Podmiot2 jest OBOWIĄZKOWY w FA(3)!  
Bez niego faktura zostanie odrzucona przez KSeF.

---

### 4. **Fa - Dane faktury (`<Fa>`) ⚠️ WYMAGANE**

```xml
<Fa>
  <KodWaluty>PLN</KodWaluty>

  <!-- Data wystawienia -->
  <P_1>2026-02-09</P_1>

  <!-- Numer faktury -->
  <P_2>FV/2026/02/001</P_2>

  <!-- Data sprzedaży (lub zakończenia sprzedaży) -->
  <P_6>2026-02-09</P_6>

  <!-- KWOTY NETTO dla poszczególnych stawek VAT -->

  <!-- Stawka 23% -->
  <P_13_1>1000.00</P_13_1>    <!-- Wartość netto -->
  <P_14_1>230.00</P_14_1>     <!-- Kwota VAT -->

  <!-- Inne stawki (jeśli występują): -->
  <!-- P_13_2 / P_14_2 - stawka 8% -->
  <!-- P_13_3 / P_14_3 - stawka 5% -->
  <!-- P_13_4 / P_14_4 - stawka 0% -->
  <!-- P_13_7 - zwolniona z VAT -->

  <!-- SUMA BRUTTO (wszystkie pozycje) -->
  <P_15>1230.00</P_15>

  <!-- ADNOTACJE (czy faktura ma specjalne właściwości) -->
  <Adnotacje>
    <P_16>2</P_16>  <!-- Metoda kasowa: 1=TAK, 2=NIE -->
    <P_17>2</P_17>  <!-- Samofakturowanie: 1=TAK, 2=NIE -->
    <P_18>2</P_18>  <!-- Odwrotne obciążenie: 1=TAK, 2=NIE -->
    <P_19>2</P_19>  <!-- MPP (mechanizm podzielonej płatności): 1=TAK, 2=NIE -->
  </Adnotacje>

  <!-- Rodzaj faktury -->
  <RodzajFaktury>VAT</RodzajFaktury>

  <!-- WARUNKI PŁATNOŚCI -->
  <TerminPlatnosci>
    <Termin>2026-02-23</Termin>
  </TerminPlatnosci>

  <!-- FORMA PŁATNOŚCI -->
  <FormaPlatnosci>6</FormaPlatnosci>
  <!-- 1=gotówka, 2=karta, 6=przelew, 7=czek -->

  <!-- NUMER RACHUNKU BANKOWEGO (opcjonalnie, ale zalecane) -->
  <NumerRachunkuBankowego>12 1234 5678 9012 3456 7890 1234</NumerRachunkuBankowego>
</Fa>
```

**Kody pól:**

- `P_1` - Data wystawienia
- `P_2` - Numer faktury
- `P_6` - Data sprzedaży
- `P_13_X` - Wartość netto dla stawki X
- `P_14_X` - Kwota VAT dla stawki X
- `P_15` - Suma brutto

---

### 5. **FaWiersz - Pozycje faktury (`<FaWiersz>`) ⚠️ WYMAGANE**

Każda faktura musi mieć **przynajmniej jedną pozycję**.

```xml
<FaWiersz>
  <NrWierszaFa>1</NrWierszaFa>

  <!-- Nazwa towaru/usługi -->
  <P_7>Usługa konsultingowa IT</P_7>

  <!-- Jednostka miary -->
  <P_8B>godz</P_8B>              <!-- nazwa własna jednostki -->
  <!-- LUB -->
  <P_8A>C62</P_8A>               <!-- kod UN/ECE (np. C62=sztuka) -->

  <!-- Ilość -->
  <P_9A>100.00</P_9A>

  <!-- Wartość sprzedaży netto pozycji (ilość × cena jednostkowa netto) -->
  <P_11>1000.00</P_11>

  <!-- Cena jednostkowa netto (opcjonalnie) -->
  <P_11A>10.00</P_11A>

  <!-- Stawka VAT -->
  <P_12>23</P_12>

  <!-- OPCJONALNIE dla konkretnych branż: -->
  <!-- <CN>12345678</CN>           Kod CN dla towarów -->
  <!-- <PKWIU>62.01.10.0</PKWIU>    Kod PKWiU dla usług -->
  <!-- <P_12A_XIII>1</P_12A_XIII>  GTU (Grupa Towarowa) -->
</FaWiersz>

<!-- Można dodać więcej pozycji z kolejnymi numerami -->
<FaWiersz>
  <NrWierszaFa>2</NrWierszaFa>
  <P_7>Inna pozycja</P_7>
  <!-- ... -->
</FaWiersz>
```

**Wyjaśnienie pól:**

- `NrWierszaFa` - kolejny numer pozycji (1, 2, 3...)
- `P_7` - nazwa towaru lub usługi
- `P_8B` - jednostka miary (tekst) np. "szt", "godz", "kg"
- `P_9A` - ilość (liczba z dokładnością do 2 miejsc po przecinku)
- `P_11` - wartość netto całej pozycji
- `P_11A` - cena jednostkowa netto
- `P_12` - stawka VAT (23, 8, 5, 0, "zw" dla zwolnionej)

---

## ⚠️ Najczęstsze błędy

### ❌ BŁĄD 1: Brak elementu Podmiot2

```xml
<!-- ŹLE - brak nabywcy -->
<Faktura>
  <Podmiot1>...</Podmiot1>
  <!-- brak Podmiot2 -->
</Faktura>
```

**Poprawnie:**

```xml
<Faktura>
  <Podmiot1>...</Podmiot1>
  <Podmiot2>...</Podmiot2>  <!-- WYMAGANE! -->
</Faktura>
```

---

### ❌ BŁĄD 2: Nieprawidłowy format daty

```xml
<!-- ŹLE -->
<P_1>09.02.2026</P_1>
<P_1>2026/02/09</P_1>

<!-- DOBRZE -->
<P_1>2026-02-09</P_1>
```

---

### ❌ BŁĄD 3: NIP z kreskami

```xml
<!-- ŹLE -->
<NIP>123-456-78-90</NIP>

<!-- DOBRZE -->
<NIP>1234567890</NIP>
```

---

### ❌ BŁĄD 4: Kwoty bez dwóch miejsc po przecinku

```xml
<!-- ŹLE -->
<P_13_1>1000</P_13_1>
<P_13_1>1000.5</P_13_1>

<!-- DOBRZE -->
<P_13_1>1000.00</P_13_1>
<P_13_1>1000.50</P_13_1>
```

---

### ❌ BŁĄD 5: Niezgodność sum

```xml
<!-- ŹLE - niezgodne kwoty -->
<P_13_1>1000.00</P_13_1>  <!-- netto 23% -->
<P_14_1>230.00</P_14_1>   <!-- VAT 23% -->
<P_15>1500.00</P_15>      <!-- ŹLE! powinno być 1230.00 -->

<!-- DOBRZE -->
<P_13_1>1000.00</P_13_1>
<P_14_1>230.00</P_14_1>
<P_15>1230.00</P_15>      <!-- = 1000.00 + 230.00 -->
```

---

## ✅ Pełny przykład prawidłowej faktury

Zobacz plik: `przyklad-faktury-ksef-prawidlowy.xml` w katalogu `docs/`

---

## 🔗 Dokumentacja oficjalna

- **Schemat XSD:** http://crd.gov.pl/wzor/2023/06/29/12648/
- **Dokumentacja KSeF:** https://www.gov.pl/web/kas/api-ksef
- **Specyfikacja techniczna:** https://www.podatki.gov.pl/ksef/

---

## 📌 Najważniejsze zasady

1. ✅ **Zawsze używaj FA(3)** dla faktur online KSeF
2. ✅ **Podmiot1 i Podmiot2 są OBOWIĄZKOWE**
3. ✅ **Daty w formacie YYYY-MM-DD**
4. ✅ **Kwoty z dwoma miejscami po przecinku**
5. ✅ **NIP bez kresek (10 cyfr)**
6. ✅ **Przynajmniej jedna pozycja FaWiersz**
7. ✅ **Suma brutto P_15 = suma wszystkich netto + VAT**
8. ✅ **Używaj UTF-8 encoding**
9. ✅ **Waliduj XML przed wysłaniem do KSeF**

---

## 🛠️ Walidacja przed wysłaniem

Przed wysłaniem faktury do KSeF:

1. Sprawdź czy XML jest well-formed
2. Zwaliduj przeciwko schematowi XSD
3. Sprawdź poprawność NIP-ów
4. Zweryfikuj zgodność kwot
5. Upewnij się, że wszystkie wymagane pola są wypełnione

Backend KSeF Hub automatycznie wykonuje te sprawdzenia w `XmlValidationService`.
