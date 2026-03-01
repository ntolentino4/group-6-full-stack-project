import type { FilterPreset } from "../types";
import * as filterPresetRepo from "../apis/filterPresetRepo";

export function getAllPresets(): FilterPreset[] {
  return filterPresetRepo.getAll();
}

export function addPreset(preset: Omit<FilterPreset, "id">): FilterPreset {
  return filterPresetRepo.add(preset);
}

export function deletePreset(id: number): void {
  filterPresetRepo.deletePreset(id);
}
