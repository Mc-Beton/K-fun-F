import { NextResponse } from "next/server";
import type { Message } from "@/types";

// TODO: Zamienić na prawdziwe połączenie z backendem
// const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

export async function GET() {
  try {
    // Przykładowe dane - zamień na prawdziwe wywołanie API
    // const response = await fetch(`${BACKEND_URL}/api/messages`)
    // const data = await response.json()

    // Tymczasowe dane mockowe - PRAWIDŁOWA STRUKTURA XML KSeF FA(3)
    const messages: Message[] = [
      {
        id: "1",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        direction: "incoming",
        source: "External System A",
        destination: "KSeF Hub",
        status: "success",
        xmlContent: `<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2023/06/29/12648/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA(3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-02-09</DataWytworzeniaFa>
    <SystemInfo>KSeF Hub v2.0</SystemInfo>
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
    <AdresEmail>kontakt@przykladowafirma.pl</AdresEmail>
    <NrTelefonu>+48123456789</NrTelefonu>
  </Podmiot1>
  <Podmiot2>
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
  <Fa>
    <KodWaluty>PLN</KodWaluty>
    <P_1>2026-02-09</P_1>
    <P_2>FV/2026/02/001</P_2>
    <P_6>2026-02-09</P_6>
    <P_13_1>1000.00</P_13_1>
    <P_14_1>230.00</P_14_1>
    <P_15>1230.00</P_15>
    <Adnotacje>
      <P_16>2</P_16>
      <P_17>2</P_17>
      <P_18>2</P_18>
      <P_19>2</P_19>
    </Adnotacje>
    <RodzajFaktury>VAT</RodzajFaktury>
    <TerminPlatnosci>
      <Termin>2026-02-23</Termin>
    </TerminPlatnosci>
    <FormaPlatnosci>6</FormaPlatnosci>
  </Fa>
  <FaWiersz>
    <NrWierszaFa>1</NrWierszaFa>
    <P_7>Usługa konsultingowa IT</P_7>
    <P_8B>godz</P_8B>
    <P_9A>100.00</P_9A>
    <P_11>1000.00</P_11>
    <P_11A>10.00</P_11A>
    <P_12>23</P_12>
  </FaWiersz>
</Faktura>`,
        response: `<?xml version="1.0" encoding="UTF-8"?>
<ns3:InitSessionResponse xmlns:ns3="http://ksef.mf.gov.pl/schema/gtw/svc/online/types/2021/10/01/0001">
  <SessionToken>
    <Token>20220106-CR-3216549870-ABDEF1234567-BA</Token>
    <Context>
      <ContextIdentifier>
        <Identifier>1234567890</Identifier>
      </ContextIdentifier>
    </Context>
  </SessionToken>
  <Timestamp>2026-02-09T12:30:00.000Z</Timestamp>
  <ReferenceNumber>20260209-CR-1234567890-ABCDEF-01</ReferenceNumber>
</ns3:InitSessionResponse>`,
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        direction: "outgoing",
        source: "KSeF Hub",
        destination: "KSeF Server",
        status: "success",
        xmlContent: `<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2023/06/29/12648/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA(3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-02-09</DataWytworzeniaFa>
  </Naglowek>
  <Podmiot1>
    <DaneIdentyfikacyjne>
      <NIP>5551234567</NIP>
      <Nazwa>ABC Handel Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Handlowa 5</AdresL1>
      <KodPocztowy>01-234</KodPocztowy>
      <Miejscowosc>Kraków</Miejscowosc>
    </Adres>
  </Podmiot1>
  <Podmiot2>
    <DaneIdentyfikacyjne>
      <NIP>7778889990</NIP>
      <Nazwa>Klient Business Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Kliencka 20</AdresL1>
      <KodPocztowy>30-100</KodPocztowy>
      <Miejscowosc>Kraków</Miejscowosc>
    </Adres>
  </Podmiot2>
  <Fa>
    <KodWaluty>PLN</KodWaluty>
    <P_1>2026-02-09</P_1>
    <P_2>FV/2026/02/055</P_2>
    <P_6>2026-02-09</P_6>
    <P_13_1>2500.00</P_13_1>
    <P_14_1>575.00</P_14_1>
    <P_15>3075.00</P_15>
    <Adnotacje>
      <P_16>2</P_16>
      <P_17>2</P_17>
      <P_18>2</P_18>
      <P_19>2</P_19>
    </Adnotacje>
    <RodzajFaktury>VAT</RodzajFaktury>
    <TerminPlatnosci>
      <Termin>2026-03-09</Termin>
    </TerminPlatnosci>
    <FormaPlatnosci>6</FormaPlatnosci>
  </Fa>
  <FaWiersz>
    <NrWierszaFa>1</NrWierszaFa>
    <P_7>Oprogramowanie licencja roczna</P_7>
    <P_8B>szt</P_8B>
    <P_9A>1.00</P_9A>
    <P_11>2500.00</P_11>
    <P_11A>2500.00</P_11A>
    <P_12>23</P_12>
  </FaWiersz>
</Faktura>`,
        response: `<?xml version="1.0" encoding="UTF-8"?>
<ns3:SendInvoiceResponse xmlns:ns3="http://ksef.mf.gov.pl/schema/gtw/svc/online/types/2021/10/01/0001">
  <ProcessingCode>200</ProcessingCode>
  <ProcessingDescription>Przetworzono poprawnie</ProcessingDescription>
  <Timestamp>2026-02-09T11:15:00.000Z</Timestamp>
  <ReferenceNumber>5551234567-20260209-ABCD5678-90</ReferenceNumber>
  <ElementReferenceNumber>FV/2026/02/055</ElementReferenceNumber>
</ns3:SendInvoiceResponse>`,
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        direction: "incoming",
        source: "External System B",
        destination: "KSeF Hub",
        status: "error",
        xmlContent: `<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2023/06/29/12648/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA(3)" wersjaSchemy="1-0E">FA</KodFormularza>
  </Naglowek>
  <Podmiot1>
    <DaneIdentyfikacyjne>
      <NIP>1111111111</NIP>
    </DaneIdentyfikacyjne>
  </Podmiot1>
  <!-- BŁĄD: Brak wymaganego elementu Podmiot2 -->
</Faktura>`,
        errorMessage:
          "Błąd walidacji XML: brak wymaganego elementu Podmiot2 (nabywca). Faktura FA(3) wymaga pełnych danych sprzedawcy i nabywcy.",
      },
      {
        id: "4",
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        direction: "outgoing",
        source: "KSeF Hub",
        destination: "KSeF Server",
        status: "pending",
        xmlContent: `<?xml version="1.0" encoding="UTF-8"?>
<Faktura xmlns="http://crd.gov.pl/wzor/2023/06/29/12648/">
  <Naglowek>
    <KodFormularza kodSystemowy="FA(3)" wersjaSchemy="1-0E">FA</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <DataWytworzeniaFa>2026-02-08</DataWytworzeniaFa>
  </Naglowek>
  <Podmiot1>
    <DaneIdentyfikacyjne>
      <NIP>3334445556</NIP>
      <Nazwa>Tech Solutions Sp. z o.o.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>ul. Technologiczna 8</AdresL1>
      <KodPocztowy>50-500</KodPocztowy>
      <Miejscowosc>Wrocław</Miejscowosc>
    </Adres>
  </Podmiot1>
  <Podmiot2>
    <DaneIdentyfikacyjne>
      <NIP>6667778889</NIP>
      <Nazwa>Klient XYZ S.A.</Nazwa>
    </DaneIdentyfikacyjne>
    <Adres>
      <KodKraju>PL</KodKraju>
      <AdresL1>al. Główna 100</AdresL1>
      <KodPocztowy>50-010</KodPocztowy>
      <Miejscowosc>Wrocław</Miejscowosc>
    </Adres>
  </Podmiot2>
  <Fa>
    <KodWaluty>PLN</KodWaluty>
    <P_1>2026-02-08</P_1>
    <P_2>FS/2026/02/123</P_2>
    <P_6>2026-02-08</P_6>
    <P_13_1>5000.00</P_13_1>
    <P_14_1>1150.00</P_14_1>
    <P_15>6150.00</P_15>
    <Adnotacje>
      <P_16>2</P_16>
      <P_17>2</P_17>
      <P_18>2</P_18>
      <P_19>2</P_19>
    </Adnotacje>
    <RodzajFaktury>VAT</RodzajFaktury>
    <TerminPlatnosci>
      <Termin>2026-03-10</Termin>
    </TerminPlatnosci>
    <FormaPlatnosci>6</FormaPlatnosci>
  </Fa>
  <FaWiersz>
    <NrWierszaFa>1</NrWierszaFa>
    <P_7>Wdrożenie systemu IT</P_7>
    <P_8B>usługa</P_8B>
    <P_9A>1.00</P_9A>
    <P_11>5000.00</P_11>
    <P_11A>5000.00</P_11A>
    <P_12>23</P_12>
  </FaWiersz>
</Faktura>`,
      },
    ];

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}
