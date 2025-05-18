import { useEffect, useState, useCallback } from "react";

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsSupported(true);
    };
    window.addEventListener("beforeinstallprompt", handler as EventListener, { once: true });
    return () => window.removeEventListener("beforeinstallprompt", handler as EventListener);
  }, []);

  const promptInstall = useCallback(() => {
    if (deferredPrompt && (deferredPrompt as any).prompt) {
      (deferredPrompt as any).prompt();
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  return { isSupported, promptInstall };
}
