import type { FilterPreset } from "../../../../shared/types";

export const mockFilterPresets: FilterPreset[] = [
  { id: 1, name: "Food & Shopping", selectedCategories: ["Food", "Shopping"] },
  { id: 2, name: "Essentials", selectedCategories: ["Food", "Transport", "Housing"] },
  { id: 3, name: "Fun spending", selectedCategories: ["Entertainment", "Shopping"] },
  { id: 4, name: "All categories", selectedCategories: ["Food", "Transport", "Housing", "Entertainment", "Shopping", "Health"] },
  { id: 5, name: "Health & Food", selectedCategories: ["Health", "Food"] },
  { id: 6, name: "Shopping & Entertainment", selectedCategories: ["Shopping", "Entertainment"] },
];
