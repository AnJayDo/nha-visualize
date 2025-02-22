"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import TinyBarChart from "@/components/TinyBarChart";
import { BASE_URL } from "./const";

const Teams: FC = () => {
  const router = useRouter();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/top-teams`);
        console.log(response);
        setChartData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-8xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
        Team Performance Chart
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <TinyBarChart color="#8884d8" data={chartData} />
      )}
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
