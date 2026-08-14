import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { destinationFieldNotes, InsertUser, savedSignals, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export type SignalInput = {
  signalType: "destination" | "playlist";
  portal: "travel" | "music" | "you";
  sourceId: string;
  title: string;
  subtitle?: string;
  href?: string;
};

export type DestinationInput = {
  title: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  note: string;
  imageUrl?: string;
  status: "draft" | "published";
};

export async function listSignalsForUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(savedSignals).where(eq(savedSignals.userId, userId)).orderBy(desc(savedSignals.createdAt));
}

export async function toggleSignalForUser(userId: number, signal: SignalInput) {
  const db = await getDb();
  if (!db) return { saved: false, signal: null };
  const existing = await db.select({ id: savedSignals.id }).from(savedSignals).where(and(
    eq(savedSignals.userId, userId),
    eq(savedSignals.signalType, signal.signalType),
    eq(savedSignals.sourceId, signal.sourceId),
  )).limit(1);
  if (existing[0]) {
    await db.delete(savedSignals).where(eq(savedSignals.id, existing[0].id));
    return { saved: false, signal: null };
  }
  await db.insert(savedSignals).values({ userId, ...signal });
  return { saved: true, signal };
}

export async function listPublishedDestinationNotes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(destinationFieldNotes).where(eq(destinationFieldNotes.status, "published")).orderBy(desc(destinationFieldNotes.updatedAt));
}

export async function listDestinationNotesForAdmin() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(destinationFieldNotes).orderBy(desc(destinationFieldNotes.updatedAt));
}

export async function createDestinationNote(input: DestinationInput) {
  const db = await getDb();
  if (!db) return null;
  await db.insert(destinationFieldNotes).values(input);
  const records = await db.select().from(destinationFieldNotes).orderBy(desc(destinationFieldNotes.id)).limit(1);
  return records[0] ?? null;
}

export async function updateDestinationNote(id: number, input: DestinationInput) {
  const db = await getDb();
  if (!db) return null;
  await db.update(destinationFieldNotes).set({ ...input, updatedAt: new Date() }).where(eq(destinationFieldNotes.id, id));
  const records = await db.select().from(destinationFieldNotes).where(eq(destinationFieldNotes.id, id)).limit(1);
  return records[0] ?? null;
}

export async function deleteDestinationNote(id: number) {
  const db = await getDb();
  if (!db) return false;
  await db.delete(destinationFieldNotes).where(eq(destinationFieldNotes.id, id));
  return true;
}
