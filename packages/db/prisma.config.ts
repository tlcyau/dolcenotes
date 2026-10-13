import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // The CLI (db push, migrate, studio) needs a direct or session-mode connection.
    // Read lazily so `prisma generate` still works without it (e.g. in CI).
    url: process.env.DIRECT_URL ?? "",
  },
});
