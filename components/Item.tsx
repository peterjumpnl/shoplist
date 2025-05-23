import React from "react";
import { X, GripVertical } from 'lucide-react';


export interface ItemProps {
  id: number;
  text: string;
  checked: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
}

export default function Item({ id, text, checked, onToggle, onDelete, dragHandleProps }: ItemProps) {
  return (
    <li style={{
      display: "flex",
      alignItems: "center",
      width: "100%",
      background: "#fafbfc",
      borderRadius: 10,
      padding: "10px 12px",
      marginBottom: 8,
      boxShadow: "0 1px 4px rgba(0,0,0,0.03)"
    }}>
      <button
        {...dragHandleProps}
        style={{
          background: "none",
          border: "none",
          cursor: "grab",
          padding: 0,
          marginRight: 10,
          display: "flex",
          alignItems: "center",
          color: "#bbb"
        }}
        aria-label="Drag to reorder"
        tabIndex={-1}
      >
        <GripVertical size={20} />
      </button>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(id)}
        style={{ marginRight: 12 }}
      />
      <span style={{ textDecoration: checked ? "line-through" : "none", flex: 1, fontSize: 16, color: checked ? "#bbb" : "#222", overflowWrap: "break-word" }}>{text}</span>
      <button
        onClick={() => onDelete(id)}
        style={{ background: "none", border: "none", color: "#e11d48", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", marginLeft: 12 }}
        aria-label="Delete"
      >
        <X size={20} color="#e11d48" />
      </button>
    </li>
  );
}
