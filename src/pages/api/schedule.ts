import { NextApiRequest, NextApiResponse } from "next";

import { Schedule } from "types/Schedule";
import { generateID, scheduleDB } from "DB";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    const item: Schedule = {
      id: generateID(),
      content: request.body.content,
      unixTime: request.body.unixTime,
      importance: request.body.importance,
    };

    scheduleDB.set(item.id, item);
    response.status(200).json(item);
  } else if (request.method === "PATCH") {
    const id = Number(request.query.id);
    const item = scheduleDB.get(id);

    if (typeof item !== "undefined") {
      item.content = request.body.content;
      item.unixTime = request.body.unixTime;
      item.importance = request.body.importance;
    }

    response.status(200).json(item);
  } else if (request.method === "DELETE") {
    const id = Number(request.query.id);
    scheduleDB.delete(id);
    response.status(200).json({ id });
  } else {
    response.status(200).json({});
  }
}
