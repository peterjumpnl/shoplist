import React from "react";
import { useRouter } from "next/navigation";

export default function SettingsHeader() {
  const router = useRouter();
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "16px 20px 8px 20px",
      borderBottom: "1px solid #eee",
      background: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 1px 4px rgba(0,0,0,0.03)"
    }}>
      <button
        onClick={() => router.back()}
        aria-label="Back"
        style={{ background: "none", border: "none", padding: 8, marginRight: 12, cursor: "pointer", borderRadius: 8 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 0.5 }}>Settings</span>
    </header>
  );
}
