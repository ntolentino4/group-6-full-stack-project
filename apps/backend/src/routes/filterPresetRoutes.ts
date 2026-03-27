import { Router } from "express";
import {
  deleteFilterPreset,
  getFilterPresets,
  postFilterPreset,
} from "../controllers/filterPresetController";
import { validateFilterPresetBody } from "../validateFilterPresetBody";

const filterPresetRoutes = Router();

filterPresetRoutes.get("/", getFilterPresets);
filterPresetRoutes.post("/", validateFilterPresetBody, postFilterPreset);
filterPresetRoutes.delete("/:id", deleteFilterPreset);

export default filterPresetRoutes;
