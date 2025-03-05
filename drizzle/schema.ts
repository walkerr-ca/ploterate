import {
  pgTable,
  index,
  uniqueIndex,
  integer,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }),
    email: varchar({ length: 511 }).notNull().unique(),
    profile: varchar({ length: 255 }).notNull(),
    image: text(),
    visibility: varchar({ enum: ["public", "private", "unlisted"] }).default(
      "private",
    ),
    type: varchar({ enum: ["user", "support", "developer"] }).default("user"),
    isActive: boolean().notNull().default(false),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("email_idx").on(table.email),
    index("profile_idx").on(table.profile),
  ],
);

export const userCredentials = pgTable("user_credentials", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => users.id),
  method: varchar({ enum: ["password", "google", "apple"] }).default(
    "password",
  ),
  password: text(),
  hash: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const userSessions = pgTable(
  "user_sessions",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer()
      .notNull()
      .references(() => users.id),
    token: text().notNull().unique(),
    region: varchar({ length: 255 }),
    userAgent: varchar({ length: 255 }),
    expiresAt: timestamp().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
  },
  (table) => [uniqueIndex("token_idx").on(table.token)],
);

export const userSettings = pgTable("user_settings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => users.id),

  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const books = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => users.id),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  images: text(),
  status: varchar({
    enum: [
      "incomplete",
      "planning",
      "writing",
      "editing",
      "publishing",
      "done",
    ],
  }).default("incomplete"),
  visibility: varchar({ enum: ["public", "private", "unlisted"] }).default(
    "private",
  ),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const bookCharacters = pgTable("book_characters", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer()
    .notNull()
    .references(() => books.id),
  firstName: varchar({ length: 255 }),
  lastName: varchar({ length: 255 }),
  primaryName: varchar({ length: 255 }).notNull(),
  titles: text(),
  images: text(),
  description: text(),
  traits: text(),
  journey: text(),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const bookLocations = pgTable("book_locations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer()
    .notNull()
    .references(() => books.id),
  title: varchar({ length: 255 }).notNull(),
  subtitle: varchar({ length: 255 }),
  description: text(),
  images: text(),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const bookPlans = pgTable("book_plans", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer()
    .notNull()
    .references(() => books.id),
  order: integer().notNull(),
  summary: text(),
  description: text(),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const bookChapters = pgTable("book_chapters", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer()
    .notNull()
    .references(() => books.id),
  order: integer().notNull(),
  title: varchar({ length: 255 }).notNull(),
  content: text(),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const bookReviews = pgTable("book_reviews", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer()
    .notNull()
    .references(() => books.id),
  userId: integer()
    .notNull()
    .references(() => users.id),
  rating: integer().notNull(),
  content: text(),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const bookEditors = pgTable("book_editors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer()
    .notNull()
    .references(() => books.id),
  userId: integer()
    .notNull()
    .references(() => users.id),
  canViewCharacters: boolean().notNull().default(false),
  canEditCharacters: boolean().notNull().default(false),
  canViewLocations: boolean().notNull().default(false),
  canEditLocations: boolean().notNull().default(false),
  canViewPlans: boolean().notNull().default(false),
  canEditPlans: boolean().notNull().default(false),
  canViewChapters: boolean().notNull().default(false),
  canEditChapters: boolean().notNull().default(false),
  canEditBook: boolean().notNull().default(false),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const bookSettings = pgTable("book_settings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer()
    .notNull()
    .references(() => books.id),
  publicCharacters: boolean().notNull().default(false),
  publicLocations: boolean().notNull().default(false),
  publicPlans: boolean().notNull().default(false),
  publicChapters: boolean().notNull().default(false),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const reports = pgTable("reports", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => users.id),
  supportId: integer()
    .notNull()
    .references(() => users.id),
  table: varchar({ length: 255 }).notNull(),
  rowId: integer().notNull(),
  reason: text().notNull(),
  category: varchar({ enum: ["spam", "harassment", "other"] }).default("other"),
  isResolved: boolean().notNull().default(false),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});
