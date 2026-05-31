import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    role: String,
    heading: String,
    description: String,
    image: String, // we will store URL (not file yet)
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);