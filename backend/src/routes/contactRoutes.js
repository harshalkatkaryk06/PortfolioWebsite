import express from "express";

import { sendContactMail } from "../controllers/contactController.js";

import { contactRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post(
  "/",
  contactRateLimiter,
  sendContactMail
);

export default router;