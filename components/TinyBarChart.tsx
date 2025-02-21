"use client";

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
  specifications: Specification[];
};

type Props = {
  color: string;
  data: Data[];
};

const TinyBarChart: FC<Props> = ({ color, data }) => {
  return (
    <div className="w-full h-[500px] bg-gray-50 rounded-lg shadow-md p-4 flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data.map((team) => ({
            ...team,
            specifications: team.specifications.map((spec) => ({
              label: spec.label,
              value: spec.value,
            })),
          }))}
        >
          <XAxis
            dataKey="name"
            className="text-gray-700 font-semibold"
            tick={{ fill: "#4F46E5", fontSize: 12, fontWeight: "bold" }}
            angle={-25}
            textAnchor="end"
            interval={0}
            height={80}
          />
          <YAxis className="text-gray-700" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="score" fill={color} radius={[6, 6, 0, 0]}>
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
