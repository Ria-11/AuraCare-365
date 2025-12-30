import express from "express";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Log from "../models/Log.js"; // Assuming you have a Log model

const router = express.Router();

/**
 * GET doctor dashboard
 * /api/doctors/:doctorId
 */
router.get("/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Find doctor by ID
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Find all patients linked to this doctor
    const doctorPatients = await Patient.find({ _id: { $in: doctor.patients || [] } });

    // Optional: Fetch recent logs for this doctor
    const doctorLogs = await Log.find({ doctor: doctorId })
      .sort({ createdAt: -1 })
      .limit(10); // last 10 logs

    res.json({
      doctor,
      totalPatients: doctorPatients.length,
      patients: doctorPatients,
      recentLogs: doctorLogs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * POST log for doctor
 * /api/doctors/:doctorId/logs
 */
router.post("/:doctorId/logs", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { message, patientId } = req.body;

    // Check doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Optional: check patient exists
    if (patientId) {
      const patient = await Patient.findById(patientId);
      if (!patient) return res.status(404).json({ message: "Patient not found" });
    }

    // Create log
    const log = await Log.create({
      doctor: doctorId,
      patient: patientId || null,
      message,
    });

    res.status(201).json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
