import { useState } from "react";
import type { FilterPreset } from "../types";
import {
  getAllPresets,
  addPreset as serviceAddPreset,
  deletePreset,
} from "../services/filterPresetService";

export function useFilterPresets() {
  const [presets, setPresets] = useState<FilterPreset[]>(() =>
    getAllPresets()
  );

  const addPreset = (preset: Omit<FilterPreset, "id">) => {
    serviceAddPreset(preset);
    setPresets(getAllPresets());
  };

  const removePreset = (id: number) => {
    deletePreset(id);
    setPresets(getAllPresets());
  };

  return { presets, addPreset, removePreset };
}
