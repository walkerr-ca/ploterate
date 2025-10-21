import {
  pgTable,
  integer,
  bigint,
  varchar,
  text,
  timestamp,
  boolean,
  index,
  unique,
} from "drizzle-orm/pg-core";

const tableMetadata = {
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  deletedAt: timestamp("deletedAt"),
};

export const userTable = pgTable(
  "user",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    securityId: integer("security_id")
      .unique()
      .notNull()
      .references(() => securityTable.id),
    email: varchar("email", { length: 255 }).unique().notNull(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 12 }),
    description: text(),
    type: varchar("type", {
      length: 10,
      enum: ["reader", "author", "publisher", "staff"],
    })
      .default("reader")
      .notNull(),
    isAdmin: boolean("is_admin").default(false).notNull(),
    ...tableMetadata,
  },
  (table) => [index("user_email_idx").on(table.email)],
);

export const securityTable = pgTable("security", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  password: varchar("password", { length: 255 }).unique().notNull(),
  totpToken: varchar("totp_token", { length: 255 }).unique().notNull(),
  isMfa: boolean("is_mfa").default(false).notNull(),
  ...tableMetadata,
});

export const backupCodeTable = pgTable("backup_code", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  securityId: integer("security_id")
    .notNull()
    .references(() => securityTable.id),
  code: varchar("code", { length: 255 }).unique().notNull(),
  ...tableMetadata,
});

export const sessionTable = pgTable("session", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  refreshToken: varchar("refresh_token", { length: 255 }).unique(),
  origin: varchar("origin", { length: 255 }),
  ip: varchar("ip", { length: 15 }),
  ...tableMetadata,
});

export const timeWindowTable = pgTable(
  "time_window",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("user_id")
      .notNull()
      .references(() => userTable.id),
    step: bigint({ mode: "number" }).notNull(),
    ...tableMetadata,
  },
  (table) => [
    unique("time_window_unique").on(table.userId, table.step),
    index("time_window_step_idx").on(table.step),
  ],
);
