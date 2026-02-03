import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

const DATABASE_URL = env.DATABASE_URL;

if (!DATABASE_URL) {
	console.warn('DATABASE_URL not set - database features will not work');
}

// Create client only if DATABASE_URL is available
const client = DATABASE_URL ? postgres(DATABASE_URL) : null;

export const db = client ? drizzle(client, { schema }) : null;

export function requireDb() {
	if (!db) {
		throw new Error('Database not configured - set DATABASE_URL environment variable');
	}
	return db;
}

export * from './schema';
