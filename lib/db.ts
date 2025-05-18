// lib/db.ts
// IndexedDB wrapper for shopping_items and memory_items
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface ShoplistDB extends DBSchema {
  shopping_items: {
    key: number;
    value: {
      id: number;
      text: string;
      checked: boolean;
      created: number;
    };
    indexes: { 'by-created': number };
  };
  memory_items: {
    key: number;
    value: {
      id: number;
      text: string;
      created: number;
    };
    indexes: { 'by-created': number };
  };
}

let dbPromise: Promise<IDBPDatabase<ShoplistDB>> | null = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<ShoplistDB>('shoplist', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('shopping_items')) {
          const store = db.createObjectStore('shopping_items', { keyPath: 'id', autoIncrement: true });
          store.createIndex('by-created', 'created');
        }
        if (!db.objectStoreNames.contains('memory_items')) {
          const store = db.createObjectStore('memory_items', { keyPath: 'id', autoIncrement: true });
          store.createIndex('by-created', 'created');
        }
      },
    });
  }
  return dbPromise;
}

// Shopping Items CRUD
export async function getShoppingItems() {
  const db = await getDB();
  return db.getAll('shopping_items');
}

export async function addShoppingItem(text: string) {
  const db = await getDB();
  const now = Date.now();
  return db.add('shopping_items', { text, checked: false, created: now, id: now });
}

export async function updateShoppingItem(id: number, updates: Partial<{ text: string; checked: boolean }>) {
  const db = await getDB();
  const item = await db.get('shopping_items', id);
  if (!item) return;
  const updated = { ...item, ...updates };
  await db.put('shopping_items', updated);
}

export async function removeShoppingItem(id: number) {
  const db = await getDB();
  await db.delete('shopping_items', id);
}

// Memory Items CRUD
export async function getMemoryItems() {
  const db = await getDB();
  return db.getAll('memory_items');
}

export async function addMemoryItem(text: string) {
  const db = await getDB();
  const now = Date.now();
  return db.add('memory_items', { text, created: now, id: now });
}

export async function removeMemoryItem(id: number) {
  const db = await getDB();
  await db.delete('memory_items', id);
}
