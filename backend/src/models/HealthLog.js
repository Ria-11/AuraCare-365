import mongoose from "mongoose";

const healthLogSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true },

    mentalHealth: {
      mood: { type: Number, required: true },
      stress: { type: Number, required: true },
      anxiety: { type: Number, required: true },
    },

    physicalHealth: {
      sleep: { type: Number, required: true },
      diet: { type: Number, required: true },
      exercise: { type: Number, required: true },
    },

    socialWellBeing: {
      interaction: { type: Number, required: true },
      loneliness: { type: Number, required: true },
    },

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const HealthLog = mongoose.model("HealthLog", healthLogSchema);

export default HealthLog;
