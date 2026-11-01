import mongoose from "mongoose";

const AllotmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    delegation: { type: String, required: true, trim: true },
    committee: { type: String, required: true, trim: true },
    country: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["confirmed", "pending", "waitlisted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

AllotmentSchema.index({ name: "text", delegation: "text", committee: "text", country: "text" });

export default mongoose.models.Allotment || mongoose.model("Allotment", AllotmentSchema);
