import prisma from "../../prisma/client";

export async function getAllFilterPresets() {
  return prisma.filterPreset.findMany({
    orderBy: { id: "desc" },
  });
}

export async function createFilterPreset(data: {
  name: string;
  selectedCategories: string[];
}) {
  return prisma.filterPreset.create({ data });
}

export async function deleteFilterPresetById(id: number) {
  await prisma.filterPreset.delete({
    where: { id },
  });
}
