type Patient = {
  id: number;
  name: string;
  physical: number;
  mental: number;
  social: number;
};

const patients: Patient[] = [
  { id: 1, name: "Patient A", physical: 240, mental: 180, social: 90 },
  { id: 2, name: "Patient B", physical: 120, mental: 60, social: 40 },
  { id: 3, name: "Patient C", physical: 300, mental: 290, social: 260 },
];

function riskLabel(p: Patient) {
  const avg = (p.physical + p.mental + p.social) / 3;
  if (avg < 100) return "High Risk";
  if (avg < 200) return "Medium Risk";
  return "Low Risk";
}

export default function DoctorDashboard() {
  return (
    <main className="min-h-screen bg-gray-200 p-10">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Doctor Dashboard
        </h1>

        <p className="text-gray-700 mb-6">
          Patient well-being overview (365-day activity summary)
        </p>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border">
              <th className="p-3 border text-left text-gray-900">Patient</th>
              <th className="p-3 border text-gray-900">Physical</th>
              <th className="p-3 border text-gray-900">Mental</th>
              <th className="p-3 border text-gray-900">Social</th>
              <th className="p-3 border text-gray-900">Risk</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border hover:bg-gray-50">
                <td className="p-3 border font-semibold text-gray-900">
                  {p.name}
                </td>
                <td className="p-3 border text-gray-800">{p.physical}/365</td>
                <td className="p-3 border text-gray-800">{p.mental}/365</td>
                <td className="p-3 border text-gray-800">{p.social}/365</td>
                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      riskLabel(p) === "High Risk"
                        ? "bg-red-200 text-red-800"
                        : riskLabel(p) === "Medium Risk"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {riskLabel(p)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
