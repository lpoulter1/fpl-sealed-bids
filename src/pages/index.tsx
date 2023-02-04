import { type NextPage } from "next";
import Head from "next/head";
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";

const AblyChatComponent = dynamic(() => import('../components/AblyChatComponent'), { ssr: false });


const Home: NextPage = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    void fetch('/api/bidTracker').then(
      (res) => res.json()
    ).then(
      (data: { count: number}) => {
        if(!data) return;
        setCount(data.count)
      }
    );
  }, []);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        count: {count}
        <BidPage />
        <AblyChatComponent />

      </main>
    </>
  );
};

function BidPage() {
  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log("bid amount", e.currentTarget.bid.value);
  }

  return (
    <div className="App">
      <h1>Logged in as Bidder</h1>
      <Player />
      <form onSubmit={handleOnSubmit} className="flex gap-1 text-white">
        <label >
          <input className="bg-slate-800 placeholder-gray-400 p-2" name="bid" placeholder="Enter a bid" />
        </label>
        <button className="rounded bg-slate-800 text-white p-2" type="submit">Submit Bid</button>
      </form>
    </div>
  );
}

function Player({}) {
  return <div>Player Name: David Bobs</div>;
}

export default Home;
