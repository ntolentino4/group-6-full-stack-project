import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

// Load variables from your .env file for local development
dotenv.config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});