import React from "react";
import Item from "./Item";

export interface ShoppingListProps {
  items: { id: number; text: string; checked: boolean }[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ShoppingList({ items, onToggle, onDelete }: ShoppingListProps) {
  if (!items.length) return <p style={{ opacity: 0.7, color: "#b0b0b0", marginTop: 32, fontSize: 18, textAlign: "center" }}>No items yet.</p>;
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.map((item) => (
        <Item key={item.id} {...item} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
  
