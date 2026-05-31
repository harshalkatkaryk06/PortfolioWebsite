import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    coreCompetencies: {
      type: [String],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);