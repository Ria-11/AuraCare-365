import express from "express";
import HealthLog from "../models/HealthLog.js";

const router = express.Router();

/**
 * POST: Submit daily health log
 * /api/health-logs
 */
router.post("/", async (req, res) => {
  try {
    const log = await HealthLog.create(req.body);
    res.status(201).json({ message: "Health log saved", log });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET: Fetch logs for a patient
 * /api/health-logs/:patientId
 */
router.get("/:patientId", async (req, res) => {
  try {
    const logs = await HealthLog.find({
      patientId: req.params.patientId,
    }).sort({ date: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
