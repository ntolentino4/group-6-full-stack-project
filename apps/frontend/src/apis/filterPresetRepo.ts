import type { FilterPreset } from "../../../../shared/types";

const API_BASE_URL = "http://localhost:3000/api/filter-presets";

export async function getAll(): Promise<FilterPreset[]> {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error("Failed to load presets");
  return response.json();
}

export async function add(
  preset: Omit<FilterPreset, "id">
): Promise<FilterPreset> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(preset),
  });
  if (!response.ok) throw new Error("Failed to save preset");
  return response.json();
}

export async function deletePreset(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete preset");
}
