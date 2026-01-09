'use client';

import { useRouter } from 'next/navigation';
import {
  Stethoscope,
  Users,
  AlertTriangle,
  FileText,
  TrendingUp,
  Calendar,
} from 'lucide-react';

export default function DoctorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <Stethoscope className="w-7 h-7 text-emerald-600" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              AuraCare 365
            </h1>
            <p className="text-sm text-gray-500">Doctor Portal</p>
          </div>
        </div>
      </header>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <SectionCard
            title="Patients"
            description="View and manage your assigned patients"
            icon={<Users className="w-6 h-6 text-emerald-600" />}
            onClick={() => router.push('/doctor/patients')}
          />

          <SectionCard
            title="Alerts"
            description="AI-generated risk & health alerts"
            icon={<AlertTriangle className="w-6 h-6 text-yellow-600" />}
          />

          <SectionCard
            title="Reports"
            description="Medical reports and summaries"
            icon={<FileText className="w-6 h-6 text-blue-600" />}
          />

          <SectionCard
            title="Analyze"
            description="Trends & AI-driven analytics"
            icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
          />

          <SectionCard
            title="Appointments"
            description="Upcoming and past appointments"
            icon={<Calendar className="w-6 h-6 text-teal-600" />}
          />
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  description,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-6 shadow-sm border border-emerald-100 transition
        ${onClick ? 'cursor-pointer hover:shadow-md hover:border-emerald-300' : 'opacity-80'}
      `}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="p-3 bg-emerald-50 rounded-lg">{icon}</div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
