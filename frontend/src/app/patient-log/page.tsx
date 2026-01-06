"use client";

import { useState, useEffect } from "react";
import {
  submitHealthLog,
  fetchHealthLogs,
  getHealthInsight,
} from "../lib/api";
import { getPatientId } from "../lib/auth";

import MentalHealthForm from "../components/MentalHealthForm";
import PhysicalHealthForm from "../components/PhysicalHealthForm";
import SocialWellBeingForm from "../components/SocialWellBeingForm";
import HealthTrendChart from "../components/HealthTrendChart";

export default function PatientLogPage() {
  const patientId = getPatientId();

  const [mental, setMental] = useState({ mood: "", stress: "", anxiety: "" });
  const [physical, setPhysical] = useState({ sleep: "", diet: "", exercise: "" });
  const [social, setSocial] = useState({ interaction: "", loneliness: "" });

  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 AI states
  const [insights, setInsights] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  // 🔹 Load logs
  const loadLogs = async () => {
    try {
      const data = await fetchHealthLogs(patientId);
      setLogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  // 🔹 Sorted logs
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

  const physicalDataset = [
    {
      label: "Sleep",
      data: sortedLogs.map((l) => Number(l.physicalHealth?.sleep)),
      borderColor: "#16a34a",
      tension: 0.3,
    },
    {
      label: "Exercise",
      data: sortedLogs.map((l) => Number(l.physicalHealth?.exercise)),
      borderColor: "#7c3aed",
      tension: 0.3,
    },
  ];

  const socialDataset = [
    {
      label: "Loneliness",
      data: sortedLogs.map((l) => Number(l.socialWellBeing?.loneliness)),
      borderColor: "#92400e",
      tension: 0.3,
    },
  ];

  // 🔹 Submit health log
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (
      !mental.mood ||
      !mental.stress ||
      !mental.anxiety ||
      !physical.sleep ||
      !physical.diet ||
      !physical.exercise ||
      !social.interaction ||
      !social.loneliness
    ) {
      setMessage("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await submitHealthLog({
        patientId,
        mentalHealth: mental,
        physicalHealth: physical,
        socialWellBeing: social,
        date: new Date().toISOString(),
      });

      setMessage("Submitted successfully!");
      setMental({ mood: "", stress: "", anxiety: "" });
      setPhysical({ sleep: "", diet: "", exercise: "" });
      setSocial({ interaction: "", loneliness: "" });

      await loadLogs();
    } catch (err: any) {
      setMessage("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 AI Insight handler
  const handleGetInsights = async () => {
    setAiLoading(true);
    setInsights([]);

    try {
      const res = await getHealthInsight({
        patientId,
        mentalHealth: mental,
        physicalHealth: physical,
        socialWellBeing: social,
      });

      setInsights(res.insights || []);
    } catch (err) {
      setInsights(["Failed to generate insights"]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Daily Health Log</h1>

      {/* 🔹 FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <MentalHealthForm mental={mental} setMental={setMental} />
        <PhysicalHealthForm physical={physical} setPhysical={setPhysical} />
        <SocialWellBeingForm social={social} setSocial={setSocial} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        <button
          type="button"
          onClick={handleGetInsights}
          className="bg-purple-600 text-white px-4 py-2 rounded ml-2"
          disabled={aiLoading}
        >
          {aiLoading ? "Analyzing..." : "Get AI Insights"}
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>

      {/* 🔹 AI INSIGHTS */}
      {insights.length > 0 && (
        <div className="bg-purple-50 border border-purple-300 p-4 rounded">
          <h2 className="font-semibold text-purple-700">AI Health Insights</h2>
          <ul className="list-disc pl-5 mt-2 text-sm">
            {insights.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 🔹 CHARTS */}
      {sortedLogs.length > 0 && (
        <div className="space-y-8">
          <HealthTrendChart title="Mental Health Trends" labels={labels} datasets={mentalDataset} />
          <HealthTrendChart title="Physical Health Trends" labels={labels} datasets={physicalDataset} />
          <HealthTrendChart title="Social Well-being Trends" labels={labels} datasets={socialDataset} />
        </div>
      )}
    </div>
  );
}
