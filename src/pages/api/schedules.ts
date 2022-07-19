import { NextApiRequest, NextApiResponse } from "next";

import { scheduleDB } from "DB";

export default function handler(request: NextApiRequest, response: NextApiResponse<Array<number>>) {
  if (request.method === "GET") {
    setTimeout(() => {
      response.status(200).json(Array.from(scheduleDB.keys()));
    }, 1000);
  }
}
