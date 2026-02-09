"use client";

import { useState, useEffect } from "react";
import { StatusCards } from "@/components/status-cards";
import { MessagesTable } from "@/components/messages-table";
import { MessageDetailDialog } from "@/components/message-detail-dialog";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import type { HubStatus, Message } from "@/types";

export default function Home() {
  const [status, setStatus] = useState<HubStatus>({
    online: true,
    ksefConnected: true,
    receivedMessagesCount: 0,
    sentToKsefCount: 0,
    lastUpdate: new Date().toISOString(),
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStatus = async () => {
    try {
      const response = await fetch("/api/status");
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      }
    } catch (error) {
      console.error("Błąd pobierania statusu:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Błąd pobierania komunikatów:", error);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await Promise.all([fetchStatus(), fetchMessages()]);
    setIsLoading(false);
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setDialogOpen(true);
  };

  useEffect(() => {
    // Początkowe pobranie danych
    handleRefresh();

    // Automatyczne odświeżanie co 5 sekund
    const interval = setInterval(() => {
      fetchStatus();
      fetchMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              KSeF Hub Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitoring i zarządzanie hubem KSeF
            </p>
          </div>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Odśwież
          </Button>
        </div>

        <StatusCards status={status} />

        <MessagesTable messages={messages} onViewMessage={handleViewMessage} />

        <MessageDetailDialog
          message={selectedMessage}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
    </main>
  );
}
