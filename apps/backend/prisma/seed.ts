import process from "process";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

// Load environment variables from .env (for local) or process (for Vercel)
dotenv.config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  const categories = [
    "Food",
    "Transport",
    "Housing",
    "Entertainment",
    "Shopping",
    "Health",
  ];

  console.log("Seeding categories...");

  for (const name of categories) {
    // upsert prevents duplicates if the script runs twice
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });