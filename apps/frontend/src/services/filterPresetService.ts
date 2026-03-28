import type { FilterPreset } from "../../../../shared/types";
import * as filterPresetRepo from "../apis/filterPresetRepo";

export async function getAllPresets(): Promise<FilterPreset[]> {
  return await filterPresetRepo.getAll();
}

export async function addPreset(
  preset: Omit<FilterPreset, "id">
): Promise<FilterPreset> {
  return await filterPresetRepo.add(preset);
}
export async function deletePreset(id: number): Promise<void> {
  await filterPresetRepo.deletePreset(id);
}

