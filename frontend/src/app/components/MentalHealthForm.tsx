
"use client";

import React from "react";

interface MentalProps {
  mental: { mood: string; stress: string; anxiety: string };
  setMental: React.Dispatch<React.SetStateAction<{ mood: string; stress: string; anxiety: string }>>;
}

export default function MentalHealthForm({ mental, setMental }: MentalProps) {
  return (
    <div className="border p-4 rounded-md">
      <h2 className="font-semibold mb-2">Mental Health</h2>
      <input
        type="text"
        placeholder="Mood"
        value={mental.mood}
        onChange={(e) => setMental({ ...mental, mood: e.target.value })}
        className="block w-full border p-2 rounded mb-2"
        required
      />
      <input
        type="text"
        placeholder="Stress Level"
        value={mental.stress}
        onChange={(e) => setMental({ ...mental, stress: e.target.value })}
        className="block w-full border p-2 rounded mb-2"
        required
      />
      <input
        type="text"
        placeholder="Anxiety Level"
        value={mental.anxiety}
        onChange={(e) => setMental({ ...mental, anxiety: e.target.value })}
        className="block w-full border p-2 rounded"
        required
      />
    </div>
  );
}
