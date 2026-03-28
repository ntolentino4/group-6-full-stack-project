import { Request, Response } from "express";
import {
  createFilterPreset,
  deleteFilterPresetById,
  getAllFilterPresets,
} from "../services/filterPresetService";

export async function getFilterPresets(_req: Request, res: Response) {
  const presets = await getAllFilterPresets();
  return res.json(presets);
}

export async function postFilterPreset(req: Request, res: Response) {
  const { name, selectedCategories } = req.body as {
    name: string;
    selectedCategories: string[];
  };

  const created = await createFilterPreset({
    name,
    selectedCategories,
  });

  return res.status(201).json(created);
}

export async function deleteFilterPreset(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  await deleteFilterPresetById(id);
  return res.status(204).send();
}
