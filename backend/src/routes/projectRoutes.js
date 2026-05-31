import express from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getProjectById
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProjects);

router.post("/", protect, createProject);
router.get("/:id", getProjectById);


router.put("/:id", protect, updateProject);

router.delete("/:id", protect, deleteProject);

export default router;