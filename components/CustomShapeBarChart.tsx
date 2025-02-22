"use client";

import { toTitleCase } from "@/app/teams/const";
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
        {column.stats.map((spec: { label: string; value: number }) => (
          <p key={spec.label} className="text-sm text-gray-600">
            {toTitleCase(spec.label)}:{" "}
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

const CustomShapeBarChart: FC<Props> = ({ color, data }) => {
  const CustomBarShape = (props: any) => {
    const { x, y, width, height } = props;
    return (
      <path
        d={`M${x},${y + height} L${x + width / 2},${y} L${x + width},${
          y + height
        } Z`}
        fill={color}
      />
    );
  };

  return (
    <div className="w-full h-[500px] bg-gray-50 rounded-lg shadow-md p-4 flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
          <Bar dataKey="score" shape={<CustomBarShape />}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomShapeBarChart;
