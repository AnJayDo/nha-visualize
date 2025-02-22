import { redirect } from "next/navigation";

export default async function Team() {
  const res = await fetch("http://localhost:5000/top-teams");
  const data = await res.json();

  if (!data || data.length === 0) {
    console.log("Redirecting to /teams");
    redirect("/teams");
  }

  redirect("/team/" + data[0].id);

  // ...
}
