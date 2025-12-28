import express from "express";
import logsRouter from "./routes/logs.js";
import patientRoutes from "./routes/patientRoutes.js";


console.log("🔥 INDEX.JS FILE LOADED");

const app = express();
app.use(express.json());

// mount logs router
app.use("/api/logs", logsRouter);
app.use("/api/patients", patientRoutes);


// sanity check
app.get("/api/test", (req, res) => {
  res.json({ message: "TEST ROUTE WORKING" });
});

app.listen(5000, () => {
  console.log("🚀 SERVER STARTED ON 5000");
});
