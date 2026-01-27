import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('DATABASE_URL not set, using in-memory fallback');
}

// Create postgres client
const client = connectionString
  ? postgres(connectionString, { prepare: false })
  : null;

// Create drizzle instance
export const db = client ? drizzle(client, { schema }) : null;

// Export schema for use elsewhere
export * from './schema.js';

// Health check
export async function checkDatabaseConnection(): Promise<boolean> {
  if (!db) return false;
  try {
    await client!`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
