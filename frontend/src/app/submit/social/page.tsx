export default function SocialSubmit() {
  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Social Well-being Check 🤝
        </h2>

        <p className="text-gray-600 mb-6">
          Let us know how connected you felt today.
        </p>

        <form className="space-y-4">
          <select className="w-full p-3 border rounded-xl">
            <option>Social interaction today</option>
            <option>Very active</option>
            <option>Moderate</option>
            <option>Low</option>
            <option>None</option>
          </select>

          <select className="w-full p-3 border rounded-xl">
            <option>Did you feel supported?</option>
            <option>Yes</option>
            <option>Somewhat</option>
            <option>No</option>
          </select>

          <textarea
            placeholder="Any social concerns or thoughts?"
            className="w-full p-3 border rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
