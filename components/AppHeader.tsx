import React from "react";
import Link from "next/link";
import { Settings } from 'lucide-react';

export interface AppHeaderProps {
  title?: string;
  leftIcon?: React.ReactNode;
  leftAction?: () => void;
  rightIcon?: React.ReactNode;
  rightHref?: string;
}

export default function AppHeader({
  title = "Shopping List",
  leftIcon,
  leftAction,
  rightIcon = (<Settings size="24" color="#222" />),
  rightHref = "/settings",
}: AppHeaderProps) {
  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      maxWidth: "100vw",
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 12px",
      background: "#fff",
      zIndex: 100,
      borderBottom: "1px solid #f0f0f0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      minHeight: 56
    }}>
      <span style={{ display: "flex", alignItems: "center" }}>
        {leftIcon && (
          <button
            onClick={leftAction}
            aria-label="Back"
            style={{ background: "none", border: "none", padding: 8, marginRight: 8, cursor: "pointer", borderRadius: 8, minWidth: 40, minHeight: 40, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {leftIcon}
          </button>
        )}
        <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: 0.2, color: "#222", display: "flex", alignItems: "center", gap: 8 }}>
          {title}
        </span>
      </span>
      {rightIcon && rightHref && (
        <Link href={rightHref} style={{ display: "flex", alignItems: "center", padding: 8, borderRadius: 8, minWidth: 40, minHeight: 40, justifyContent: "center", transition: "background .2s" }} aria-label="Settings">
          {rightIcon}
        </Link>
      )}
    </header>
  );
}
