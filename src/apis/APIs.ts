import { Schedule } from "types/Schedule";

export async function getScheduleIDs(): Promise<Array<number>> {
  const response = await fetch("/api/schedules", { method: "GET" });
  return await response.json();
}

export async function removeAllSchedules(): Promise<void> {
  const response = await fetch("/api/schedules", { method: "DELETE" });
  return await response.json();
}

export async function getSchedule(input: { id: number }): Promise<Schedule> {
  const response = await fetch(`/api/schedule?id=${input.id}`, { method: "GET" });
  return await response.json();
}

export async function createSchedule(input: Omit<Schedule, "id">): Promise<void> {
  const response = await fetch("/api/schedule", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(input),
  });

  return await response.json();
}

export async function removeSchedule(input: { id: number }): Promise<void> {
  const response = await fetch(`/api/schedule?id=${input.id}`, { method: "DELETE" });
  return await response.json();
}
