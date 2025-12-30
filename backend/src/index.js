import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import logsRouter from "./routes/logs.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

dotenv.config();

console.log("🔥 INDEX.JS FILE LOADED");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/logs", logsRouter);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);

// Sanity check
app.get("/api/test", (req, res) => {
  res.json({ message: "TEST ROUTE WORKING" });
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit process with failure
  }
};

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 SERVER STARTED ON PORT ${PORT}`);
});
