// apps/backend/src/routes/webhook.ts
import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import { Webhook } from "svix";
import prisma from "../../prisma/client";

const router = Router();

router.post(
  "/clerk",
  // CRITICAL: We must use raw parsing specifically for this route
  bodyParser.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      console.error("Missing CLERK_WEBHOOK_SECRET in .env");
      return res.status(500).send("Server configuration error");
    }

    // 1. Extract the Svix security headers
    const svix_id = req.headers["svix-id"] as string;
    const svix_timestamp = req.headers["svix-timestamp"] as string;
    const svix_signature = req.headers["svix-signature"] as string;

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).send("Missing Svix headers");
    }

    // 2. Verify the payload signature
    const payload = req.body;
    const body = payload.toString();
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: any;
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return res.status(400).send("Invalid signature");
    }

    // 3. Process the 'user.created' event and save to Prisma
    if (evt.type === "user.created") {
      const { id, email_addresses } = evt.data;
      const primaryEmail = email_addresses?.[0]?.email_address;

      try {
        await prisma.user.create({
          data: {
            clerkUserId: id,
            email: primaryEmail,
          },
        });
        console.log(`Success: Synced new user ${id} to Prisma`);
      } catch (error) {
        console.error("Error saving user to Prisma:", error);
        return res.status(500).send("Database error");
      }
    }

    return res.status(200).json({ success: true });
  },
);

export default router;
