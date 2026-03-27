/*
  Warnings:

  - You are about to drop the column `category` on the `BudgetGoal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryId]` on the table `BudgetGoal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `BudgetGoal` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BudgetGoal_category_key";

-- AlterTable
ALTER TABLE "BudgetGoal" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetGoal_categoryId_key" ON "BudgetGoal"("categoryId");

-- AddForeignKey
ALTER TABLE "BudgetGoal" ADD CONSTRAINT "BudgetGoal_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
