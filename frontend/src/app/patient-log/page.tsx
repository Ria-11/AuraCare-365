"use client";

import { useState, useEffect } from "react";
import MentalHealthForm from "../components/MentalHealthForm";
import PhysicalHealthForm from "../components/PhysicalHealthForm";
import SocialWellBeingForm from "../components/SocialWellBeingForm";
import HealthTrendChart from "../components/HealthTrendChart";
import { submitHealthLog, fetchHealthLogs } from "../lib/api";
import { getPatientId } from "../lib/auth";

export default function PatientLogPage() {
  const [mental, setMental] = useState({ mood: "", stress: "", anxiety: "" });
  const [physical, setPhysical] = useState({ sleep: "", diet: "", exercise: "" });
  const [social, setSocial] = useState({ interaction: "", loneliness: "" });
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const patientId = getPatientId();

  // 🔹 Fetch logs
  const loadLogs = async () => {
    try {
      const data = await fetchHealthLogs(patientId);
      setLogs(data);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  // 🔹 Sort logs OLD → NEW for charts
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // 🔹 Chart labels
  const labels = sortedLogs.map((log) =>
    new Date(log.date).toLocaleDateString()
  );

  // 🔹 Chart datasets
  const mentalDataset = [
    {
      label: "Mood",
      data: sortedLogs.map((l) => Number(l.mentalHealth?.mood)),
      borderColor: "#2563eb",
      backgroundColor: "rgba(37,99,235,0.2)",
      tension: 0.3,
      fill: true,
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

  // 🔹 Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (
      !mental.mood || !mental.stress || !mental.anxiety ||
      !physical.sleep || !physical.diet || !physical.exercise ||
      !social.interaction || !social.loneliness
    ) {
      setMessage("Please fill all fields");
      return;
    }

    setLoading(true);

    const payload = {
      patientId,
      mentalHealth: mental,
      physicalHealth: physical,
      socialWellBeing: social,
      date: new Date().toISOString(),
    };

    try {
      const res = await submitHealthLog(payload);
      setMessage(res.message || "Submitted successfully!");
      setMental({ mood: "", stress: "", anxiety: "" });
      setPhysical({ sleep: "", diet: "", exercise: "" });
      setSocial({ interaction: "", loneliness: "" });
      await loadLogs();
    } catch (err: any) {
      setMessage(err.message || "Submission failed");
    } finally {
      setLoading(false);
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
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {message && (
          <p className={`mt-2 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </form>

      {/* 🔹 CHARTS */}
      {sortedLogs.length > 0 && (
        <div className="space-y-8 mt-10">
          <HealthTrendChart
            title="Mental Health Trends"
            labels={labels}
            datasets={mentalDataset}
          />
          <HealthTrendChart
            title="Physical Health Trends"
            labels={labels}
            datasets={physicalDataset}
          />
          <HealthTrendChart
            title="Social Well-being Trends"
            labels={labels}
            datasets={socialDataset}
          />
        </div>
      )}

      {/* 🔹 HISTORY TABLE */}
      <h2 className="text-xl font-semibold mt-10">Previous Logs</h2>

      {logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <table className="w-full border mt-2 text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Mood</th>
              <th className="border px-2 py-1">Stress</th>
              <th className="border px-2 py-1">Anxiety</th>
              <th className="border px-2 py-1">Sleep</th>
              <th className="border px-2 py-1">Diet</th>
              <th className="border px-2 py-1">Exercise</th>
              <th className="border px-2 py-1">Interaction</th>
              <th className="border px-2 py-1">Loneliness</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td className="border px-2 py-1">
                  {new Date(log.date).toLocaleDateString()}
                </td>
                <td className="border px-2 py-1">{log.mentalHealth?.mood}</td>
                <td className="border px-2 py-1">{log.mentalHealth?.stress}</td>
                <td className="border px-2 py-1">{log.mentalHealth?.anxiety}</td>
                <td className="border px-2 py-1">{log.physicalHealth?.sleep}</td>
                <td className="border px-2 py-1">{log.physicalHealth?.diet}</td>
                <td className="border px-2 py-1">{log.physicalHealth?.exercise}</td>
                <td className="border px-2 py-1">{log.socialWellBeing?.interaction}</td>
                <td className="border px-2 py-1">{log.socialWellBeing?.loneliness}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
