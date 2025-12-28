export default function PatientProfile({ params }: { params: { id: string } }) {
  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Patient Profile</h1>
      <p>Patient ID: {params.id}</p>
      <p>365-day health submissions dashboard.</p>
    </div>
  );
}
