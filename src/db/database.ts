import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import Database from 'better-sqlite3';

export type Db = Database.Database;

// "IF NOT EXISTS" makes this safe to run on every startup.
const SCHEMA = `
  CREATE TABLE IF NOT EXISTS students (
    discord_id     TEXT PRIMARY KEY,
    institution_id TEXT NOT NULL,
    field_of_study TEXT NOT NULL,
    cohort_year    INTEGER NOT NULL,
    created_at     TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

/**
 * Opens (or creates) the SQLite database file and makes sure the tables exist.
 * Pass ':memory:' for a temporary in-memory database (used in tests).
 */
export function openDatabase(filename: string): Db {
  if (filename !== ':memory:') {
    mkdirSync(dirname(filename), { recursive: true });
  }

  const db = new Database(filename);
  // WAL mode makes reads and writes faster and safer for a long-running bot.
  db.pragma('journal_mode = WAL');
  db.exec(SCHEMA);
  return db;
}
