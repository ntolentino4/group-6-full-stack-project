import prisma from "../../prisma/client";
import type { Expense } from "@shared/types";

export const getAllExpenses = async (clerkId: string) => {
  return await prisma.expense.findMany({
    where: { 
      user: { clerkUserId: clerkId } 
    },
    orderBy: { id: "desc" },
  });
};

// 2. Link the new expense to the specific Clerk User record in Neon
export const createExpense = async (data: Omit<Expense, "id">, clerkId: string) => {
  return await prisma.expense.create({
    data: {
      ...data,
      user: { connect: { clerkUserId: clerkId } } 
    }
  });
};

// 3. Security check: Only allow deletion if the expense belongs to the requester
export const deleteExpense = async (id: number, clerkId: string) => {
  return await prisma.expense.delete({
    where: { 
      id: id,
      user: { clerkUserId: clerkId } 
    }
  });
};