import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

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
  it("returns empty managed lists safely when no database is available", async () => {
    const caller = appRouter.createCaller(userContext());
    await expect(caller.signal.list()).resolves.toEqual([]);
    await expect(caller.archive.listPublished()).resolves.toEqual([]);
    await expect(caller.archive.adminList()).resolves.toEqual([]);
  });
});
