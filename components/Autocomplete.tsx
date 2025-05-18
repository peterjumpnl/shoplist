import React from "react";

export interface AutocompleteProps {
  suggestions: string[];
  onSelect: (text: string) => void;
}

export default function Autocomplete({ suggestions, onSelect }: AutocompleteProps) {
  if (!suggestions.length) return null;
  return (
    <ul style={{
      position: "absolute", left: 0, right: 0, top: 44, background: "#fff", border: "1px solid #eee", borderRadius: 8, zIndex: 10, listStyle: "none", margin: 0, padding: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
    }}>
      {suggestions.map((s, i) => (
        <li key={i} style={{ padding: "8px 16px", cursor: "pointer" }} onMouseDown={() => onSelect(s)}>
          {s}
        </li>
      ))}
    </ul>
  );
}
