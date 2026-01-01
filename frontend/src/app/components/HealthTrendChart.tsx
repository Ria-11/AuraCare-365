"use client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface Props {
  title: string;
  labels: string[];
  datasets: any[];
}

export default function HealthTrendChart({ title, labels, datasets }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <Line
        data={{ labels, datasets }}
        options={{
          responsive: true,
          plugins: { legend: { position: "bottom" } },
        }}
      />
    </div>
  );
}
