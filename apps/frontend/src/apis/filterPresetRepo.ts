import { fetchWithAuth } from "./apiClient";
import type { FilterPreset } from "../../../../shared/types";

export async function getAll(token: string): Promise<FilterPreset[]> {
  return await fetchWithAuth("/presets", { method: "GET" }, token);
}

export async function add(
  preset: Omit<FilterPreset, "id">,
  token: string,
): Promise<FilterPreset> {
  return await fetchWithAuth(
    "/presets",
    {
      method: "POST",
      body: JSON.stringify(preset),
    },
    token,
  );
}

export async function deletePreset(id: number, token: string): Promise<void> {
  await fetchWithAuth(`/presets/${id}`, { method: "DELETE" }, token);
}
