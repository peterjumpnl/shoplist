// lib/db.ts
// RxDB wrapper for shopping_items and memory_items using LocalStorage
import { createRxDatabase, RxDatabase, RxCollection, addRxPlugin } from 'rxdb';
import { getRxStorageLocalstorage } from 'rxdb/plugins/storage-localstorage';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';


import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';

// Only for dev mode
addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);

// TypeScript interfaces for documents
export interface ShoppingItemDocType {
  id: string;
  text: string;
  checked: boolean;
  created: number;
}

export interface MemoryItemDocType {
  id: string;
  text: string;
  created: number;
}

// RxDB JSON schemas
const shoppingItemSchema = {
  title: 'shopping_items schema',
  version: 0,
  description: 'Schema for shopping items',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 20 },
    text: { type: 'string' },
    checked: { type: 'boolean' },
    created: { type: 'number', multipleOf: 1, minimum: 0, maximum: 9223372036854775807 },
  },
  required: ['id', 'text', 'checked', 'created'],
  indexes: ['created']
};

const memoryItemSchema = {
  title: 'memory_items schema',
  version: 0,
  description: 'Schema for memory items',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 20 },
    text: { type: 'string' },
    created: { type: 'number', multipleOf: 1, minimum: 0, maximum: 9223372036854775807 },
  },
  required: ['id', 'text', 'created'],
  indexes: ['created']
};

// Singleton RxDB instance
let dbPromise: Promise<RxDatabase> | null = null;

export async function getDB(): Promise<RxDatabase> {
  if (!dbPromise) {
    dbPromise = createRxDatabase({
      name: 'shoplist',
      storage: wrappedValidateAjvStorage({
        storage: getRxStorageLocalstorage()
      }),
      multiInstance: false,
      eventReduce: true,
      closeDuplicates: true,
    }).then(async (db) => {
      // Create collections if they don't exist
      if (!db.collections['shopping_items']) {
        await db.addCollections({
          shopping_items: { schema: shoppingItemSchema },
        });
      }
      if (!db.collections['memory_items']) {
        await db.addCollections({
          memory_items: { schema: memoryItemSchema },
        });
      }
      return db;
    });
  }
  return dbPromise;
}

// Shopping Items CRUD
export async function getShoppingItems(): Promise<ShoppingItemDocType[]> {
  const db = await getDB();
  const collection = db.collections['shopping_items'] as RxCollection<ShoppingItemDocType>;
  return await collection.find().sort({ created: 'asc' }).exec();
}

export async function addShoppingItem(text: string): Promise<void> {
  const db = await getDB();
  const collection = db.collections['shopping_items'] as RxCollection<ShoppingItemDocType>;
  const now = Date.now();
  await collection.insert({ id: now.toString(), text, checked: false, created: now });
}

export async function updateShoppingItem(id: string, updates: Partial<{ text: string; checked: boolean }>): Promise<void> {
  const db = await getDB();
  const collection = db.collections['shopping_items'] as RxCollection<ShoppingItemDocType>;
  const doc = await collection.findOne({ selector: { id } }).exec();
  if (!doc) return;
  await doc.patch(updates);
}

export async function removeShoppingItem(id: string): Promise<void> {
  const db = await getDB();
  const collection = db.collections['shopping_items'] as RxCollection<ShoppingItemDocType>;
  const doc = await collection.findOne({ selector: { id } }).exec();
  if (doc) await doc.remove();
}

// Memory Items CRUD
export async function getMemoryItems(): Promise<MemoryItemDocType[]> {
  const db = await getDB();
  const collection = db.collections['memory_items'] as RxCollection<MemoryItemDocType>;
  return await collection.find().sort({ created: 'asc' }).exec();
}

export async function addMemoryItem(text: string): Promise<void> {
  const db = await getDB();
  const collection = db.collections['memory_items'] as RxCollection<MemoryItemDocType>;
  const now = Date.now();
  await collection.insert({ id: now.toString(), text, created: now });
}

export async function removeMemoryItem(id: string): Promise<void> {
  const db = await getDB();
  const collection = db.collections['memory_items'] as RxCollection<MemoryItemDocType>;
  const doc = await collection.findOne({ selector: { id } }).exec();
  if (doc) await doc.remove();
}
