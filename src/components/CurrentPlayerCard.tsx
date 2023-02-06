import type { Player } from "../types";

export function CurrentPlayerCard({ player }: { player: Player }) {
  return (
    <div className="flex max-w-xs flex-col items-center justify-center overflow-hidden rounded bg-blue-300 pt-3 pl-6 pr-6 shadow-sm shadow-orange-700">
      <img
        className="max-h-40 rounded-full"
        src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player?.playerId}.png`}
        alt="a nice face"
      />
      <p className="m-3 text-xl text-white">{player?.web_name}</p>
    </div>
  );
}
