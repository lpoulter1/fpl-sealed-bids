/**
 * set current player with a POST request
 * return the current player with a GET request
 * add player model to db
 */
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";

type CurrentPlayer =
  | {
      playerId: number;
      web_name: string;
      element_type: string;
    }
  | { message: string }
  | undefined;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CurrentPlayer>
) {
  const { method } = req;

  switch (method) {
    case "POST": {
      const { playerId, web_name, element_type } = req.body;

      if (!playerId || !web_name || !element_type) {
        res.status(400).json({ message: "missing data" });
        return;
      }

      const player = await prisma.currentPlayer.create({
        data: { playerId: playerId, web_name: web_name, element_type: "test" },
      });

      res.status(200).json(player);
      break;
    }

    case "GET":
      {
        const player = await prisma.currentPlayer.findMany({ take: -1 });

        res.status(200).json(player[0]);
      }

      break;
  }
}
