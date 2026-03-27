import prisma from "../../prisma/client";
import type { Expense } from "@shared/types";

export const getAllExpenses = async () => {
  return await prisma.expense.findMany({
    orderBy: { id: "desc" }, 
  });
};

export const createExpense = async (data: Omit<Expense, "id">) => {
  return await prisma.expense.create({ data });
};

export const deleteExpense = async (id: number) => {
  return await prisma.expense.delete({ where: { id } });
};