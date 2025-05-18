import { useCallback, useEffect, useState } from "react";
import {
  getShoppingItems,
  addShoppingItem,
  updateShoppingItem,
  removeShoppingItem,
} from "../lib/db";

export interface ShoppingItem {
  id: number;
  text: string;
  checked: boolean;
  created: number;
}

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setItems(await getShoppingItems());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(async (text: string) => {
    await addShoppingItem(text);
    refresh();
  }, [refresh]);

  const update = useCallback(async (id: number, updates: Partial<Pick<ShoppingItem, "text" | "checked">>) => {
    await updateShoppingItem(id, updates);
    refresh();
  }, [refresh]);

  const remove = useCallback(async (id: number) => {
    await removeShoppingItem(id);
    refresh();
  }, [refresh]);

  return { items, loading, add, update, remove, refresh };
}
