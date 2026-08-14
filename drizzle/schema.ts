import { int, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/** Authenticated favourites spanning travel routes and music playlist references. */
export const savedSignals = mysqlTable("savedSignals", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  signalType: mysqlEnum("signalType", ["destination", "playlist"]).notNull(),
  portal: mysqlEnum("portal", ["travel", "music", "you"]).notNull(),
  sourceId: varchar("sourceId", { length: 128 }).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),
  href: varchar("href", { length: 1024 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, table => [
  uniqueIndex("savedSignals_user_source_unique").on(table.userId, table.signalType, table.sourceId),
]);

/** Admin-managed fourtee2travel archive records, editable without source-code changes. */
export const destinationFieldNotes = mysqlTable("destinationFieldNotes", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  city: varchar("city", { length: 120 }).notNull(),
  country: varchar("country", { length: 120 }).notNull(),
  latitude: varchar("latitude", { length: 32 }).notNull(),
  longitude: varchar("longitude", { length: 32 }).notNull(),
  note: text("note").notNull(),
  imageUrl: varchar("imageUrl", { length: 1024 }),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SavedSignal = typeof savedSignals.$inferSelect;
export type DestinationFieldNote = typeof destinationFieldNotes.$inferSelect;
