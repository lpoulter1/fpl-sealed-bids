import type { Player } from "../types";
import Image from "next/image";
import styles from "./CurrentPlayerCard.module.css";

export function CurrentPlayerCard({
  player,
  isSold = false,
}: {
  player: Player;
  isSold?: boolean;
}) {
  const loader = ({ src }: { src: string }) => {
    return `https://resources.premierleague.com/premierleague/photos/players/110x140/p${src}.png`;
  };

  return (
    <div className="flex max-w-xs flex-col items-center justify-center overflow-hidden rounded bg-blue-300 pt-3 pl-6 pr-6 shadow-sm shadow-orange-700">
      {isSold && <span className={styles.stamp}>Sold</span>}
      <Image
        src={`${player?.playerId}`}
        loader={loader}
        width={125}
        height={160}
        className={`animate-[wiggle_1s_ease-in-out_infinite] rounded-full ${isSold ? "opacity-10" : ""}`}
        alt="a nice face"
      />
      <p className="m-3 text-xl text-white">{player?.web_name}</p>
    </div>
  );
}
