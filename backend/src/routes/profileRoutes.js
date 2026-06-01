import express from "express";
import { upsertProfile, getProfile, deleteProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// create or update profile (protected)
router.post("/", protect, upsertProfile);
router.delete("/", protect, deleteProfile);

// public read
router.get("/", getProfile);



export default router;