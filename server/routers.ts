import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import * as db from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";

const signalInput = z.object({
  signalType: z.enum(["destination", "playlist"]),
  portal: z.enum(["travel", "music", "you"]),
  sourceId: z.string().min(1).max(128),
  title: z.string().min(1).max(180),
  subtitle: z.string().max(255).optional(),
  href: z.string().url().max(1024).optional(),
});

const destinationInput = z.object({
  title: z.string().min(1).max(180),
  city: z.string().min(1).max(120),
  country: z.string().min(1).max(120),
  latitude: z.string().min(1).max(32),
  longitude: z.string().min(1).max(32),
  note: z.string().min(1).max(5000),
  imageUrl: z.string().url().max(1024).optional(),
  status: z.enum(["draft", "published"]),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  signal: router({
    list: protectedProcedure.query(({ ctx }) => db.listSignalsForUser(ctx.user.id)),
    toggle: protectedProcedure.input(signalInput).mutation(({ ctx, input }) => db.toggleSignalForUser(ctx.user.id, input)),
  }),
  archive: router({
    listPublished: publicProcedure.query(() => db.listPublishedDestinationNotes()),
    adminList: adminProcedure.query(() => db.listDestinationNotesForAdmin()),
    create: adminProcedure.input(destinationInput).mutation(({ input }) => db.createDestinationNote(input)),
    update: adminProcedure.input(z.object({ id: z.number().int().positive(), data: destinationInput })).mutation(({ input }) => db.updateDestinationNote(input.id, input.data)),
    remove: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => db.deleteDestinationNote(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
