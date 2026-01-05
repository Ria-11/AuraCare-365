import HealthLog from "../models/HealthLog.js";

export const generateHealthInsight = async (patientId, openai) => {
  const logs = await HealthLog.find({ patientId })
    .sort({ date: -1 })
    .limit(5);

  if (!logs.length) {
    return { summary: "No data available yet." };
  }

  const prompt = `
You are a healthcare assistant.
Analyze the following patient health logs.

Mental Health: ${JSON.stringify(logs.map(l => l.mentalHealth))}
Physical Health: ${JSON.stringify(logs.map(l => l.physicalHealth))}
Social Well-being: ${JSON.stringify(logs.map(l => l.socialWellBeing))}

Respond strictly in JSON:
{
  "summary": "...",
  "riskLevel": "Low | Medium | High",
  "recommendations": ["...", "..."]
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3
  });

  return JSON.parse(response.choices[0].message.content);
};
