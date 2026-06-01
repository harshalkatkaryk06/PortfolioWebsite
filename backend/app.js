import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// routes
import authRoutes from "./src/routes/authRoutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";
import skillRoutes from "./src/routes/skillRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import enquiryRoutes from "./src/routes/enquiryRoutes.js";

dotenv.config();

const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// COOKIE PARSER
app.use(cookieParser());

// STATIC FILES
app.use("/uploads", express.static("uploads"));

// ---------------- CORS ----------------
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_FRONTEND_URI
    : process.env.DEV_FRONTEND_URI;

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// ---------------- ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/enquiries", enquiryRoutes);

// ---------------- HEALTH CHECK ----------------
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
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