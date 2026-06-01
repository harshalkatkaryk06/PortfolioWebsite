import express from "express";

import {
  getAllEnquiries,
  markEnquiryRead,
  markEnquiryUnread,
  deleteEnquiry,
} from "../controllers/enquiryController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ALL ENQUIRY MANAGEMENT REQUIRES AUTH

router.get("/", protect, getAllEnquiries);

router.patch("/:id/read", protect, markEnquiryRead);

router.patch("/:id/unread", protect, markEnquiryUnread);

router.delete("/:id", protect, deleteEnquiry);

export default router;