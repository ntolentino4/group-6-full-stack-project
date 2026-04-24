import prisma from "../../prisma/client"; // Corrected path

export const getAllExpenses = async (userId: number) => {
  return await prisma.expense.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });
};

export const addExpense = async (userId: number, data: any) => {
  return await prisma.expense.create({
    data: {
      ...data,
      userId: userId,
    },
  });
};

export const deleteExpense = async (id: number, userId: number) => {
  const expense = await prisma.expense.findUnique({ where: { id } });
  
  if (!expense) throw new Error("Expense not found");
  if (expense.userId !== userId) throw new Error("Unauthorized");

  return await prisma.expense.delete({ where: { id } });
};