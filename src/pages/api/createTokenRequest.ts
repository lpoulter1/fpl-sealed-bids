import type { NextApiRequest, NextApiResponse } from "next";
import * as Ably from "ably";

type ResponseData = {
  error?: string;
} | Ably.Types.TokenRequest;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (typeof process.env.ABLY_API_KEY !== "string") {
    throw new Error("ABLY_API_KEY is not defined");
  }

  const client = new Ably.Realtime(process.env.ABLY_API_KEY);

  client.auth.createTokenRequest(
    { clientId: "client" },
    (err, tokenRequest) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating token request" });
      } else {
        if (tokenRequest) {
          res.status(200).json(tokenRequest);
        }
      }
    }
  );
}
