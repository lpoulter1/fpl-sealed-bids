import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

type Round = {
  id: string;
  number: number;
};

export default function Round() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return axios.post(`/api/round`, { isCurrent: true });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["round"] });
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

  return (
    <div>
      <div>
        {getRound()}
        <button
          className="rounded bg-slate-800 p-2 text-white"
          onClick={() => mutation.mutate()}
        >
          New Round
        </button>
      </div>
      <CurrentPlayerCard />
    </div>
  );
}

type Player = {
  id: string;
  web_name: string;
  code: number;
};

function CurrentPlayerCard() {
  const { isLoading, data: players } = useQuery<Player[]>({
    queryKey: "players",
    queryFn: () => fetch(`/api/players`).then((res) => res.json()),
    onError: (err) => console.log(err),
    staleTime: Infinity,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!players) return <p>No player</p>;
  if (players.length === 0) return <p>No player</p>;

  return (
    <div className="flex flex-col pt-3 pl-6 pr-6 items-center max-w-xs rounded overflow-hidden shadow-lg justify-center bg-blue-300">
      <img
        className="max-h-40 rounded-full"
        src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${players[452]?.code}.png`}
        alt="a nice face"
      />
      <p className="text-white text-lg text-xl m-3">{players[452]?.web_name}</p>
    </div>
  );
}
