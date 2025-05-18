import React from "react";

export interface ItemProps {
  id: number;
  text: string;
  checked: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function Item({ id, text, checked, onToggle, onDelete }: ItemProps) {
  return (
    <li style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(id)}
        style={{ marginRight: 8 }}
      />
      <span style={{ textDecoration: checked ? "line-through" : "none", flex: 1 }}>{text}</span>
      <button onClick={() => onDelete(id)} style={{ background: "none", border: "none", color: "#e11d48", fontWeight: 600, cursor: "pointer" }}>
        ×
      </button>
    </li>
  );
}
