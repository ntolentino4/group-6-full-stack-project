/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,userId]` on the table `BudgetGoal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `BudgetGoal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FilterPreset` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BudgetGoal_categoryId_key";

-- AlterTable
ALTER TABLE "BudgetGoal" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FilterPreset" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetGoal_categoryId_userId_key" ON "BudgetGoal"("categoryId", "userId");

-- AddForeignKey
ALTER TABLE "BudgetGoal" ADD CONSTRAINT "BudgetGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterPreset" ADD CONSTRAINT "FilterPreset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
