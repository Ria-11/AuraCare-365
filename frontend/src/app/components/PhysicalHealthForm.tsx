
"use client";

import React from "react";

interface PhysicalProps {
  physical: { sleep: string; diet: string; exercise: string };
  setPhysical: React.Dispatch<React.SetStateAction<{ sleep: string; diet: string; exercise: string }>>;
}

export default function PhysicalHealthForm({ physical, setPhysical }: PhysicalProps) {
  return (
    <div className="border p-4 rounded-md">
      <h2 className="font-semibold mb-2">Physical Health</h2>
      <input
        type="text"
        placeholder="Sleep Hours"
        value={physical.sleep}
        onChange={(e) => setPhysical({ ...physical, sleep: e.target.value })}
        className="block w-full border p-2 rounded mb-2"
        required
      />
      <input
        type="text"
        placeholder="Diet"
        value={physical.diet}
        onChange={(e) => setPhysical({ ...physical, diet: e.target.value })}
        className="block w-full border p-2 rounded mb-2"
        required
      />
      <input
        type="text"
        placeholder="Exercise"
        value={physical.exercise}
        onChange={(e) => setPhysical({ ...physical, exercise: e.target.value })}
        className="block w-full border p-2 rounded"
        required
      />
    </div>
  );
}
