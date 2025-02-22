"use client";

import { adjustColorForDarkBg, formatNumber, toTitleCase } from "@/lib/utils";
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
  CartesianGrid,
  Legend,
  ReferenceLine,
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
  color: string;
  stats: Specification[];
};

type Props = {
  positive?: boolean;
  color: string;
  data: Data[];
};

const CustomShapeBarChart: FC<Props> = ({ color, data, positive = true }) => {
  console.log(data);
  const router = useRouter();

  const handleBarClick = (data: any) => {
    if (data.player_id) {
      router.push("/player/" + data.player_id);
    }
  };
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
    <div className="w-full h-[calc(100vh-200px)] text-white rounded-lg p-4 flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data.map((player) => ({
            ...player,
            specifications: [
              {
                label: "Score",
                value: formatNumber(player.score),
              },
              ...player.stats.map((spec) => ({
                label: toTitleCase(spec.label),
                value: formatNumber(spec.value),
              })),
            ],
          }))}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="35%" stopColor="#8884d8" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            className="text-white font-semibold"
            tick={{ fill: "#ffffff", fontSize: 12, fontWeight: "bold" }}
            angle={-25}
            textAnchor="end"
            interval={0}
            height={80}
          />
          <YAxis className="text-white" tick={{ fill: "#ffffff" }} />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="score" onClick={(e) => handleBarClick(e)}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  // adjustColorForDarkBg()
                  _.color
                  // positive ? "url(#colorPv)" : "url(#colorUv)"
                }
                opacity={0.5}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomShapeBarChart;
