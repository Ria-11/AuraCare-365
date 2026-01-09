'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Users } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const patients = [
  { id: '1', name: 'Aarav Mehta', age: 29, condition: 'Anxiety', risk: 'low' },
  { id: '2', name: 'Riya Sharma', age: 34, condition: 'Depression', risk: 'medium' },
  { id: '3', name: 'Kunal Verma', age: 41, condition: 'Bipolar Disorder', risk: 'high' },
  { id: '4', name: 'Neha Kapoor', age: 26, condition: 'PTSD', risk: 'medium' },
  { id: '5', name: 'Arjun Singh', age: 37, condition: 'Stress', risk: 'low' },
];

export default function PatientsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredPatients = patients.filter((p) =>
    `${p.name} ${p.condition}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Users className="text-emerald-600" />
          <h1 className="text-2xl font-semibold text-gray-900">
            Your Patients
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search patient by name or condition..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>

        {/* Patient List (Vertical Scroll) */}
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          {filteredPatients.length === 0 && (
            <p className="text-gray-500 text-sm">
              No patients found.
            </p>
          )}

          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              onClick={() => router.push(`/doctor/patients/${patient.id}`)}
              className="cursor-pointer border-emerald-200 hover:shadow-md transition"
            >
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {patient.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Age: {patient.age} • {patient.condition}
                  </p>
                </div>

                <Badge
                  className={
                    patient.risk === 'high'
                      ? 'bg-red-100 text-red-700'
                      : patient.risk === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }
                >
                  {patient.risk.toUpperCase()}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
