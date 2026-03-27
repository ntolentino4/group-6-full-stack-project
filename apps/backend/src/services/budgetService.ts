import prisma from "../../prisma/client";

export const getBudgets = async () => {
  return await prisma.budgetGoal.findMany({ include: { category: true } });
};

export const createBudget = async (data: any) => {
  return await prisma.budgetGoal.create({
    data: {
      limit: data.limit,
      category: { connect: { name: data.category } },
    },
    include: { category: true },
  });
};

export const deleteBudget = async (id: number) => {
  return await prisma.budgetGoal.delete({ where: { id } });
};
