import express from "express";
import { patients } from "../data/patients.js";

const router = express.Router();

// GET all patients
router.get("/", (req, res) => {
  res.json(patients);
});

// GET patient by ID
router.get("/:id", (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }
  res.json(patient);
});

export default router;
