import { Bid } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";
/* eslint-disable */
type ResponseData = {} | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;
  console.log("req.query", req.query);
  switch (method) {
    case "POST": {
      const { id, roundId, amount, user } = req.body;
      const bidCount = await prisma.bid.create({
        data: {
          id: id,
          roundId: roundId,
          amount: parseInt(amount),
          user: user,
        },
      });
      res.status(200).json(bidCount);
      break;
    }
    case "GET": {
      // get all bids for a round
      console.log("req.query", req.query);
      const { roundId } = req.query;
      if (!roundId) return res.status(400).json({ error: "Missing roundId" });
      if (typeof roundId !== "string")
        return res.status(400).json({ error: "Invalid roundId" });

      const allBids = await prisma.bid.findMany({
        where: { roundId: roundId },
      });

      const unqiueBidCount = countUserBids(allBids);

      if (unqiueBidCount > 4) {
        res.status(200).json(allBids);
      }

      const bidsWithoutAmount = allBids.map((bid) => exclude(bid, ["amount"]));
      res.status(200).json(bidsWithoutAmount);
    }
  }
}

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

function countUserBids(bids: Bid[]) {
  let userSet = new Set();
  bids.forEach((bid) => userSet.add(bid.user));
  
  return userSet.size;
}
