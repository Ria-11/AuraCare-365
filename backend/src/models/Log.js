import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", logSchema);
export default Log;
