// --- Component: DashboardView.tsx (Stat Visualisation Version) ---
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Label
} from "recharts";

interface Stats {
  mostSelectedNames: string[];
  mostSelectedCount: number;
  leastSelectedNames: string[];
  leastSelectedCount: number;
  unselected: string[];
}

interface DashboardViewProps {
  data: Stats;
}

const DashboardView: React.FC<DashboardViewProps> = ({ data }) => {
  console.log("data", data);
  const {
    mostSelectedCount,
    mostSelectedNames,
    leastSelectedCount,
    leastSelectedNames,
    unselected,
  } = data;

  const chartData = [
    { name: "Most Selected", count: mostSelectedCount },
    { name: "Least Selected", count: leastSelectedCount },
    { name: "Unselected", count: unselected.length },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Selection Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false}>
            <Label value="Count" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Bar dataKey="count" radius={[8, 8, 0, 0]} label={{ position: "top", fill: "#374151", fontSize: 12 }}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.name === "Most Selected"
                    ? "#10b981"
                    : entry.name === "Least Selected"
                    ? "#ef4444"
                    : "#9ca3af"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="text-sm mt-4 text-gray-600">
        <p>
          <strong>Most Selected:</strong>{" "}
          {mostSelectedNames.length > 0
            ? `${mostSelectedNames.join(", ")} (Count: ${mostSelectedCount})`
            : "-"}
        </p>
        <p>
          <strong>Least Selected:</strong>{" "}
          {leastSelectedNames.length > 0
            ? `${leastSelectedNames.join(", ")} (Count: ${leastSelectedCount})`
            : "-"}
        </p>
        <p>
          <strong>Unselected Applicants:</strong>{" "}
          {unselected.length > 0 ? unselected.join(", ") : "None"}
        </p>
      </div>
    </div>
  );
};

export default DashboardView;
