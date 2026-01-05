// frontend/src/lib/api.ts
export const getHealthInsight = async (payload: any) => {
  const res = await fetch(
    "http://localhost:5000/api/ai/health-insight",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to get insight");
  }

  return res.json();
};
