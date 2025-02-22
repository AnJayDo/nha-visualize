import TinyBarChart from "@/components/TinyBarChart";

const Teams = async () => {
  // Fetch data from external API
  const res = await fetch("http://localhost:5000/top-teams");
  const data = await res.json();

  return (
    <div className="w-full max-w-8xl mx-auto p-6 rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4 mt-12">
        Team Performance Chart
      </h2>
      <TinyBarChart color="rgb(244 114 182)" data={data} />
    </div>
  );
};

export default Teams;
