"use client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function TeamSelect({ teams, currentTeam }: any) {
  const router = useRouter();
  const handleChange = (id: any) => {
    if (id) {
      router.push(`/team/${id}`);
    }
  };

  return (
    <div className="max-w-[300px] flex w-full text-black">
      <Select onValueChange={handleChange} defaultValue={Number(currentTeam)}>
        <SelectTrigger>
          <SelectValue className="text-black" placeholder="Select a player" />
        </SelectTrigger>
        <SelectContent>
          {teams.map((team: any) => (
            <SelectItem key={team.id} value={team.id}>
              {team.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
