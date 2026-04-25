import prisma from "../../prisma/client";

export const getBudgets = async (userId: number) => {
  return await prisma.budgetGoal.findMany({
    where: { userId },
    include: { category: true },
  });
};

export const createBudget = async (data: any) => {
  return await prisma.budgetGoal.create({ data, include: { category: true } });
};

export const deleteBudget = async (id: number, userId: number) => {
  const budget = await prisma.budgetGoal.findUnique({ where: { id } });
  if (!budget) throw new Error("Budget not found");
  if (budget.userId !== userId) throw new Error("Unauthorized");
  return await prisma.budgetGoal.delete({ where: { id } });
};
