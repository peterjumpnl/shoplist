import React, { useState } from "react";
import { useMemoryItems } from "../hooks/useMemoryItems";
import { useNotification } from "../hooks/useNotification";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function SettingsForm() {
  const { items, remove } = useMemoryItems();
  const { permission, request } = useNotification();
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(0);
  const [day, setDay] = useState(0);

  return (
    <form style={{ maxWidth: 400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
      <label>
        Notification Permission: {permission}
        {permission !== "granted" && (
          <button type="button" onClick={request} style={{ marginLeft: 8 }}>Enable</button>
        )}
      </label>
      <label>
        Day:
        <select value={day} onChange={e => setDay(Number(e.target.value))}>
          {days.map((d, i) => <option key={i} value={i}>{d}</option>)}
        </select>
      </label>
      <label>
        Time:
        <input type="number" min={0} max={23} value={hour} onChange={e => setHour(Number(e.target.value))} style={{ width: 60 }} /> :
        <input type="number" min={0} max={59} value={minute} onChange={e => setMinute(Number(e.target.value))} style={{ width: 60 }} />
      </label>
      <div>
        <strong>Memory Items</strong>
        <ul style={{ padding: 0, listStyle: "none" }}>
          {items.map(item => (
            <li key={item.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span>{item.text}</span>
              <button type="button" onClick={() => remove(item.id)} style={{ color: "#e11d48", background: "none", border: "none", cursor: "pointer" }}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
