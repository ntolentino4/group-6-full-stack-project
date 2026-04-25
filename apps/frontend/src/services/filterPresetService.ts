import type { FilterPreset } from "../../../../shared/types";
import * as filterPresetRepo from "../apis/filterPresetRepo";

export async function getAllPresets(token: string): Promise<FilterPreset[]> {
  return await filterPresetRepo.getAll(token);
}

export async function addPreset(
  preset: Omit<FilterPreset, "id">,
  token: string,
): Promise<FilterPreset> {
  return await filterPresetRepo.add(preset, token);
}

export async function deletePreset(id: number, token: string): Promise<void> {
  await filterPresetRepo.deletePreset(id, token);
}
