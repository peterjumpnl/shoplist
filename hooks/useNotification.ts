// hooks/useNotification.ts
import { useCallback, useEffect, useState } from "react";
import { requestNotificationPermission, scheduleNotification } from "../lib/notify";

export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const request = useCallback(async () => {
    const perm = await requestNotificationPermission();
    setPermission(perm);
    return perm;
  }, []);

  // Schedule a notification after a delay (ms)
  const schedule = useCallback((title: string, options: NotificationOptions, delayMs: number) => {
    scheduleNotification(title, options, delayMs);
  }, []);

  return { permission, request, schedule };
}
