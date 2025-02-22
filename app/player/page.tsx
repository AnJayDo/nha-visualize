import { redirect } from "next/navigation";

export default async function Player() {
  const res = await fetch("http://localhost:5000/top-players");
  const data = await res.json();

  if (!data || data.length === 0) {
    console.log("Redirecting to /players");
    redirect("/players");
  }

  redirect("/player/" + data[0].player_id);

  // ...
}
