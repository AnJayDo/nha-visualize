"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { data } from "./const";
import TinyBarChart from "@/components/TinyBarChart";

const Teams: FC = () => {
  const router = useRouter();

  return (
    <div className="w-full max-w-8xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
        Team Performance Chart
      </h2>
      <TinyBarChart color="#8884d8" data={data} />
      <div className="mt-6 text-center">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Teams;
