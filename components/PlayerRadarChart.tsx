"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
type DataItem = {
  A: number;
  B: number;
  fullMark: number;
  subject: string;
};

function normalizeData(data: DataItem[]): DataItem[] {
  return data.map((item) => {
    const newA = (item.A / item.fullMark) * 5;
    return {
      A: parseFloat(newA.toFixed(2)),
      B: 5,
      fullMark: 5,
      subject: item.subject,
    };
  });
}

const PlayerRadarChart = ({ data, player }: { data: any; player: any }) => {
  console.log(data, player);
  const newData = normalizeData(data);
  console.log(newData);

  return (
    <div className="w-full h-[calc(100vh-200px)] text-white rounded-lg p-4 flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={newData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar
            name={player.name}
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default PlayerRadarChart;
