export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        AuraCare 🌿
      </h1>

      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Your personal health companion for physical, mental, and social well-being.
      </p>

      <div className="flex gap-4">
        <a
          href="/submit/physical"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Physical Health
        </a>

        <a
          href="/submit/mental"
          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
        >
          Mental Health
        </a>

        <a
          href="/submit/social"
          className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
        >
          Social Health
        </a>
      </div>
    </main>
  );
}
