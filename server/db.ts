import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { contacts, projects } from "@shared/schema";

// Initialize connection
const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

export const connection = postgres(connectionString);
export const db = drizzle(connection, {
  schema: {
    contacts,
    projects,
  },
});

export type Database = typeof db;