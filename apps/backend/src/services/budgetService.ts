import prisma from "../../prisma/client";

export const getUserBudgetSummary = async (clerkId: string) => {
  // 1. Fetch this user's personal budget limits [cite: 10-12]
  const userBudgets = await prisma.budgetGoal.findMany({
    where: { user: { clerkUserId: clerkId } },
    include: { category: true },
  });

  // 2. Fetch this user's expenses for calculation [cite: 19-22]
  const expensesByCategory = await prisma.expense.groupBy({
    by: ["category"],
    where: { user: { clerkUserId: clerkId } },
    _sum: { amount: true },
  });

  // 3. Merge data for the summary [cite: 29-40]
  return userBudgets.map((budget) => {
    const spentMatch = expensesByCategory.find(
      (e) => e.category === budget.category.name,
    );
    const totalSpent = spentMatch?._sum.amount || 0;
    return {
      categoryId: budget.category.id,
      categoryName: budget.category.name,
      limit: budget.limit,
      spent: totalSpent,
      remaining: budget.limit - totalSpent,
    };
  });
};

export const createNewBudgetGoal = async (
  clerkId: string,
  limitAmount: number,
  catId: number,
) => {
  const newBudget = await prisma.budgetGoal.create({
    data: {
      limit: limitAmount,
      category: {
        connect: { id: catId },
      },
      user: {
        connect: { clerkUserId: clerkId },
      },
    },
  });

  return newBudget;
};
