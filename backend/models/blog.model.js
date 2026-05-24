import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true, trim: true },
    paragraphs: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one paragraph is required",
      },
    },
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    sections: {
      type: [sectionSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one section is required",
      },
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);