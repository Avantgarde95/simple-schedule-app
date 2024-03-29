/**
 * @file Fake APIs.
 * Instead of connecting to the server, we just put some delay to the functions
 * to simulate the Internet connection.
 */

import { v4 as uuid } from "uuid";

import { Schedule } from "types/Schedule";
import { runAfterDelay } from "utils/AsyncUtils";

function generateID() {
  return uuid();
}

async function simulateNetwork<Result>(job: () => Result) {
  return await runAfterDelay(job, 50 + Math.random() * 200);
}

// Fake DB.
const scheduleDB: Map<string, Schedule> = new Map();

export async function getScheduleIDs(): Promise<Array<string>> {
  return await simulateNetwork(() =>
    Array.from(scheduleDB.values())
      .sort((item1, item2) => item1.creationTime - item2.creationTime)
      .map(item => item.id)
  );
}

export async function removeAllSchedules(): Promise<void> {
  await simulateNetwork(() => {
    scheduleDB.clear();
  });
}

export async function getSchedule(id: string): Promise<Schedule> {
  return await simulateNetwork(() => {
    const item = scheduleDB.get(id);

    if (typeof item === "undefined") {
      throw new Error(`Cannot find item with id ${id}`);
    }

    return item;
  });
}

export async function createSchedule(): Promise<void> {
  await simulateNetwork(() => {
    const currentTime = new Date().getTime();

    const item: Schedule = {
      id: generateID(),
      content: "New schedule",
      isImportant: false,
      startTime: currentTime,
      creationTime: currentTime,
    };

    scheduleDB.set(item.id, item);
  });
}

export async function removeSchedule(id: string): Promise<void> {
  await simulateNetwork(() => {
    scheduleDB.delete(id);
  });
}

export async function updateSchedule(id: string, parts: Omit<Schedule, "id" | "creationTime">): Promise<void> {
  await simulateNetwork(() => {
    const item = scheduleDB.get(id);

    if (typeof item === "undefined") {
      throw new Error(`Cannot find item with id ${id}`);
    }

    item.content = parts.content;
    item.isImportant = parts.isImportant;
    item.startTime = parts.startTime;
  });
}
