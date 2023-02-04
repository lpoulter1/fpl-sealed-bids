import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  count: number;
};

let globalStateCounter = 1;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  globalStateCounter++;
  res.status(200).json({ count: globalStateCounter });
}
