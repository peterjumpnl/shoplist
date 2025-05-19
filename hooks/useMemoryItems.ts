import { useEffect, useState, useCallback } from "react";
import { getDB, addMemoryItem, removeMemoryItem, MemoryItemDocType } from "../lib/db";
import { RxCollection, RxDocument } from 'rxdb';
import { Subscription, Observable } from 'rxjs';

export function useMemoryItems() {
  const [items, setItems] = useState<MemoryItemDocType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let sub: Subscription | null = null;
    let mounted = true;
    setLoading(true);
    getDB().then(db => {
      const collection = db.collections['memory_items'] as RxCollection<MemoryItemDocType>;
      const observable = collection.find().sort({ created: 'asc' }).$ as Observable<RxDocument<MemoryItemDocType, {}>[]>;
      sub = observable.subscribe((docs: RxDocument<MemoryItemDocType, {}>[]) => {
        if (mounted) {
          setItems(docs.map((d: RxDocument<MemoryItemDocType, {}>) => d.toJSON()));
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
    await addMemoryItem(text);
  }, []);

  const remove = useCallback(async (id: number) => {
    await removeMemoryItem(id);
  }, []);

  // Returns memory items matching a prefix (case-insensitive)
  const filterByPrefix = (prefix: string) => {
    if (!prefix) return [];
    return items
      .filter((item) => item.text.toLowerCase().startsWith(prefix.toLowerCase()))
      .sort((a, b) => a.text.localeCompare(b.text));
  };

  return { items, loading, add, remove, filterByPrefix };
}
