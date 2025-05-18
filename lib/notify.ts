// lib/notify.ts
// Notification setup logic for shopping list reminders
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) return 'denied';
  return await Notification.requestPermission();
}

export function scheduleNotification(title: string, options: NotificationOptions, delayMs: number) {
  if (!('Notification' in window)) return;
  setTimeout(() => {
    new Notification(title, options);
  }, delayMs);
}

// Example: scheduleNotification('Remember to shop!', { body: 'Check your shopping list.' }, 10000);
