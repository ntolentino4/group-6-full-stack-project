import { useEffect, useState } from "react";
import type { FilterPreset } from "../../../../shared/types";
import {
  getAllPresets,
  addPreset as serviceAddPreset,
  deletePreset,
} from "../services/filterPresetService";

export function useFilterPresets() {
  const [presets, setPresets] = useState<FilterPreset[]>([]);

  const refreshPresets = async () => {
    const next = await getAllPresets();
    setPresets(next);
  };

  useEffect(() => {
    void refreshPresets();
  }, []);

  const addPreset = async (preset: Omit<FilterPreset, "id">) => {
    await serviceAddPreset(preset);
    await refreshPresets();
  };

  const removePreset = async (id: number) => {
    await deletePreset(id);
    await refreshPresets();
  };

  return { presets, addPreset, removePreset };
}
