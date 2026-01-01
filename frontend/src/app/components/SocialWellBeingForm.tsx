
"use client";

import React from "react";

interface SocialProps {
  social: { interaction: string; loneliness: string };
  setSocial: React.Dispatch<React.SetStateAction<{ interaction: string; loneliness: string }>>;
}

export default function SocialWellBeingForm({ social, setSocial }: SocialProps) {
  return (
    <div className="border p-4 rounded-md">
      <h2 className="font-semibold mb-2">Social Well-Being</h2>
      <input
        type="text"
        placeholder="Interaction Score"
        value={social.interaction}
        onChange={(e) => setSocial({ ...social, interaction: e.target.value })}
        className="block w-full border p-2 rounded mb-2"
        required
      />
      <input
        type="text"
        placeholder="Loneliness Level"
        value={social.loneliness}
        onChange={(e) => setSocial({ ...social, loneliness: e.target.value })}
        className="block w-full border p-2 rounded"
        required
      />
    </div>
  );
}
