import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import process from "process";

const connectionString = process.env.DATABASE_URL;

// Initialize the database connection pool
const pool = new Pool({ connectionString });

// Wrap the pool in the Prisma adapter
const adapter = new PrismaPg(pool);

// Pass the adapter directly to the Prisma Client
const prisma = new PrismaClient({ adapter });

export default prisma;
