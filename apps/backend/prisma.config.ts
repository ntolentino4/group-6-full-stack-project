import { defineConfig } from "prisma/config";
import process from "process";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
