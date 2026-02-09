"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Server, ArrowDownToLine, ArrowUpToLine } from "lucide-react";
import type { HubStatus } from "@/types";

interface StatusCardsProps {
  status: HubStatus;
}

export function StatusCards({ status }: StatusCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Status Huba</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Badge variant={status.online ? "success" : "destructive"}>
              {status.online ? "Online" : "Offline"}
            </Badge>
          </div>
          <p
            className="text-xs text-muted-foreground mt-2"
            suppressHydrationWarning
          >
            Ostatnia aktualizacja:{" "}
            {new Date(status.lastUpdate).toLocaleTimeString("pl-PL")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Połączenie KSeF</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Badge variant={status.ksefConnected ? "success" : "destructive"}>
              {status.ksefConnected ? "Połączony" : "Rozłączony"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Serwer KSeF</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Odebrane</CardTitle>
          <ArrowDownToLine className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {status.receivedMessagesCount}
          </div>
          <p className="text-xs text-muted-foreground">Komunikaty z zewnątrz</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Wysłane</CardTitle>
          <ArrowUpToLine className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{status.sentToKsefCount}</div>
          <p className="text-xs text-muted-foreground">Komunikaty do KSeF</p>
        </CardContent>
      </Card>
    </div>
  );
}
