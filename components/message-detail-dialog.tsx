"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Message } from "@/types";

interface MessageDetailDialogProps {
  message: Message | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MessageDetailDialog({
  message,
  open,
  onOpenChange,
}: MessageDetailDialogProps) {
  if (!message) return null;

  const getStatusBadge = (status: Message["status"]) => {
    switch (status) {
      case "success":
        return <Badge variant="success">Sukces</Badge>;
      case "error":
        return <Badge variant="destructive">Błąd</Badge>;
      case "pending":
        return <Badge variant="secondary">W trakcie</Badge>;
      default:
        return <Badge variant="outline">Nieznany</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Szczegóły komunikatu</DialogTitle>
          <DialogDescription>
            ID: {message.id} |{" "}
            {new Date(message.timestamp).toLocaleString("pl-PL")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Kierunek</h4>
              <Badge
                variant={
                  message.direction === "incoming" ? "outline" : "default"
                }
              >
                {message.direction === "incoming"
                  ? "Przychodzący"
                  : "Wychodzący"}
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Status</h4>
              {getStatusBadge(message.status)}
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Źródło</h4>
              <p className="text-sm text-muted-foreground">{message.source}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Cel</h4>
              <p className="text-sm text-muted-foreground">
                {message.destination}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Zawartość XML</h4>
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <pre className="text-xs">
                <code>{message.xmlContent}</code>
              </pre>
            </div>
          </div>

          {message.response && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Odpowiedź z KSeF</h4>
              <div className="bg-muted p-4 rounded-md overflow-x-auto">
                <pre className="text-xs">
                  <code>{message.response}</code>
                </pre>
              </div>
            </div>
          )}

          {message.errorMessage && (
            <div>
              <h4 className="text-sm font-semibold mb-2 text-destructive">
                Komunikat błędu
              </h4>
              <div className="bg-destructive/10 p-4 rounded-md border border-destructive">
                <p className="text-sm text-destructive">
                  {message.errorMessage}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
