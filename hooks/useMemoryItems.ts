import { useCallback, useEffect, useState } from "react";
import {
  getMemoryItems,
  addMemoryItem,
  removeMemoryItem,
} from "../lib/db";

export interface MemoryItem {
  id: number;
  text: string;
  created: number;
}

export function useMemoryItems() {
  // Returns memory items matching a prefix (case-insensitive)
  const filterByPrefix = (prefix: string) => {
    if (!prefix) return [];
    return items
      .filter((item) => item.text.toLowerCase().startsWith(prefix.toLowerCase()))
      .sort((a, b) => a.text.localeCompare(b.text));
  };
  const [items, setItems] = useState<MemoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setItems(await getMemoryItems());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(async (text: string) => {
    await addMemoryItem(text);
    refresh();
  }, [refresh]);

  const remove = useCallback(async (id: number) => {
    await removeMemoryItem(id);
    refresh();
  }, [refresh]);

  return { items, loading, add, remove, refresh };
}
