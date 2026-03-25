import { PrismaClient } from "../src/generated/prisma/client/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import process from "process";

const connectionString = process.env.DATABASE_URL;

// 1. Initialize the database connection pool
const pool = new Pool({ connectionString });

// 2. Wrap the pool in the Prisma adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter directly to the Prisma Client
const prisma = new PrismaClient({ adapter });

export default prisma;
