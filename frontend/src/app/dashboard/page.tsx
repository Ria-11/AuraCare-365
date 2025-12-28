function HeatmapRow({ label, color }: { label: string; color: string }) {
  const days = Array.from({ length: 365 }, (_, i) => ({
    day: i + 1,
    submitted: Math.random() > 0.65, // dummy data
  }));

  return (
    <div className="flex items-center mb-6">
      <div className="w-24 font-semibold text-gray-700">
        {label}
      </div>

      <div className="grid grid-cols-53 gap-1">
        {days.map((d, index) => (
          <div
            key={index}
            title={`Day ${d.day}`}
            className={`w-3 h-3 rounded-sm ${
              d.submitted ? color : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-4">
        AuraCare 365 – Activity Dashboard
      </h1>

      <p className="text-gray-600 mb-10">
        Daily submission consistency across health domains
      </p>

      <div className="space-y-4">
        <HeatmapRow label="Physical" color="bg-blue-500" />
        <HeatmapRow label="Mental" color="bg-purple-500" />
        <HeatmapRow label="Social" color="bg-green-500" />
      </div>
    </main>
  );
}
