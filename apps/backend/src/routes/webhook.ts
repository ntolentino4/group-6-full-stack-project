import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import { Webhook } from "svix";
import prisma from "../../prisma/client";

const router = Router();

router.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) return res.status(500).send("Configuration error");

    const payload = req.body.toString();
    const headers = {
      "svix-id": req.headers["svix-id"] as string,
      "svix-timestamp": req.headers["svix-timestamp"] as string,
      "svix-signature": req.headers["svix-signature"] as string,
    };

    try {
      const wh = new Webhook(secret);
      const evt: any = wh.verify(payload, headers);

      if (evt.type === "user.created") {
        await prisma.user.create({
          data: {
            clerkUserId: evt.data.id,
            email: evt.data.email_addresses[0].email_address,
          },
        });
      }
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).send("Invalid signature");
    }
  },
);

export default router;
