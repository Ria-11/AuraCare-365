export default function PhysicalSubmit() {
  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Physical Health Check 🫀
        </h2>

        <p className="text-gray-600 mb-6">
          Log your daily physical health details.
        </p>

        <form className="space-y-4">
          <input
            type="number"
            placeholder="Weight (kg)"
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="number"
            placeholder="Hours of sleep"
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="number"
            placeholder="Steps walked today"
            className="w-full p-3 border rounded-xl"
          />

          <textarea
            placeholder="Any physical discomfort?"
            className="w-full p-3 border rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
