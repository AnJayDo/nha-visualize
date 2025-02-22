import PlayerRadarChart from "@/components/PlayerRadarChart";
import PlayerSelect from "@/components/PlayerSelect";
import { redirect } from "next/navigation";

const Player = async ({ params }: { params: Promise<{ id?: string }> }) => {
  // Fetch data from external API
  const id = (await params).id;

  const res = await fetch("http://localhost:5000/top-players");
  const data = await res.json();

  if (!id) {
    console.log("Redirecting to /players");
    redirect("/players");
  }

  const resPlayer = await fetch("http://localhost:5000/player/" + id);
  const playerData = await resPlayer.json();

  const player = id
    ? data.find(
        (player: { player_id: number }) => player.player_id === Number(id)
      )
    : data[0];

  return (
    <>
      <div className="w-full max-w-8xl mx-auto p-6 rounded-lg">
        <h2 className="text-xl font-bold text-center mb-4 mt-12 flex justify-center items-center gap-4 w-full mx-auto">
          <span className="flex">Player ID: {id} - </span>
          <PlayerSelect players={data} currentPlayer={id} />
        </h2>
        <PlayerRadarChart data={playerData} player={player} />
      </div>
    </>
  );
};

export default Player;
