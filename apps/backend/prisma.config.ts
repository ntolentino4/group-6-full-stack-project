import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  datasources: {
    url: process.env.DATABASE_URL,
  },
  // ADD THIS SECTION:
  migrations: {
    seed: 'ts-node prisma/seed.ts',
  },
});