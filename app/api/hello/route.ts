import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const echostr = req.query.echostr as string;
  res.status(200).send(echostr);
}
