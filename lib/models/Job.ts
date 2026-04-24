import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  budget: { type: Number, required: true },
  deadline: { type: String, required: true },
  category: { type: String, required: true },
  reputation: { type: Number, default: 0 },
  description: { type: String, required: true },
  postedDate: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Open", "In Progress", "Completed", "Disputed"], 
    default: "Open" 
  },
  bidCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
