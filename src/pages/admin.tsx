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
      {getRound()}
      <button
        className="rounded bg-slate-800 p-2 text-white"
        onClick={() => mutation.mutate()}
      >
        New Round
      </button>
    </div>
  );
}
