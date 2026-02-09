export interface HubStatus {
  online: boolean;
  ksefConnected: boolean;
  receivedMessagesCount: number;
  sentToKsefCount: number;
  lastUpdate: string;
}

export interface Message {
  id: string;
  timestamp: string;
  direction: "incoming" | "outgoing";
  source: string;
  destination: string;
  status: "success" | "error" | "pending";
  xmlContent: string;
  response?: string;
  errorMessage?: string;
}
export interface Notification {
  id: number;
  category: "HUB" | "KSEF";
  level: "SUCCESS" | "ERROR" | "WARNING" | "INFO";
  title: string;
  message: string;
  details?: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}
export interface MessageResponse {
  messageId: string;
  timestamp: string;
  status: "success" | "error";
  content: string;
  errorDetails?: string;
}
