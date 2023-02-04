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
      console.log("req.query", req.query)
      const { roundId } = req.query;
      if (!roundId) return res.status(400).json({ error: "Missing roundId" });
      if (typeof roundId !== "string")
        return res.status(400).json({ error: "Invalid roundId" });

      const allBids = await prisma.bid.findMany({
        where: { roundId: roundId },
      });
      res.status(200).json(allBids);
    }
  }
}
