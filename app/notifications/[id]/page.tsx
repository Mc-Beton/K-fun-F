"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Server,
  Network,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import type { Notification } from "@/types";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export default function NotificationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/notifications/${id}`, {
          cache: "no-store",
        });

        if (response.ok) {
          const data = await response.json();
          setNotification(data);

          // Mark as read
          if (!data.isRead) {
            await fetch(`${BACKEND_URL}/api/notifications/${id}/read`, {
              method: "PUT",
            });
          }
        } else {
          console.error("Notification not found");
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching notification:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNotification();
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!notification) {
    return null;
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "SUCCESS":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case "ERROR":
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      case "WARNING":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case "INFO":
      default:
        return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "HUB":
        return <Server className="h-5 w-5" />;
      case "KSEF":
        return <Network className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getLevelBadgeVariant = (
    level: string,
  ): "default" | "destructive" | "secondary" => {
    switch (level) {
      case "ERROR":
        return "destructive";
      case "WARNING":
        return "secondary";
      default:
        return "default";
    }
  };

  const getLevelText = (level: string): string => {
    switch (level) {
      case "SUCCESS":
        return "Sukces";
      case "ERROR":
        return "Błąd";
      case "WARNING":
        return "Ostrzeżenie";
      case "INFO":
        return "Informacja";
      default:
        return level;
    }
  };

  const parseDetails = (details?: string) => {
    if (!details) return null;
    try {
      return JSON.parse(details);
    } catch {
      return details;
    }
  };

  const details = parseDetails(notification.details);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Powrót
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              {getLevelIcon(notification.level)}
              <div className="space-y-2 flex-1">
                <CardTitle className="text-2xl">{notification.title}</CardTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={getLevelBadgeVariant(notification.level)}>
                    {getLevelText(notification.level)}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    {getCategoryIcon(notification.category)}
                    {notification.category === "HUB"
                      ? "System Hub"
                      : "Połączenie KSeF"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {format(new Date(notification.createdAt), "PPpp", { locale: pl })}
            </span>
          </div>

          <Separator />

          {/* Message */}
          <div className="space-y-2">
            <h3 className="font-semibold">Wiadomość</h3>
            <p className="text-muted-foreground leading-relaxed">
              {notification.message}
            </p>
          </div>

          {/* Details */}
          {details && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold">Szczegóły</h3>
                {typeof details === "object" ? (
                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    {Object.entries(details).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="font-medium capitalize">
                          {key.replace(/_/g, " ")}:
                        </span>
                        <span className="text-muted-foreground">
                          {String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
                    {details}
                  </pre>
                )}
              </div>
            </>
          )}

          {/* Category specific info */}
          <Separator />
          <div className="space-y-2">
            <h3 className="font-semibold">Kategoria</h3>
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {getCategoryIcon(notification.category)}
                <span className="font-medium">
                  {notification.category === "HUB"
                    ? "System Hub"
                    : "Połączenie z KSeF"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {notification.category === "HUB"
                  ? "Powiadomienie dotyczące statusu samego systemu KSeF Hub - uruchomienia, zatrzymania lub błędów aplikacji."
                  : "Powiadomienie dotyczące połączenia z zewnętrznym serwerem KSeF - udane/nieudane próby połączenia, sesje, błędy komunikacji."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
