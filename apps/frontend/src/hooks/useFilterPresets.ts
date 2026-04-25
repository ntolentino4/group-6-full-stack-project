import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import type { FilterPreset } from "../../../../shared/types";
import {
  getAllPresets,
  addPreset as serviceAddPreset,
  deletePreset,
} from "../services/filterPresetService";

export function useFilterPresets() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [presets, setPresets] = useState<FilterPreset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshPresets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) {
        setPresets([]);
        return;
      }
      const next = await getAllPresets(token);
      setPresets(next);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load presets.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      setPresets([]);
      setLoading(false);
      setError(null);
      return;
    }

    void refreshPresets();
  }, [isLoaded, isSignedIn, refreshPresets]);

  const addPreset = async (
    preset: Omit<FilterPreset, "id">,
  ): Promise<boolean> => {
    try {
      const token = await getToken();
      if (!token) throw new Error("Unauthorized");

      await serviceAddPreset(preset, token);
      await refreshPresets();
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save preset.";
      setError(message);
      return false;
    }
  };

  const removePreset = async (id: number): Promise<boolean> => {
    try {
      const token = await getToken();
      if (!token) throw new Error("Unauthorized");

      await deletePreset(id, token);
      await refreshPresets();
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete preset.";
      setError(message);
      return false;
    }
  };

  return { presets, addPreset, removePreset, loading, error };
}
