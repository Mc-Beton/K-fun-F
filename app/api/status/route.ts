import { NextResponse } from "next/server";
import type { HubStatus } from "@/types";

// TODO: Zamienić na prawdziwe połączenie z backendem
// const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

export async function GET() {
  try {
    // Przykładowe dane - zamień na prawdziwe wywołanie API
    // const response = await fetch(`${BACKEND_URL}/api/status`)
    // const data = await response.json()

    // Tymczasowe dane mockowe
    const status: HubStatus = {
      online: true,
      ksefConnected: true,
      receivedMessagesCount: Math.floor(Math.random() * 100),
      sentToKsefCount: Math.floor(Math.random() * 100),
      lastUpdate: new Date().toISOString(),
    };

    return NextResponse.json(status);
  } catch (error) {
    console.error("Error fetching status:", error);
    return NextResponse.json(
      { error: "Failed to fetch status" },
      { status: 500 },
    );
  }
}
