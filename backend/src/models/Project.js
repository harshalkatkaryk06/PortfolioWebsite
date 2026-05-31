import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    tech: [
      {
        type: String,
        trim: true
      }
    ],

    status: {
      type: String,
      required: true,
      trim: true,
      default: "In Progress"
    },

    liveLink: {
      type: String,
      default: ""
    },

    codeLink: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);