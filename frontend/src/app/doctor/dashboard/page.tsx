"use client";

import { useEffect, useState } from "react";
import { fetchHealthLogs, getHealthInsight } from "../../lib/api";
import HealthTrendChart from "../../components/HealthTrendChart";

type Patient = {
  id: string;
  name: string;
};

export default function DoctorDashboard() {
  // 🔹 Hardcoded patients for MVP demo
  const patients: Patient[] = [
    { id: "P1", name: "John Doe" },
    { id: "P2", name: "Jane Smith" },
  ];

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [riskLevel, setRiskLevel] = useState("");
  const [insights, setInsights] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState("");

  // 🔹 Load patient logs
  const loadPatientLogs = async (patientId: string) => {
    try {
      const data = await fetchHealthLogs(patientId);
      setLogs(data || []);
    } catch (err) {
      console.error("Failed to load logs", err);
    }
  };

  // 🔹 AI Analysis
  const runAIAnalysis = async () => {
    if (logs.length === 0) return;

    setAiLoading(true);
    setInsights([]);
    setRiskLevel("");
    setRecommendation("");

    try {
      const res = await getHealthInsight({ logs });
      setRiskLevel(res.riskLevel);
      setInsights(res.insights || []);
      setRecommendation(res.recommendation || "");
    } catch {
      setInsights(["AI analysis failed"]);
    } finally {
      setAiLoading(false);
    }
  };

  // 🔹 Prepare chart data
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const labels = sortedLogs.map((l) =>
    new Date(l.date).toLocaleDateString()
  );

  const mentalDataset = [
    {
      label: "Mood",
      data: sortedLogs.map((l) => Number(l.mentalHealth?.mood)),
      borderColor: "#2563eb",
      tension: 0.3,
    },
    {
      label: "Stress",
      data: sortedLogs.map((l) => Number(l.mentalHealth?.stress)),
      borderColor: "#dc2626",
      tension: 0.3,
    },
    {
      label: "Anxiety",
      data: sortedLogs.map((l) => Number(l.mentalHealth?.anxiety)),
      borderColor: "#ea580c",
      tension: 0.3,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Doctor Dashboard</h1>

      {/* PATIENT LIST */}
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-semibold mb-2">Patients</h2>
        <div className="flex gap-3">
          {patients.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPatient(p);
                loadPatientLogs(p.id);
              }}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* SELECTED PATIENT */}
      {selectedPatient && (
        <>
          <h2 className="text-xl font-semibold">
            Patient: {selectedPatient.name}
          </h2>

          {/* AI ANALYSIS */}
          <button
            onClick={runAIAnalysis}
            disabled={aiLoading || logs.length === 0}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            {aiLoading ? "Analyzing..." : "Run AI Health Analysis"}
          </button>

          {insights.length > 0 && (
            <div className="bg-purple-50 border border-purple-300 p-4 rounded mt-4">
              <h3 className="font-semibold text-purple-700">
                AI Health Assessment
              </h3>

              {riskLevel && (
                <p>
                  <strong>Risk Level:</strong> {riskLevel}
                </p>
              )}

              <ul className="list-disc pl-5 text-sm">
                {insights.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>

              {recommendation && (
                <p className="text-sm mt-2">
                  <strong>Recommendation:</strong> {recommendation}
                </p>
              )}
            </div>
          )}

          {/* CHART */}
          {sortedLogs.length > 0 && (
            <div className="mt-6">
              <HealthTrendChart
                title="Mental Health Trends"
                labels={labels}
                datasets={mentalDataset}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
