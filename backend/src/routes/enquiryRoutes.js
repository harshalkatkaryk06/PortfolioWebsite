import express from "express";

import {
  getAllEnquiries,
  markEnquiryRead,
  deleteEnquiry,
  markEnquiryUnread
} from "../controllers/enquiryController.js";

const router = express.Router();

router.get("/", getAllEnquiries);

router.patch("/:id/read", markEnquiryRead);

router.delete("/:id", deleteEnquiry);

router.patch("/:id/unread", markEnquiryUnread);

export default router;