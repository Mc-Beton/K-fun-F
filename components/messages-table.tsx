"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { Message } from "@/types";

interface MessagesTableProps {
  messages: Message[];
  onViewMessage: (message: Message) => void;
}

export function MessagesTable({ messages, onViewMessage }: MessagesTableProps) {
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

  const getDirectionBadge = (direction: Message["direction"]) => {
    return direction === "incoming" ? (
      <Badge variant="outline">Przychodzący</Badge>
    ) : (
      <Badge variant="default">Wychodzący</Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Komunikaty XML</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/Czas</TableHead>
              <TableHead>Kierunek</TableHead>
              <TableHead>Źródło</TableHead>
              <TableHead>Cel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  Brak komunikatów do wyświetlenia
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium">
                    {new Date(message.timestamp).toLocaleString("pl-PL")}
                  </TableCell>
                  <TableCell>{getDirectionBadge(message.direction)}</TableCell>
                  <TableCell>{message.source}</TableCell>
                  <TableCell>{message.destination}</TableCell>
                  <TableCell>{getStatusBadge(message.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewMessage(message)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Podgląd
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
