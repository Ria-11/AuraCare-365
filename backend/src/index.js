import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AuraCare 365 Backend Running");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "AuraCare 365" });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ AuraCare backend running on http://localhost:${PORT}`);
});
