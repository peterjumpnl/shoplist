// Handles storing and retrieving the shopping list order in IndexedDB
import { openDB } from 'idb';

const DB_NAME = 'shoplist';
const STORE_NAME = 'order';

export async function getOrder(): Promise<number[]> {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    }
  });
  return (await db.get(STORE_NAME, 'order')) || [];
}

export async function setOrder(order: number[]) {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    }
  });
  await db.put(STORE_NAME, order, 'order');
}
