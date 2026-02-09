import { NextResponse } from "next/server";
import type { HubStatus } from "@/types";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export async function GET() {
  try {
    // Pobierz prawdziwe dane z backendu
    const response = await fetch(`${BACKEND_URL}/api/status`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();

    // Przekształć format daty z backendu (OffsetDateTime) na ISO string
    const status: HubStatus = {
      online: data.online,
      ksefConnected: data.ksefConnected,
      receivedMessagesCount: data.receivedMessagesCount,
      sentToKsefCount: data.sentToKsefCount,
      lastUpdate: data.lastUpdate,
    };

    return NextResponse.json(status);
  } catch (error) {
    console.error("Error fetching status from backend:", error);

    // Fallback do mockowych danych jeśli backend nie odpowiada
    const status: HubStatus = {
      online: false,
      ksefConnected: false,
      receivedMessagesCount: 0,
      sentToKsefCount: 0,
      lastUpdate: new Date().toISOString(),
    };

    return NextResponse.json(status);
  }
}
