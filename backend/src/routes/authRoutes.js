import express from "express";
import { registerAdmin, loginAdmin,logoutAdmin, getCurrentAdmin,resetPassword, forgotPassword } from "../controllers/authController.js";
import {contactRateLimiter} from "../middleware/rateLimiter.js";
const router = express.Router();

// ---------------- REGISTER ROUTE ----------------
router.post("/register",contactRateLimiter, registerAdmin);

// ---------------- LOGIN ----------------
router.post("/login", contactRateLimiter, loginAdmin);
router.get("/me", getCurrentAdmin);
router.post("/logout", logoutAdmin);
router.post(
  "/forgot-password",
  // contactRateLimiter,
  forgotPassword
);

router.post(
  "/reset-password/:token",
  // contactRateLimiter,
  resetPassword
);
export default router;


