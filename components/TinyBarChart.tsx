"use client";

import { formatNumber, toTitleCase } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FC } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const CustomTooltip: FC<{ active?: boolean; payload?: { payload: any }[] }> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const column = payload[0].payload;

    return (
      <div className="bg-white p-3 border border-gray-300 rounded shadow-md">
        <p className="font-semibold text-gray-800">{column.name}</p>
        {column.specifications.map((spec: { label: string; value: number }) => (
          <p key={spec.label} className="text-sm text-gray-600">
            {spec.label}:{" "}
            <span className="font-medium text-gray-900">{spec.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

type Specification = {
  label: string;
  value: number;
};

type Data = {
  name: string;
  score: number;
  stats: Specification[];
};

type Props = {
  color: string;
  data: Data[];
};

const TinyBarChart: FC<Props> = ({ color, data }) => {
  const router = useRouter();

  const handleBarClick = (data: any) => {
    if (data.id) {
      router.push("/team/" + data.id);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-200px)] text-white rounded-lg p-4 flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data.map((team) => ({
            ...team,
            specifications: [
              {
                label: "Score",
                value: formatNumber(team.score),
              },
              ...team.stats.map((spec) => ({
                label: toTitleCase(spec.label),
                value: formatNumber(spec.value),
              })),
            ],
          }))}
        >
          <XAxis
            dataKey="name"
            tick={{ fill: "#ffffff", fontSize: 12, fontWeight: "bold" }}
            angle={-25}
            textAnchor="end"
            interval={0}
            height={80}
          />
          <YAxis tick={{ fill: "#ffffff", fontSize: 12, fontWeight: "bold" }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="score"
            fill={color}
            radius={[6, 6, 0, 0]}
            onClick={(e) => handleBarClick(e)}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TinyBarChart;
