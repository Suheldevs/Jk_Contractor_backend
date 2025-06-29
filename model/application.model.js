import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
  },
  position: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
  },
  resume: {
    type: String, 
    required: true,
  },
  cover_letter: {
    type: String,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

const Application= mongoose.model("Application", applicationSchema);

export default Application
