"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Square, RefreshCw, Wifi, WifiOff } from "lucide-react";

const API_BASE_URL = "http://localhost:8080/api";

interface HubSettings {
  processingEnabled: boolean;
  ksefAutoConnect: boolean;
  updatedAt: string;
}

export function HubControlPanel() {
  const [settings, setSettings] = useState<HubSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/hub/settings`, {
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error("Error fetching hub settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    const interval = setInterval(fetchSettings, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const handleStartHub = async () => {
    try {
      setActionLoading("start");
      const response = await fetch(`${API_BASE_URL}/hub/start`, {
        method: "POST",
      });
      if (response.ok) {
        await fetchSettings();
      }
    } catch (error) {
      console.error("Error starting hub:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleStopHub = async () => {
    try {
      setActionLoading("stop");
      const response = await fetch(`${API_BASE_URL}/hub/stop`, {
        method: "POST",
      });
      if (response.ok) {
        await fetchSettings();
      }
    } catch (error) {
      console.error("Error stopping hub:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleConnectKsef = async () => {
    try {
      setActionLoading("connect");
      const response = await fetch(`${API_BASE_URL}/hub/ksef/connect`, {
        method: "POST",
      });
      if (response.ok) {
        await fetchSettings();
      }
    } catch (error) {
      console.error("Error connecting to KSeF:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDisconnectKsef = async () => {
    try {
      setActionLoading("disconnect");
      const response = await fetch(`${API_BASE_URL}/hub/ksef/disconnect`, {
        method: "POST",
      });
      if (response.ok) {
        await fetchSettings();
      }
    } catch (error) {
      console.error("Error disconnecting from KSeF:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleTestConnection = async () => {
    try {
      setActionLoading("test");
      const response = await fetch(`${API_BASE_URL}/hub/ksef/test`, {
        method: "POST",
      });
      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      }
    } catch (error) {
      console.error("Error testing connection:", error);
      alert("Błąd podczas testowania połączenia");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading && !settings) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Hub Processing Control */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Sterowanie Hubem</CardTitle>
            <Badge
              variant={settings?.processingEnabled ? "success" : "secondary"}
            >
              {settings?.processingEnabled ? "Aktywny" : "Zatrzymany"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {settings?.processingEnabled
              ? "Hub przetwarza komunikaty i synchronizuje dane"
              : "Hub jest zatrzymany i nie przetwarza komunikatów"}
          </p>
          <div className="flex gap-2">
            {!settings?.processingEnabled ? (
              <Button
                onClick={handleStartHub}
                disabled={actionLoading === "start"}
                className="flex-1"
              >
                {actionLoading === "start" ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                Uruchom Hub
              </Button>
            ) : (
              <Button
                onClick={handleStopHub}
                variant="destructive"
                disabled={actionLoading === "stop"}
                className="flex-1"
              >
                {actionLoading === "stop" ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Square className="h-4 w-4 mr-2" />
                )}
                Zatrzymaj Hub
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* KSeF Connection Control */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Połączenie z KSeF</CardTitle>
            <Badge
              variant={settings?.ksefAutoConnect ? "success" : "secondary"}
            >
              {settings?.ksefAutoConnect ? "Auto-połączenie" : "Rozłączony"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {settings?.ksefAutoConnect
              ? "Hub automatycznie łączy się z serwerem KSeF"
              : "Automatyczne łączenie z KSeF jest wyłączone"}
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {!settings?.ksefAutoConnect ? (
                <Button
                  onClick={handleConnectKsef}
                  disabled={actionLoading === "connect"}
                  className="flex-1"
                >
                  {actionLoading === "connect" ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Wifi className="h-4 w-4 mr-2" />
                  )}
                  Włącz Auto-połączenie
                </Button>
              ) : (
                <Button
                  onClick={handleDisconnectKsef}
                  variant="outline"
                  disabled={actionLoading === "disconnect"}
                  className="flex-1"
                >
                  {actionLoading === "disconnect" ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <WifiOff className="h-4 w-4 mr-2" />
                  )}
                  Wyłącz Auto-połączenie
                </Button>
              )}
            </div>
            <Button
              onClick={handleTestConnection}
              variant="secondary"
              disabled={actionLoading === "test"}
              className="w-full"
            >
              {actionLoading === "test" ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Testuj Połączenie
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
