import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Select from "react-select";
import { CurrentPlayerCard } from "../components/CurrentPlayerCard";
import type { Player } from "../types";

type Round = {
  id: string;
  number: number;
};

export default function Round() {
  const queryClient = useQueryClient();

  const mutation = useMutation<Player>({
    mutationFn: () => {
      return axios.post(`/api/round`, { isCurrent: true });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["round"] });
    },
  });

  const playerMutation = useMutation<Player>({
    mutationFn: ({ code, web_name, element_type }) => {
      return axios.post(`/api/currentPlayer`, { playerId: code, web_name, element_type });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentPlayer"] });
    },
  });

  const { isLoading, data: currentRound } = useQuery<Round>({
    queryKey: "round",
    queryFn: () => fetch(`/api/round`).then((res) => res.json()),
    onError: (err) => console.log(err),
  });

  const getRound = () => {
    if (isLoading) return <p>Loading...</p>;
    if (!currentRound) return <p>No currentRound</p>;
    return <p> currentRound: {currentRound.number}</p>;
  };

  const { isLoading: isLoadingPlayers, data: players } = useQuery<Player[]>({
    queryKey: "players",
    queryFn: () => fetch(`/api/players`).then((res) => res.json()),
    onError: (err) => console.log(err),
    staleTime: Infinity,
  });

  const { isLoading: isCurrentPlayer, data: currentPlayer } = useQuery<Player>({
    queryKey: "currentPlayer",
    queryFn: () => axios.get(`/api/currentPlayer`),
    onError: (err) => console.log(err),
    staleTime: Infinity,
  });

  if (isLoadingPlayers) return <p>Loading...</p>;
  if (!players) return <p>No player</p>;
  if (players.length === 0) return <p>No player</p>;

  const options = players.map((player) => ({
    value: player,
    label: player.web_name,
  }));

  if (!currentPlayer) return <p>No currentPlayer</p>;

  console.log("currentPlayer", currentPlayer.data);
  return (
    <div>
      {currentPlayer && currentPlayer.data.web_name}
      <div>
        {getRound()}
        <button
          className="rounded bg-slate-800 p-2 text-white"
          onClick={() => mutation.mutate()}
        >
          New Round
        </button>
      </div>
      <div>
        <Select
          options={options}
          onChange={({ value: player, label: web_name, element_type }) => {
            console.log("select player", player);
            playerMutation.mutate(player);
          }}
        />
      </div>
      <CurrentPlayerCard player={currentPlayer.data} />
    </div>
  );
}