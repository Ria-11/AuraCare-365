'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, HeartPulse, Brain, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const patients: Record<string, any> = {
  '1': {
    name: 'Aarav Mehta',
    age: 29,
    condition: 'Anxiety',
    risk: 'low',
    notes: 'Responding well to therapy sessions.',
  },
  '2': {
    name: 'Riya Sharma',
    age: 34,
    condition: 'Depression',
    risk: 'medium',
    notes: 'Mood fluctuations observed over last 2 weeks.',
  },
  '3': {
    name: 'Kunal Verma',
    age: 41,
    condition: 'Bipolar Disorder',
    risk: 'high',
    notes: 'Requires close monitoring and medication review.',
  },
  '4': {
    name: 'Neha Kapoor',
    age: 26,
    condition: 'PTSD',
    risk: 'medium',
    notes: 'Triggers identified, gradual improvement.',
  },
  '5': {
    name: 'Arjun Singh',
    age: 37,
    condition: 'Stress',
    risk: 'low',
    notes: 'Work-related stress, lifestyle changes advised.',
  },
};

export default function PatientDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const patient = patients[id];

  if (!patient) {
    return <div className="p-10 text-gray-500">Patient not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <Button
          variant="ghost"
          className="text-emerald-700"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Patients
        </Button>

        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="text-2xl text-emerald-700">
              {patient.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Age: {patient.age}</p>
            <p>Condition: {patient.condition}</p>
            <Badge
              className={
                patient.risk === 'high'
                  ? 'bg-red-100 text-red-700'
                  : patient.risk === 'medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-emerald-100 text-emerald-700'
              }
            >
              {patient.risk.toUpperCase()} RISK
            </Badge>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <InfoCard icon={<HeartPulse />} label="Physical Health" value="Stable" />
          <InfoCard icon={<Brain />} label="Mental Health" value={patient.condition} />
          <InfoCard icon={<Activity />} label="Activity Level" value="Moderate" />
        </div>

        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-700">
              Doctor Notes
            </CardTitle>
          </CardHeader>
          <CardContent>{patient.notes}</CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="border-emerald-200">
      <CardContent className="flex gap-3 py-6">
        <div className="text-emerald-600">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="font-medium">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
