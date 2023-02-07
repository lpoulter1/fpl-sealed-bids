/**
 * set current player with a POST request
 * return the current player with a GET request
 * add player model to db
 */
/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";
import { Player } from "./players";

type CurrentPlayer = {
  playerId: string;
  web_name: string;
} | null;

type RequestData = {
  playerId: string;
  web_name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CurrentPlayer>
) {
  const { method } = req;

  switch (method) {
    case "POST": {
      const { playerId, web_name } = req.body;

      const player = await prisma.currentPlayer.create({
        data: { playerId: playerId, web_name: web_nam, element_type: 'test' },
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
