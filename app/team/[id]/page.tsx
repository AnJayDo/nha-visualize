import PlayerRadarChart from "@/components/PlayerRadarChart";
import TeamRadarChart from "@/components/TeamRadarChart";
import TeamSelect from "@/components/TeamSelect";
import { redirect } from "next/navigation";

const Player = async ({ params }: { params: Promise<{ id?: string }> }) => {
  // Fetch data from external API
  const id = (await params).id;

  const res = await fetch("http://localhost:5000/top-teams");
  const data = await res.json();

  if (!id) {
    console.log("Redirecting to /teams");
    redirect("/teams");
  }

  const resTeam = await fetch("http://localhost:5000/team/" + id);
  const teamData = await resTeam.json();

  const team = id
    ? data.find((team: { id: number }) => team.id === Number(id))
    : data[0];

  return (
    <>
      <div className="w-full max-w-8xl mx-auto p-6 rounded-lg">
        <h2 className="text-xl font-bold text-center mb-4 mt-12 flex justify-center items-center gap-4 w-full mx-auto">
          <span className="flex">Player ID: {id} - </span>
          <TeamSelect teams={data} currentTeam={id} />
        </h2>
        <TeamRadarChart data={teamData} team={team} />
      </div>
    </>
  );
};

export default Player;
