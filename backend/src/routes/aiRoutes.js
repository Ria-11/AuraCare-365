import express from "express";

const router = express.Router();

router.post("/health-insight", (req, res) => {
  console.log("✅ AI ROUTE HIT");
  console.log("REQ BODY:", req.body);

  if (!req.body || !req.body.text) {
    return res.status(400).json({ error: "text field missing" });
  }

  res.json({
    insight: "AI service placeholder response",
    receivedText: req.body.text,
  });
});

export default router;
