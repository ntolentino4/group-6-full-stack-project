import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import process from "process";

// Add the '!' here to resolve the 'string | undefined' type error
const connectionString = process.env.DATABASE_URL!;

// Initialize the database connection pool
const pool = new Pool({ connectionString });

// Wrap the pool in the Prisma adapter
const adapter = new PrismaPg(pool);

// Pass the adapter AND the datasourceUrl
const prisma = new PrismaClient({
  adapter,
});

export default prisma;
