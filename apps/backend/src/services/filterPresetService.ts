import prisma from "../../prisma/client";

export const getAllFilterPresets = async (userId: number) => {
  return await prisma.filterPreset.findMany({
    where: { userId },
    orderBy: { id: "desc" },
  });
};

export const createFilterPreset = async (data: any) => {
  // Explicitly map the fields to satisfy Prisma's type checker
  return await prisma.filterPreset.create({
    data: {
      name: data.name,
      selectedCategories: data.selectedCategories,
      userId: data.userId, // <-- This is the crucial field Prisma was looking for
    },
  });
};

export const deleteFilterPresetById = async (id: number, userId: number) => {
  const preset = await prisma.filterPreset.findUnique({ where: { id } });
  if (!preset) throw new Error("Preset not found");
  if (preset.userId !== userId) throw new Error("Unauthorized");

  return await prisma.filterPreset.delete({ where: { id } });
};
