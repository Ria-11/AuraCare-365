export default function MentalSubmit() {
  return (
    <main className="min-h-screen bg-purple-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Mental Wellness Check 🧠
        </h2>

        <p className="text-gray-600 mb-6">
          Share how you’re feeling today.
        </p>

        <form className="space-y-4">
          <select className="w-full p-3 border rounded-xl">
            <option>Mood today</option>
            <option>Happy 😊</option>
            <option>Neutral 😐</option>
            <option>Sad 😔</option>
            <option>Anxious 😟</option>
          </select>

          <input
            type="number"
            placeholder="Stress level (1-10)"
            className="w-full p-3 border rounded-xl"
          />

          <textarea
            placeholder="What’s on your mind today?"
            className="w-full p-3 border rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
