import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";
/* eslint-disable */
type ResponseData = {} | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;
  const currentRound = await getCurrentRound();
  const allRounds = prisma.round.findMany();

  console.log("latestRound", currentRound);
  switch (method) {
    case "POST":
      const { id, isCurrent } = req.body;

      await resetCurrentRounds();

      const bidCount = await prisma.round.create({
        data: { id: id, isCurrent: isCurrent },
      });
      res.status(200).json(bidCount);
      break;
    case "GET":
      res.status(200).json(currentRound);
      break;
  }
}

function getAllCurrentRounds() {
  return prisma.round.findMany({ where: { isCurrent: true } });
}

function resetCurrentRounds() {
  return prisma.round.updateMany({
    where: { isCurrent: true },
    data: { isCurrent: false },
  });
}

function getCurrentRound() {
  return prisma.round.findMany({
    where: { isCurrent: true },
    take: -1,
  });
}
