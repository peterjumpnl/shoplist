"use client";
import React, { useMemo, useState } from "react";
import { useShoppingList } from "../hooks/useShoppingList";
import { useMemoryItems } from "../hooks/useMemoryItems";
import ShoppingList from "../components/ShoppingList";
import InputBar from "../components/InputBar";
import styles from "./page.module.css";
import AppHeader from "../components/AppHeader";

import { getOrder, setOrder } from "../lib/order";

export default function Home() {
  const { items, add, update, remove, loading } = useShoppingList();
  const { items: memoryItems, add: addMemory } = useMemoryItems();
  const [input, setInput] = useState("");
  const [order, setOrderState] = useState<number[] | null>(null);

  // Load order from storage on mount
  React.useEffect(() => {
    getOrder().then((ord) => setOrderState(ord.length ? ord : null));
  }, []);

  // When items change, update order if needed
  React.useEffect(() => {
    if (items.length && order === null) {
      setOrderState(items.map(i => i.id));
    }
  }, [items]);

  // Sorted items by order
  const sortedItems = useMemo(() => {
    if (!order) return items;
    const map = new Map(items.map(i => [i.id, i]));
    return order.map(id => map.get(id)).filter(Boolean) as typeof items;
  }, [items, order]);

  // Suggestions: show memory items that match input and aren't already on the list
  const suggestions = useMemo(() => {
    if (!input) return [];
    const lower = input.toLowerCase();
    return memoryItems
      .filter((m) => m.text.toLowerCase().startsWith(lower) && !items.some((i) => i.text.toLowerCase() === m.text.toLowerCase()))
      .map((m) => m.text)
      .slice(0, 5);
  }, [input, memoryItems, items]);

  const handleAdd = async (text: string) => {
    await add(text);
    if (!memoryItems.some((m) => m.text.toLowerCase() === text.toLowerCase())) {
      await addMemory(text);
    }
    setInput("");
  };

  // Handle drag-and-drop reorder
  const handleReorder = async (newOrder: number[]) => {
    setOrderState(newOrder);
    await setOrder(newOrder);
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main} style={{width: "100%", maxWidth: 480, margin: "0 auto"}}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ShoppingList
            items={sortedItems}
            onToggle={(id) => {
              const item = items.find((i) => i.id === id);
              if (item) update(id, { checked: !item.checked });
            }}
            onDelete={remove}
            onReorder={handleReorder}
          />
        )}
      </main>
      <div style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100vw",
        background: "#fff",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.06)",
        padding: "12px 0 8px 0",
        zIndex: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{width: "100%", maxWidth: 480, padding: "0 12px"}}>
          <InputBar
            onSubmit={handleAdd}
            suggestions={suggestions}
            onSelectSuggestion={setInput}
          />
        </div>
      </div>
    </div>
  );
}
