import { NextApiRequest, NextApiResponse } from "next";

import { scheduleDB } from "DB";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "GET") {
    response.status(200).json(Array.from(scheduleDB.keys()));
  } else if (request.method === "DELETE") {
    scheduleDB.clear();
    response.status(200).json({});
  }
}
