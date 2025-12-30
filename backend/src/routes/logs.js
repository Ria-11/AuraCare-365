import express from "express";
import patients from "../data/patients.js";
import logs from "../data/logs.js"; // ✅ single source

const router = express.Router();

// 🔹 GET logs for a patient (ONLY if patient exists)
router.get("/:patientId", (req, res) => {
  const { patientId } = req.params;

  const patientExists = patients.find(p => p.id === patientId);
  if (!patientExists) {
    return res.status(404).json({ error: "Patient not found" });
  }

  const patientLogs = logs.filter(log => log.patientId === patientId);

  res.json({
    patient: patientExists,
    logs: patientLogs
  });
});

// 🔹 POST new log (ONLY for valid patient)
router.post("/:patientId", (req, res) => {
  const { patientId } = req.params;
  const { date, physical, mental, social } = req.body;

  const patientExists = patients.find(p => p.id === patientId);
  if (!patientExists) {
    return res.status(404).json({ error: "Patient not found" });
  }

  const newLog = { patientId, date, physical, mental, social };
  logs.push(newLog); // MVP memory push

  res.status(201).json({
    message: "Daily health log added",
    log: newLog
  });
});

export default router;
