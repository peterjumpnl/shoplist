import { useEffect, useState, useCallback } from "react";
import { getDB, addShoppingItem, updateShoppingItem, removeShoppingItem, ShoppingItemDocType } from "../lib/db";
import { RxCollection, RxDocument } from 'rxdb';
import { Subscription, Observable } from 'rxjs';

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItemDocType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let sub: Subscription | null = null;
    let mounted = true;
    setLoading(true);
    getDB().then(db => {
      const collection = db.collections['shopping_items'] as RxCollection<ShoppingItemDocType>;
      const observable = collection.find().sort({ created: 'asc' }).$ as Observable<RxDocument<ShoppingItemDocType, {}>[]>;
      sub = observable.subscribe((docs: RxDocument<ShoppingItemDocType, {}>[]) => {
        if (mounted) {
          setItems(docs.map((d: RxDocument<ShoppingItemDocType, {}>) => d.toJSON()));
          setLoading(false);
        }
      });
    });
    return () => {
      mounted = false;
      if (sub) sub.unsubscribe();
    };
  }, []);

  const add = useCallback(async (text: string) => {
    await addShoppingItem(text);
  }, []);

  const update = useCallback(async (id: number, updates: Partial<Pick<ShoppingItemDocType, "text" | "checked">>) => {
    await updateShoppingItem(id, updates);
  }, []);

  const remove = useCallback(async (id: number) => {
    await removeShoppingItem(id);
  }, []);

  return { items, loading, add, update, remove };
}
