import type { FilterPreset } from "../../../../shared/types";
import { mockFilterPresets } from "../data/mockFilterPresets";

let presets: FilterPreset[] = [...mockFilterPresets];

export function getAll(): FilterPreset[] {
  return presets;
}

export function add(preset: Omit<FilterPreset, "id">): FilterPreset {
  const newPreset: FilterPreset = { ...preset, id: Date.now() };
  presets = [newPreset, ...presets];
  return newPreset;
}

export function deletePreset(id: number): void {
  presets = presets.filter((p) => p.id !== id);
}
