import CustomShapeBarChart from "@/components/CustomShapeBarChart";

const Teams = async () => {
  // Fetch data from external API
  const res = await fetch("http://localhost:5000/top-players");
  const data = await res.json();

  return (
    <>
      <div className="w-full max-w-8xl mx-auto p-6 rounded-lg">
        <h2 className="text-xl font-bold text-center mb-4 mt-12">
          Player Performance Chart
        </h2>
        <CustomShapeBarChart
          positive={false}
          color="#10B981"
          data={data.slice(10, 20)}
        />
      </div>
    </>
  );
};

export default Teams;
