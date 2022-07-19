export async function getScheduleIDs(): Promise<Array<number>> {
  const response = await fetch("/api/schedules", { method: "GET" });
  return await response.json();
}
