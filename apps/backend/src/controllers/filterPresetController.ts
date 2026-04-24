import { Request, Response } from "express";
import * as presetService from "../services/filterPresetService";
import prisma from "../../prisma/client";

// Extends standard Request to recognize Clerk's auth object
interface AuthRequest extends Request {
  auth?: { userId: string };
}

export const getFilterPresets = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId: req.auth?.userId },
    });
    if (!user) return res.status(404).json({ error: "User not synced" });

    // Passing user.id fixes Error TS2554 (Expected 1 arguments, but got 0)
    res.status(200).json(await presetService.getAllFilterPresets(user.id));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch presets" });
  }
};

export const postFilterPreset = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId: req.auth?.userId },
    });
    if (!user) return res.status(404).json({ error: "User not synced" });

    res
      .status(201)
      .json(
        await presetService.createFilterPreset({
          ...req.body,
          userId: user.id,
        }),
      );
  } catch (error) {
    res.status(500).json({ error: "Failed to create preset" });
  }
};

export const deleteFilterPreset = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId: req.auth?.userId },
    });
    if (!user) return res.status(404).json({ error: "User not synced" });

    // Passing user.id fixes Error TS2554 (Expected 2 arguments, but got 1)
    await presetService.deleteFilterPresetById(
      parseInt(req.params.id as string),
      user.id,
    );
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete preset" });
  }
};
