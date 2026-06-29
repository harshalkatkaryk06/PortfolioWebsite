import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// routes
import authRoutes from "./src/routes/authRoutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";
import skillRoutes from "./src/routes/skillRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import enquiryRoutes from "./src/routes/enquiryRoutes.js";

dotenv.config();

const app = express();

// 1. ES modules don't give us __dirname automatically, so we rebuild it
//    from this file's own URL.
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath);

// 2. The compiled frontend lives one folder up from backend, inside frontend/dist.
const frontendDistPath = path.join(currentDirPath, "../frontend/dist");

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// STATIC FILES (uploaded images etc.)
app.use("/uploads", express.static("uploads"));

// 3. Serve the built React app's JS, CSS, and image files.
app.use(express.static(frontendDistPath));

// ---------------- CORS ----------------
const allowedOrigins = [
  process.env.DEV_FRONTEND_URI,
  process.env.PROD_FRONTEND_URI,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

// ---------------- API ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.get("/ping", (req, res) => {
  res.status(200).send("OK");
});

// 4. CATCH-ALL: anything that wasn't matched by an /api route or a static
//    file above is treated as a frontend route (e.g. /admin/dashboard),
//    so we hand back index.html and let React Router take over.
//    This must stay the LAST app.use call.
app.use((req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// ---------------- START SERVER ----------------
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("DB Connection Error:", error.message);
  }
};

startServer();
