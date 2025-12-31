import mongoose from "mongoose";

const healthLogSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
    },

    mental: {
      mood: Number,
      stress: Number,
      anxiety: Number,
    },

    physical: {
      sleepHours: Number,
      exerciseMinutes: Number,
      dietQuality: Number,
    },

    social: {
      interactionLevel: Number,
      lonelinessLevel: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("HealthLog", healthLogSchema);
