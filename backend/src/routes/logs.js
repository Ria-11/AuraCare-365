import express from "express";
const router = express.Router();

let logs = [
  {
    patientId: "1",
    date: "2025-12-01",
    physical: 3,
    mental: 2,
    social: 4
  }
];

router.get("/:patientId", (req, res) => {
  const { patientId } = req.params;
  const patientLogs = logs.filter(l => l.patientId === patientId);
  res.json(patientLogs);
});

router.post("/:patientId", (req, res) => {
  const { patientId } = req.params;
  const { date, physical, mental, social } = req.body;

  const newLog = { patientId, date, physical, mental, social };
  logs.push(newLog);

  res.status(201).json({
    message: "Log added",
    log: newLog
  });
});

export default router;
