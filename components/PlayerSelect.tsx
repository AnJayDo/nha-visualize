"use client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function PlayerSelect({ players, currentPlayer }: any) {
  const router = useRouter();
  const handleChange = (playerId: any) => {
    if (playerId) {
      router.push(`/player/${playerId}`);
    }
  };

  return (
    <div className="max-w-[300px] flex w-full text-black">
      <Select onValueChange={handleChange} defaultValue={Number(currentPlayer)}>
        <SelectTrigger>
          <SelectValue className="text-black" placeholder="Select a player" />
        </SelectTrigger>
        <SelectContent>
          {players.map((player: any) => (
            <SelectItem key={player.player_id} value={player.player_id}>
              {player.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
