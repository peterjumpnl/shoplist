import React, { useRef, useState } from "react";

export interface InputBarProps {
  onSubmit: (text: string) => void;
  suggestions?: string[];
  onSelectSuggestion?: (text: string) => void;
}

export default function InputBar({ onSubmit, suggestions = [], onSelectSuggestion }: InputBarProps) {
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setShowSuggestions(!!e.target.value && suggestions.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit(value.trim());
      setValue("");
      setShowSuggestions(false);
    }
  };

  const handleSelect = (s: string) => {
    setValue(s);
    setShowSuggestions(false);
    if (onSelectSuggestion) onSelectSuggestion(s);
    inputRef.current?.focus();
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      margin: "0 auto 24px auto",
      background: "#fff",
      borderRadius: 14,
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      padding: 6,
      maxWidth: 480
    }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Add item..."
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: 10,
          border: "1.5px solid #e2e8f0",
          fontSize: 17,
          background: "#fafbfc",
          outline: "none",
          boxSizing: "border-box",
          color: "#222",
          fontWeight: 500,
          boxShadow: "none"
        }}
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul style={{
          position: "absolute", left: 0, right: 0, top: 44, background: "#fff", border: "1px solid #eee", borderRadius: 8, zIndex: 10, listStyle: "none", margin: 0, padding: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
        }}>
          {suggestions.map((s, i) => (
            <li key={i} style={{ padding: "8px 16px", cursor: "pointer" }} onMouseDown={() => handleSelect(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
