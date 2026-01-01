// frontend/src/lib/api.ts
export const submitHealthLog = async (payload: any) => {
  const res = await fetch("http://localhost:5000/api/health-logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add token header if using auth
      // "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to submit");
  }

  return res.json();
};
