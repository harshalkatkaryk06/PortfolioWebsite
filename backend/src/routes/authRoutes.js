import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/authController.js";
import {contactRateLimiter} from "../middleware/rateLimiter.js";
const router = express.Router();

// ---------------- REGISTER ROUTE ----------------
router.post("/register",contactRateLimiter, registerAdmin);

// ---------------- LOGIN ----------------
router.post("/login",contactRateLimiter, loginAdmin);


export default router;


