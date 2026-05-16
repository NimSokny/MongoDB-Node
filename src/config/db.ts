import path from 'node:path';
import fs from 'node:fs/promises';
import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function initDb(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  if (db) return db;

  const dbPath = process.env.SQLITE_DB_PATH ?? './data/app.sqlite';
  const resolvedPath = path.resolve(dbPath);
  await fs.mkdir(path.dirname(resolvedPath), { recursive: true });

  db = await open({
    filename: resolvedPath,
    driver: sqlite3.Database,
  });

  await db.exec('PRAGMA foreign_keys = ON;');

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  return db;
}

export async function getDb(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  return db ?? initDb();
}
