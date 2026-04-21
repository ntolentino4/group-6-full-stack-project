import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

// Load variables from your .env file
dotenv.config();

export default defineConfig({
  earlyAccess: true,
  datasource: {
    // The CLI explicitly requires this exact property path for 'migrate reset'
    url: process.env.DATABASE_URL,
  },
});
