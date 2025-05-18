import React from "react";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

export default function InstallPrompt() {
  const { isSupported, promptInstall } = useInstallPrompt();
  if (!isSupported) return null;
  return (
    <div style={{ position: "fixed", bottom: 24, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 1000 }}>
      <button onClick={promptInstall} style={{ padding: "12px 24px", fontSize: 16, borderRadius: 8, background: "#2563eb", color: "white", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        Install App
      </button>
    </div>
  );
}
