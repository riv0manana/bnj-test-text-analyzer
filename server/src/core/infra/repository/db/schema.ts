import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";

export const analysis = pgTable("analysis", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  score: integer("score").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Analysis = typeof analysis.$inferSelect;
export type NewAnalysis = typeof analysis.$inferInsert;
