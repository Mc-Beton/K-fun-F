"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Server,
  Network,
} from "lucide-react";
import type { Notification } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  onClose: () => void;
}

export function NotificationList({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClose,
}: NotificationListProps) {
  const router = useRouter();

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "SUCCESS":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "ERROR":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "WARNING":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "INFO":
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "HUB":
        return <Server className="h-4 w-4" />;
      case "KSEF":
        return <Network className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
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

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read if unread
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    // Navigate to detail page
    router.push(`/notifications/${notification.id}`);
    onClose();
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-sm">Powiadomienia</h3>
        {notifications.some((n) => !n.isRead) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkAllAsRead}
            className="text-xs h-7"
          >
            Oznacz wszystkie
          </Button>
        )}
      </div>

      {/* Notifications list */}
      <ScrollArea className="h-[400px]">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Info className="h-8 w-8 mb-2" />
            <p className="text-sm">Brak powiadomień</p>
          </div>
        ) : (
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                  !notification.isRead ? "bg-muted/30" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-3">
                  {/* Category Icon */}
                  <div className="mt-0.5">
                    {getCategoryIcon(notification.category)}
                  </div>

                  <div className="flex-1 space-y-1 min-w-0">
                    {/* Title and Level */}
                    <div className="flex items-center gap-2">
                      {getLevelIcon(notification.level)}
                      <span className="font-medium text-sm truncate">
                        {notification.title}
                      </span>
                      {!notification.isRead && (
                        <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                      )}
                    </div>

                    {/* Message */}
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center gap-2 pt-1">
                      <Badge
                        variant={getLevelBadgeVariant(notification.level)}
                        className="text-xs"
                      >
                        {notification.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                          locale: pl,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      {notifications.length > 0 && (
        <>
          <Separator />
          <div className="p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => {
                router.push("/notifications");
                onClose();
              }}
            >
              Zobacz wszystkie powiadomienia
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
