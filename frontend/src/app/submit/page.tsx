import Link from "next/link";

export default function SubmitHub() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-4xl">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          AuraCare 365 – Health Submission Hub
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Track your well-being across physical, mental, and social health domains.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Physical */}
          <Link href="/submit/physical">
            <div className="cursor-pointer bg-blue-50 p-6 rounded-xl hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">🫀 Physical Health</h2>
              <p className="text-gray-600 text-sm">
                Sleep, activity, discomfort, vitals
              </p>
            </div>
          </Link>

          {/* Mental */}
          <Link href="/submit/mental">
            <div className="cursor-pointer bg-purple-50 p-6 rounded-xl hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">🧠 Mental Wellness</h2>
              <p className="text-gray-600 text-sm">
                Mood, stress, emotional reflection
              </p>
            </div>
          </Link>

          {/* Social */}
          <Link href="/submit/social">
            <div className="cursor-pointer bg-green-50 p-6 rounded-xl hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">🤝 Social Well-being</h2>
              <p className="text-gray-600 text-sm">
                Social interaction, support, isolation
              </p>
            </div>
          </Link>

        </div>
      </div>
    </main>
  );
}
