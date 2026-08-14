import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const dbMocks = vi.hoisted(() => ({
  listSignalsForUser: vi.fn(),
  toggleSignalForUser: vi.fn(),
  listPublishedDestinationNotes: vi.fn(),
  listDestinationNotesForAdmin: vi.fn(),
  createDestinationNote: vi.fn(),
  updateDestinationNote: vi.fn(),
  deleteDestinationNote: vi.fn(),
}));

vi.mock("./db", () => dbMocks);
import { appRouter } from "./routers";

function userContext(): TrpcContext {
  return {
    user: {
      id: 7,
      openId: "signal-test-user",
      name: "Signal Tester",
      email: null,
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {} as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("fourtee2 signal and archive procedures", () => {
  beforeEach(() => {
    Object.values(dbMocks).forEach(mock => mock.mockReset());
  });

  it("returns empty managed lists safely", async () => {
    dbMocks.listSignalsForUser.mockResolvedValue([]);
    dbMocks.listPublishedDestinationNotes.mockResolvedValue([]);
    dbMocks.listDestinationNotesForAdmin.mockResolvedValue([]);
    const caller = appRouter.createCaller(userContext());
    await expect(caller.signal.list()).resolves.toEqual([]);
    await expect(caller.archive.listPublished()).resolves.toEqual([]);
    await expect(caller.archive.adminList()).resolves.toEqual([]);
  });

  it("saves then removes a music signal and reflects both states in the personal board query", async () => {
    const input = {
      signalType: "playlist" as const,
      portal: "music" as const,
      sourceId: "spotify-night-rider",
      title: "Night field in rotation",
      subtitle: "4[music]2 / Spotify transmission",
      href: "https://example.com/music",
    };
    const savedSignals: Array<typeof input & { id: number; userId: number }> = [];
    dbMocks.listSignalsForUser.mockImplementation(async () => savedSignals);
    dbMocks.toggleSignalForUser.mockImplementation(async (userId, signal) => {
      const existingIndex = savedSignals.findIndex(item => item.signalType === signal.signalType && item.sourceId === signal.sourceId);
      if (existingIndex >= 0) {
        savedSignals.splice(existingIndex, 1);
        return { saved: false, signal: null };
      }
      savedSignals.push({ id: 1, userId, ...signal });
      return { saved: true, signal };
    });
    const caller = appRouter.createCaller(userContext());
    await expect(caller.signal.toggle(input)).resolves.toMatchObject({ saved: true, signal: input });
    await expect(caller.signal.list()).resolves.toMatchObject([{ title: input.title, sourceId: input.sourceId }]);
    await expect(caller.signal.toggle(input)).resolves.toEqual({ saved: false, signal: null });
    await expect(caller.signal.list()).resolves.toEqual([]);
    expect(dbMocks.toggleSignalForUser).toHaveBeenCalledTimes(2);
  });

  it("creates, updates, and removes destination field notes through the admin contract", async () => {
    const input = {
      title: "Westward Light",
      city: "Perth",
      country: "Australia",
      latitude: "-31.9535",
      longitude: "115.8570",
      note: "An editorial coordinate held only for automated contract verification.",
      status: "draft" as const,
    };
    const notes: Array<typeof input & { id: number; status: "draft" | "published" }> = [];
    dbMocks.createDestinationNote.mockImplementation(async data => {
      const note = { id: 101, ...data };
      notes.push(note);
      return note;
    });
    dbMocks.updateDestinationNote.mockImplementation(async (id, data) => {
      const note = notes.find(item => item.id === id);
      if (!note) return null;
      Object.assign(note, data);
      return note;
    });
    dbMocks.deleteDestinationNote.mockImplementation(async id => {
      const index = notes.findIndex(note => note.id === id);
      if (index < 0) return false;
      notes.splice(index, 1);
      return true;
    });
    dbMocks.listPublishedDestinationNotes.mockImplementation(async () => notes.filter(note => note.status === "published"));
    const caller = appRouter.createCaller(userContext());
    await expect(caller.archive.create(input)).resolves.toMatchObject({ id: 101, ...input });
    await expect(caller.archive.update({ id: 101, data: { ...input, status: "published" } })).resolves.toMatchObject({ id: 101, status: "published" });
    await expect(caller.archive.listPublished()).resolves.toMatchObject([{ id: 101, status: "published", title: input.title }]);
    await expect(caller.archive.remove({ id: 101 })).resolves.toBe(true);
    await expect(caller.archive.listPublished()).resolves.toEqual([]);
    expect(dbMocks.createDestinationNote).toHaveBeenCalledWith(input);
    expect(dbMocks.updateDestinationNote).toHaveBeenCalledWith(101, { ...input, status: "published" });
    expect(dbMocks.deleteDestinationNote).toHaveBeenCalledWith(101);
  });
});
