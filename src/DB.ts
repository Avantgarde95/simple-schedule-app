import { Schedule } from "./types/Schedule";

let nextID = 0;

export function generateID() {
  const id = nextID;
  nextID++;
  return id;
}

export const scheduleDB: Map<number, Schedule> = new Map();
