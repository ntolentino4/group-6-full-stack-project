import prisma from "../../prisma/client";
import { Prisma } from "@prisma/client";

// 1. Replace 'any' with a strict type.
// This automatically pulls the right fields from your Prisma schema, minus the ones the DB generates.
type CreateExpenseInput = Omit<
  Prisma.ExpenseUncheckedCreateInput,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export const getAllExpenses = async (userId: number) => {
  return await prisma.expense.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });
};

export const addExpense = async (userId: number, data: CreateExpenseInput) => {
  return await prisma.expense.create({
    data: {
      ...data,
      userId, // Used object shorthand here
    },
  });
};

export const deleteExpense = async (id: number, userId: number) => {
  // 2. Optimization: We only select the userId here, rather than fetching the whole expense record
  const expense = await prisma.expense.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!expense) {
    throw new Error("Expense not found");
  }

  if (expense.userId !== userId) {
    throw new Error("Unauthorized: You do not own this expense");
  }

  return await prisma.expense.delete({
    where: { id },
  });
};
