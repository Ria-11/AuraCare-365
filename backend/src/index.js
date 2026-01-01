import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import logsRouter from "./routes/logs.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import healthLogs from "./routes/healthLogs.js";




dotenv.config();

console.log("🔥 INDEX.JS FILE LOADED");

// Connect DB ONCE
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/logs", logsRouter);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/health-logs", healthLogs);

// Sanity check
app.get("/api/test", (req, res) => {
  res.json({ message: "TEST ROUTE WORKING" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 SERVER STARTED ON PORT ${PORT}`);
});
