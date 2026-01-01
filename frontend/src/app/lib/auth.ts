// frontend/src/lib/auth.ts
export const getPatientId = () => {
  // In real app, decode JWT from localStorage/cookie
  // For MVP, we can hardcode a patient ID for now
  const patientId = localStorage.getItem("patientId") || "P1";
  return patientId;
};
