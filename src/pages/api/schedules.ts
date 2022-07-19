import { NextApiRequest, NextApiResponse } from "next";

import { Schedule } from "types/Schedule";
import { scheduleDB } from "DB";

export default function handler(request: NextApiRequest, response: NextApiResponse<Array<Schedule>>) {
  if (request.method === "GET") {
    response.status(200).json(Array.from(scheduleDB.values()));
  }
}
