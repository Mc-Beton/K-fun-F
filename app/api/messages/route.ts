import { NextResponse } from "next/server";
import type { Message } from "@/types";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export async function GET() {
  try {
    // Pobierz prawdziwe dane z backendu
    const response = await fetch(`${BACKEND_URL}/api/messages?limit=50`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();

    // Przekształć format daty z backendu (OffsetDateTime) na format frontendowy
    const messages: Message[] = data.map((msg: any) => ({
      id: msg.id,
      timestamp: msg.timestamp,
      direction: msg.direction,
      source: msg.source,
      destination: msg.destination,
      status: msg.status,
      xmlContent: msg.xmlContent || "",
      response: msg.response,
      errorMessage: msg.errorMessage,
    }));

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages from backend:", error);

    // Fallback do pustej listy jeśli backend nie odpowiada
    return NextResponse.json([]);
  }
}
