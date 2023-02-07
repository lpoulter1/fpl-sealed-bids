import { useState, useRef, useEffect } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { CurrentPlayerCard } from "../components/CurrentPlayerCard";
import type { Player } from "../types";

/**
 * 1. get current round id on load
 * 2. poll to find out how many other people have bid
 * 2. allow user to enter a bid
 * 3. submit bid passing bid amount and current round id and user id
 * 4. when poll returns all bids are in show all bids.
 */

const Home: NextPage = () => {
  const [isSold, setIsSold] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    if (!audioRef.current) return;
    if (!isSold) return;
    const audio = audioRef.current as HTMLAudioElement;
    audio.play();
  }, [isSold]);

  const { isLoading, data: currentRound } = useQuery<Round>({
    queryKey: "round",
    queryFn: () => fetch(`/api/round`).then((res) => res.json()),
    onError: (err) => console.log(err),
  });

  const getRound = () => {
    if (isLoading) return <p>Loading...</p>;
    if (!currentRound) return <p>No currentRound</p>;
    return null;
  };
  return (
    <>
      <Head>
        <title>Sealed with a Kiss</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="description" content="Generated by create-t3-app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <audio ref={audioRef} src="/resources/horn.mp3">
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <div className="flex flex-col gap-8 bg-gray-900  p-8 text-white md:flex-row md:gap-16">
        <main className="flex justify-center">
          <>
            {getRound()}
            {currentRound && (
              <div className="mobile:w-full w-96">
                <BidPage roundId={currentRound.id} isSold={isSold} />

                <RoundBids roundId={currentRound.id} setIsSold={setIsSold} />
              </div>
            )}
          </>
        </main>
        <div className="h-screen">
          <iframe
            key={isSold}
            width={1337}
            height="100%"
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vScXgOGg-l5p0SCEQwbllQ3PhCM4kmIko3HccpxEt4LFsg-331YPOv9oeQ84kBulfuw8VK9y-FdC1v8/pubhtml?gid=1073624568&amp;single=true&amp;widget=true&amp;headers=false"
          />
        </div>
      </div>
    </>
  );
};

function BidPage({ roundId, isSold }: { roundId: string }) {
  const { isLoading: isCurrentPlayerLoading, data: currentPlayer } =
    useQuery<Player>({
      queryKey: "currentPlayer",
      queryFn: () => axios.get(`/api/currentPlayer`),
      onError: (err) => console.log(err),
    });

  const mutation = useMutation({
    mutationFn: (newBid: { amount: string; user: string; roundId: string }) => {
      return axios.post(`/api/bid`, newBid);
    },
  });

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(
      "caaling mutation",
      e.currentTarget.amount,
      e.currentTarget.user,
      roundId
    );
    mutation.mutate({
      amount: (e.currentTarget.amount as HTMLInputElement).value,
      user: (e.currentTarget.user as HTMLInputElement).value,
      roundId,
    });
  }

  if (isCurrentPlayerLoading) return <p>Loading...</p>;

  return (
    <div className="flex max-w-lg flex-col">
      <div className="flex justify-center">
        <CurrentPlayerCard player={currentPlayer.data} isSold={isSold} />
      </div>

      <form
        onSubmit={handleOnSubmit}
        className="max-w-96 mt-8 flex flex-col justify-center gap-3 text-white md:max-w-md"
      >
        <label>
          <input
            className="w-full rounded-xl  bg-slate-800  p-6 placeholder-gray-400 focus-visible:outline-none focus-visible:outline-orange-500"
            name="user"
            placeholder="Your Name"
            required
          />
        </label>
        <label className="rounded-xl focus:outline-orange-500">
          <input
            className="w-full rounded-xl bg-slate-800 p-6 placeholder-gray-400 focus-visible:outline-none focus-visible:outline-orange-500"
            name="amount"
            placeholder="Enter a bid"
            required
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </label>
        <button
          className="mt-2 rounded-xl bg-slate-800  p-6 text-white hover:opacity-80 focus-visible:outline-none focus-visible:outline-orange-500"
          type="submit"
        >
          Submit Bid
        </button>
      </form>
    </div>
  );
}

type Bid = {
  id: string;
  amount: number;
  user: string;
  roundId: string;
};

function RoundBids({ roundId, setIsSold }: { roundId: string }) {
  const { isLoading, data } = useQuery<Bid[]>({
    queryKey: "roundBids",
    queryFn: () =>
      fetch(`/api/bid?roundId=${roundId}`).then((res) => res.json()),
    onError: (err) => console.log(err),
    onSuccess: (data) => {
      if (typeof data[0]?.amount !== "undefined") {
        setIsSold(true);
      } else {
        setIsSold(false);
      }
    },
    refetchInterval: 1000,
  });
  if (isLoading) return <p>Loading...</p>;

  const getTickIcon = (bid: Bid) => {
    if (typeof bid.amount === "undefined") {
      return (
        <svg
          className="mr-1.5 h-4 w-4 flex-shrink-0 text-green-500 dark:text-green-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          ></path>
        </svg>
      );
    }

    return null;
  };

  return (
    <div className="mt-8 flex flex-col content-center justify-center">
      <h3 className="text-xl">Bids for Round</h3>
      <ul>
        {data?.map((bid) => (
          <li key={bid.id} className="flex items-center">
            {getTickIcon(bid)}
            {bid.user} {bid.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

type Round = {
  id: string;
  number: number;
};
function Round({ setRoundId }: { setRoundId: (id: string) => void }) {
  const mutation = useMutation({
    mutationFn: () => {
      return axios.post(`/api/round`, { id: new Date(), isCurrent: true });
    },
  });

  const { isLoading, data } = useQuery<Round[]>({
    queryKey: "round",
    queryFn: () => fetch(`/api/round`).then((res) => res.json()),
    onError: (err) => console.log(err),
    onSuccess(data: Round[]) {
      if (data && data.length > 0) {
        const currentRound = data[0] as Round;
        setRoundId(currentRound.id);
      }
    },
  });

  const getRound = () => {
    if (isLoading) return <p>Loading...</p>;
    if (!data || data.length === 0) return <p>No currentRound</p>;
    const currentRound = data[0] as Round;
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

export default Home;
